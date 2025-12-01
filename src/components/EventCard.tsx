import React from "react";
import {
    CalendarIcon,
    MapPinIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/Form/Button";
import { Event } from "@/types/events";



interface EventCardProps {
    event: Event;
    actions?: React.ReactNode;
}

export default function EventCard({ event, actions }: EventCardProps) {


    return (
        <div className="group bg-surface/50 border border-white/5 rounded overflow-hidden hover:border-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/10">
            {/* Image */}
            <div className="h-48 overflow-hidden relative">
                <img
                    src={event.coverImage || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80"}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${new Date(event.dateStart) > new Date()
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-surface/20 text-muted border border-surface/30"
                        }`}>
                        {new Date(event.dateStart) > new Date() ? 'Ativo' : 'Decorrido'}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-text mb-4 group-hover:text-primary-light transition-colors line-clamp-1">
                    {event.title}
                </h3>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center text-muted text-sm">
                        <CalendarIcon className="w-4 h-4 mr-2 text-text-muted" />
                        {new Date(event.dateStart).toLocaleString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                    <div className="flex items-center text-muted text-sm">
                        <MapPinIcon className="w-4 h-4 mr-2 text-text-muted" />
                        {event.location}
                    </div>
                    <div className="flex items-center text-muted text-sm">
                        <UserGroupIcon className="w-4 h-4 mr-2 text-text-muted" />
                        {event.estimatedGuest || 0} participantes
                    </div>
                </div>

                {/* Actions */}
                {actions}
            </div>
        </div>
    );
}
