import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
    MagnifyingGlassIcon,
    PaperAirplaneIcon,
    PaperClipIcon,
    FaceSmileIcon,
    EllipsisVerticalIcon,
    PhoneIcon,
    VideoCameraIcon,
    CheckIcon
} from "@heroicons/react/24/outline";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import { useGetOrganizerProfile, useGetSupplierProfile, usePresenceListener } from "@/hooks/useProfile";
import { getChats, useChat, useChatMessages } from "@/hooks/useChat";
import { chatApi } from "@/services/chatApi";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/useAuthStore";
import { dateToDateTime } from "@/utils";
import { useToast } from "@/contexts/ToastContext";
import { Chat, Message } from "@/types/chats";

export default function ChatPage() {
    const { error: erroToast } = useToast();
    const { chatId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [activeChat, setActiveChat] = useState<string | null>(chatId || null);
    const [messageInput, setMessageInput] = useState("");
    const profile = useAuthStore((state) => state.selectedProfile);


    // Fetch Chats
    const { data: chats, isLoading: loadingChats, error: errorChats } = getChats()

    // Setup WebSocket
    const chatIds = useMemo(() => chats?.map((c: any) => c.id) || [], [chats]);
    const { messages: liveMessages, sendMessage } = useChat(chatIds);

    // Fetch Historical Messages for Active Chat
    const { data: historicalMessages, isLoading: loadingMessages } = useChatMessages(activeChat!);

    // Merge Messages
    const messages = useMemo(() => {
        if (!activeChat) return [];
        const history = historicalMessages || [];
        // Filter live messages for the active chat
        const live = liveMessages
            .filter(m => m.chatId === activeChat)
            .map(m => ({
                id: m.id || `temp-${Math.random()}`,
                chatId: m.chatId,
                content: m.content,
                senderId: m.senderId,
                senderName: m.senderName || "Usuário",
                senderRole: m.senderRole || "user",
                isRead: true,
                createdAt: m.createdAt || new Date().toISOString(),
                updatedAt: m.createdAt || new Date().toISOString()
            } as Message));

        // Add live messages to history
        // Real implementation should handle deduplication
        // We filter out any history messages that might match live ones by ID to avoid duplicates if they overlap
        const historyIds = new Set(history.map(h => h.id));
        const uniqueLive = live.filter(l => !historyIds.has(l.id));

        return [...history, ...uniqueLive];
    }, [activeChat, historicalMessages, liveMessages]);

    // Handle new chat from query params
    useEffect(() => {
        if (chatId) {
            setActiveChat(chatId);
        } else {
            // If no chat ID but query params exist (new chat), handle it
            const organizerId = searchParams.get("organizers");
            if (organizerId) {
                // In a real app, find or create chat
                console.log("New chat with organizers:", organizerId);
            }
        }
    }, [chatId, searchParams]);

    const handleChatSelect = (id: string) => {
        setActiveChat(id);
        navigate(`/messages/${id}`);
    };

    const handleSend = () => {
        if (!activeChat || !messageInput.trim() || !profile) return;

        sendMessage(messageInput, profile.id, profile.role, activeChat);
        setMessageInput("");
    };

    const activeChatData = chats?.find((c: Chat) => c.id === activeChat);
    const onlineStatus = usePresenceListener(activeChatData?.recipientId, activeChatData?.status || "offline");

    return (
        <div className="flex h-screen bg-background text-text font-sans selection:bg-primary selection:text-white overflow-hidden">
            {/* Sidebar */}
            <div className={`w-full md:w-80 lg:w-96 border-r border-borderColor flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-2 border-b border-borderColor">
                    <h2 className="font-bold mb-2">Mensagens</h2>
                    <Input
                        icon={<MagnifyingGlassIcon className="w-4 h-4 text-text-muted" />}
                        InputClassName="pl-10 flex justify-center items-center"
                        type="text"
                        placeholder="Buscar conversas...">
                    </Input>
                </div>

                {/*  Chat List  */}
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {loadingChats && <div className="p-4 text-center text-muted">Carregando conversas...</div>}
                    {chats?.map((chat: Chat) => (
                        <Button
                            fullWidth
                            variant={activeChat === chat.id ? "secondary" : "ghost"}
                            key={chat.id}
                            onClick={() => handleChatSelect(chat.id)}>

                            {/* avatar */}
                            <div className="relative mr-3">
                                <img
                                    src={chat.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(chat.title)}`}
                                    alt={chat.title}
                                    className="w-7 h-7 rounded-full object-cover"
                                />
                                {/* Status dot in sidebar - currently using static status from chat object */}
                                {/* To make this real-time, we'd need to track status for ALL chats, which is heavier on resources */}
                                {chat.status === "online" && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                                )}
                            </div>

                            {/* title */}
                            <div className="text-xs flex-1 text-left overflow-hidden">
                                <div className="flex justify-between items-center">
                                    <span className={`font-bold truncate ${activeChat === chat.id ? "text-text" : "text-text-secondary"}`}>
                                        {chat.title}
                                    </span>
                                    <span className="text-muted">{chat.time ? dateToDateTime(chat.time) : ''}</span>
                                </div>

                                {/* Last Message */}
                                <div className="flex justify-between items-center mt-1">
                                    <p className="text-muted truncate max-w-[140px]">
                                        {chat.lastMessage}
                                    </p>
                                </div>
                            </div>
                        </Button>
                    ))}
                </div>
            </div>

            {/* Main Content - Active Chat */}
            <div className={`flex-1 flex flex-col bg-surface/30 ${!activeChat ? 'hidden md:flex' : 'flex'}`}>
                {activeChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-borderColor flex justify-between items-center bg-background backdrop-blur-md">
                            <div className="flex items-center">
                                <button
                                    onClick={() => setActiveChat(null)}
                                    className="md:hidden mr-3 text-muted hover:text-text"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg>
                                </button>
                                <div className="relative mr-3">
                                    <img
                                        src={activeChatData?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(activeChatData?.title || '')}`}
                                        alt={activeChatData?.title}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    {onlineStatus === "online" && (
                                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background"></div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-text">{activeChatData?.title}</h3>
                                    <p className="text-xs text-muted">
                                        {onlineStatus === "online" ? "Online agora" : activeChatData?.status === "offline" ? "Offline" : "Status desconhecido"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-muted">
                                <button className="hover:text-text transition-colors">
                                    <PhoneIcon className="w-5 h-5" />
                                </button>
                                <button className="hover:text-text transition-colors">
                                    <VideoCameraIcon className="w-5 h-5" />
                                </button>
                                <button className="hover:text-text transition-colors">
                                    <EllipsisVerticalIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-2 space-y-2">
                            {loadingMessages ? (
                                <div className="p-4 text-center text-muted">Carregando mensagens...</div>
                            ) : messages.length === 0 ?
                                <div className="p-4 text-center text-muted">Nenhuma mensagem ainda.</div>
                                : messages.map((msg: Message) => (
                                    <div
                                        key={msg.id || Math.random()}
                                        className={`flex ${msg.senderId === profile?.id ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[70%] p-[2px] flex gap-3 rounded ${msg.senderId === profile?.id
                                                ? "bg-primary text-white rounded-tr-none"
                                                : "bg-surface text-text-secondary rounded-tl-none"
                                                }`}
                                        >
                                            <p className="text-sm justify-start leading-relaxed">{msg.content}</p>
                                            <div className={`flex items-end self-end mt-[2px] gap-[2px] text-[10px] ${msg.senderId === profile?.id ? "text-primary-foreground/80" : "text-muted"}`}>
                                                <span>{msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}</span>
                                                {msg.senderId === profile?.id && <CheckIcon className="w-3 h-3" />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-1 bg-background backdrop-blur-md">
                            <div className="flex items-center gap-2 bg-surface rounded p-1">
                                {/* <button className="text-muted hover:text-text transition-colors">
                                    <FaceSmileIcon className="w-5 h-5" />
                                </button>
                                <button className="text-muted hover:text-text transition-colors">
                                    <PaperClipIcon className="w-5 h-5" />
                                </button> */}
                                <Input
                                    InputClassName="px-1"
                                    type="text"
                                    placeholder="Digite sua mensagem..."
                                    className="flex-1"
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <Button
                                    variant={messageInput.trim() ? "primary" : "ghost"}
                                    onClick={handleSend}>
                                    <PaperAirplaneIcon className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-50">
                        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                            <PaperAirplaneIcon className="w-10 h-10 text-muted" />
                        </div>
                        <h3 className="text-xl font-bold text-text mb-2">Suas Mensagens</h3>
                        <p className="text-muted max-w-md">
                            Selecione uma conversa para começar a enviar mensagens ou inicie um novo chat através do Marketplace.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
