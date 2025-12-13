export interface Chat {
    id: string;
    title: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    status: string;
    eventId: string;
    recipientId: string;
}

export interface Message {
    id: string;
    chatId: string;
    content: string;
    senderId: string;
    senderName: string;
    senderRole: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
}