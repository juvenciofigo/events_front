import React from "react";
import { useNavigate } from "react-router-dom";
import {
    BellIcon,
    CheckCircleIcon,
    InformationCircleIcon,
    ExclamationTriangleIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";

type NotificationType = "info" | "success" | "warning" | "error";

interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    time: string;
    read: boolean;
    link?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: "1",
        type: "success",
        title: "Pagamento Confirmado",
        message: "O pagamento do evento 'Tech Summit 2024' foi processado com sucesso.",
        time: "Há 5 min",
        read: false,
        link: "/payments/history"
    },
    {
        id: "2",
        type: "info",
        title: "Novo Evento Disponível",
        message: "Confira o novo workshop de React que acabou de ser lançado.",
        time: "Há 1 hora",
        read: false,
        link: "/events/1"
    },
    {
        id: "3",
        type: "warning",
        title: "Ingressos Esgotando",
        message: "Os ingressos para o 'Festival de Verão' estão quase acabando.",
        time: "Há 2 horas",
        read: true,
        link: "/events/2"
    }
];

export default function NotificationList() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = React.useState<Notification[]>(MOCK_NOTIFICATIONS);

    const handleMarkAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const handleRemove = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleNotificationClick = (notification: Notification) => {
        handleMarkAsRead(notification.id);
        if (notification.link) {
            navigate(notification.link);
        }
    };

    const getIcon = (type: NotificationType) => {
        switch (type) {
            case "success": return <CheckCircleIcon className="w-6 h-6 text-success" />;
            case "warning": return <ExclamationTriangleIcon className="w-6 h-6 text-warning" />;
            case "error": return <ExclamationTriangleIcon className="w-6 h-6 text-error" />;
            default: return <InformationCircleIcon className="w-6 h-6 text-info" />;
        }
    };

    return (
        <div className="w-full max-w-md bg-surface border border-white/10 rounded-sm shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-surface-hover/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <BellIcon className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-text">Notificações</h3>
                </div>
                <span className="text-xs font-medium text-muted bg-white/5 px-2 py-1 rounded-full">
                    {notifications.filter(n => !n.read).length} novas
                </span>
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                    <div className="p-8 text-center text-muted">
                        <BellIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>Nenhuma notificação no momento</p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                onClick={() => handleNotificationClick(notification)}
                                className={`p-4 hover:bg-white/5 transition-colors relative group ${!notification.read ? 'bg-primary/5' : ''} ${notification.link ? 'cursor-pointer' : ''}`}
                            >
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className={`text-sm font-semibold ${!notification.read ? 'text-text' : 'text-muted'}`}>
                                                {notification.title}
                                            </h4>
                                            <span className="text-xs text-muted whitespace-nowrap ml-2">
                                                {notification.time}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted line-clamp-2 mb-2">
                                            {notification.message}
                                        </p>

                                        {!notification.read && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleMarkAsRead(notification.id);
                                                }}
                                                className="text-xs text-primary hover:text-primary-hover font-medium transition-colors"
                                            >
                                                Marcar como lida
                                            </button>
                                        )}
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemove(notification.id);
                                        }}
                                        className="absolute top-2 right-2 p-1 text-muted hover:text-error opacity-0 group-hover:opacity-100 transition-all"
                                        title="Remover"
                                    >
                                        <XMarkIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-3 border-t border-white/10 bg-surface-hover/30 text-center">
                <button className="text-xs text-muted hover:text-primary transition-colors font-medium">
                    Ver todas as notificações
                </button>
            </div>
        </div>
    );
}

