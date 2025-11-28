import React, { useState, useEffect } from "react";
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

// Mock Data
const CHATS = [
    {
        id: "1",
        name: "Maria Silva",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
        lastMessage: "Obrigada pelo orçamento! Vou analisar.",
        time: "10:30",
        unread: 2,
        status: "online",
        role: "Organizer"
    },
    {
        id: "2",
        name: "Tech Solutions Inc.",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
        lastMessage: "Podemos agendar uma reunião?",
        time: "Ontem",
        unread: 0,
        status: "offline",
        role: "Organizer"
    },
    {
        id: "3",
        name: "Ana Paula",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
        lastMessage: "Perfeito, combinado então.",
        time: "Segunda",
        unread: 0,
        status: "online",
        role: "Organizer"
    }
];

const MESSAGES = [
    { id: 1, sender: "them", text: "Olá! Vi sua proposta para o buffet.", time: "10:00" },
    { id: 2, sender: "me", text: "Olá Maria! Sim, podemos personalizar o cardápio conforme sua necessidade.", time: "10:05" },
    { id: 3, sender: "them", text: "Isso seria ótimo. Vocês têm opções veganas?", time: "10:10" },
    { id: 4, sender: "me", text: "Temos sim! Cerca de 30% do nosso cardápio pode ser adaptado.", time: "10:12" },
    { id: 5, sender: "them", text: "Obrigada pelo orçamento! Vou analisar.", time: "10:30" }
];

export default function ChatPage() {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [activeChat, setActiveChat] = useState<string | null>(chatId || null);
    const [messageInput, setMessageInput] = useState("");

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
        navigate(`/chat/${id}`);
    };

    const activeChatData = CHATS.find(c => c.id === activeChat);

    return (
        <div className="flex h-screen bg-background text-text font-sans selection:bg-primary selection:text-white pt-20 overflow-hidden">
            {/* Sidebar - Chat List */}
            <div className={`w-full md:w-80 lg:w-96 border-r border-white/10 flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-white/10">
                    <h2 className="text-xl font-bold mb-4">Mensagens</h2>
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                        <input
                            type="text"
                            placeholder="Buscar conversas..."
                            className="w-full bg-surface border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {CHATS.map((chat) => (
                        <button
                            key={chat.id}
                            onClick={() => handleChatSelect(chat.id)}
                            className={`w-full flex items-center p-3 rounded-xl transition-colors ${activeChat === chat.id
                                ? "bg-primary/10 border border-primary/30"
                                : "hover:bg-white/5 border border-transparent"
                                }`}
                        >
                            <div className="relative mr-3">
                                <img
                                    src={chat.avatar}
                                    alt={chat.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                {chat.status === "online" && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                                )}
                            </div>
                            <div className="flex-1 text-left overflow-hidden">
                                <div className="flex justify-between items-center mb-1">
                                    <span className={`font-bold truncate ${activeChat === chat.id ? "text-text" : "text-text-secondary"}`}>
                                        {chat.name}
                                    </span>
                                    <span className="text-xs text-muted">{chat.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-muted truncate max-w-[140px]">
                                        {chat.lastMessage}
                                    </p>
                                    {chat.unread > 0 && (
                                        <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content - Active Chat */}
            <div className={`flex-1 flex flex-col bg-surface/30 ${!activeChat ? 'hidden md:flex' : 'flex'}`}>
                {activeChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-background/50 backdrop-blur-md">
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
                                        src={activeChatData?.avatar}
                                        alt={activeChatData?.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    {activeChatData?.status === "online" && (
                                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background"></div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-text">{activeChatData?.name}</h3>
                                    <p className="text-xs text-muted">
                                        {activeChatData?.status === "online" ? "Online agora" : "Visto por último hoje às 09:00"}
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
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {MESSAGES.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[70%] p-4 rounded-2xl ${msg.sender === "me"
                                            ? "bg-primary text-white rounded-tr-none"
                                            : "bg-surface text-text-secondary rounded-tl-none"
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                        <div className={`flex items-center justify-end mt-1 gap-1 text-[10px] ${msg.sender === "me" ? "text-primary-foreground/80" : "text-muted"}`}>
                                            <span>{msg.time}</span>
                                            {msg.sender === "me" && <CheckIcon className="w-3 h-3" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10 bg-background/50 backdrop-blur-md">
                            <div className="flex items-center gap-2 bg-surface border border-white/10 rounded-full px-4 py-2">
                                <button className="text-muted hover:text-text transition-colors">
                                    <FaceSmileIcon className="w-6 h-6" />
                                </button>
                                <button className="text-muted hover:text-text transition-colors">
                                    <PaperClipIcon className="w-5 h-5" />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Digite sua mensagem..."
                                    className="flex-1 bg-transparent border-none text-text placeholder-text-muted focus:ring-0 py-2"
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                />
                                <button
                                    className={`p-2 rounded-full transition-all ${messageInput.trim()
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "bg-white/5 text-muted"
                                        }`}
                                >
                                    <PaperAirplaneIcon className="w-5 h-5" />
                                </button>
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
