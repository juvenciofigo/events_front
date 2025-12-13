import React from "react";
import {
    CalendarDaysIcon,
    TicketIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
    PlusIcon,
    CheckCircleIcon,
    EnvelopeIcon,
    ChartBarIcon,
    TruckIcon,
    ChatBubbleLeftRightIcon,
    StarIcon,
    ListBulletIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/Form/Button";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useDashboardData } from "@/hooks/useDashboard";
import { useToast } from "@/contexts/ToastContext";
import { DashboardStats, UpcomingEvent } from "@/types/dashboard";
import Header from "./Header";
import ErrorState from "@/components/ErrorState";
import Loading from "@/components/Loading";
import { OutletContext } from "./OrganizerDashboard";
import { formatCurrency, formatDate } from "@/utils";
import { StatisticsCards } from "@/components/StatisticsCards";
import { useUpcomingEvents } from "@/hooks/useEvents"


export default function Index() {
    const navigate = useNavigate();
    const context = useOutletContext<OutletContext>();

    // Buscar dados da API usando React Query
    const {
        stats: statsQuery,
        salesChart: salesChartQuery,
        tasks: tasksQuery,
        messages: messagesQuery,
        feedback: feedbackQuery,
        isLoading,
        hasError,
        error: apiError,
    } = useDashboardData();

    const { error } = useToast();

    React.useEffect(() => {
        if (hasError && apiError) {
            const message = (apiError as any).response?.data?.message || (apiError as any).message || "Erro ao carregar dados do dashboard.";
            error(message);
        }
    }, [hasError, apiError, error]);


    const stats = statsQuery.data
    const salesChartData = salesChartQuery.data
    const tasks = tasksQuery.data
    const messages = messagesQuery.data;
    const feedback = feedbackQuery.data;
    const { data: upcomingEvents, isLoading: loadingUpcomingEvents } = useUpcomingEvents();

    const combinedActivity = [
        { id: 1, type: 'sale' as const, name: "João da Silva", initials: "JS", action: "Comprou 2x VIP", event: "Festival de Verão", amount: 450, time: "Há 2 min" },
        { id: 2, type: 'confirmation' as const, name: "Ana Costa", initials: "AC", action: "Confirmou presença", event: "Casamento Silva & Sousa", time: "Há 5 min" },
        { id: 3, type: 'sale' as const, name: "Maria Santos", initials: "MS", action: "Comprou 1x Premium", event: "Tech Summit", amount: 280, time: "Há 15 min" },
        { id: 4, type: 'confirmation' as const, name: "Carlos Lima", initials: "CL", action: "Confirmou presença", event: "Casamento Silva & Sousa", time: "Há 30 min" },
        { id: 5, type: 'added' as const, name: "Beatriz Alves", initials: "BA", action: "Adicionada à lista", event: "Aniversário 50 anos", time: "Há 1h" },
    ];


    const suppliers = [
        { id: 1, name: "Buffet Delícias", service: "Catering", status: "confirmed" as const, payment: "paid" as const },
        { id: 2, name: "Foto & Cia", service: "Fotografia", status: "pending" as const, payment: "pending" as const },
        { id: 3, name: "Som Perfeito", service: "Sonorização", status: "confirmed" as const, payment: "partial" as const },
    ];

    const waitList = [
        { id: 1, name: "Roberto Santos", email: "roberto@email.com", event: "Festival de Verão", position: 1 },
        { id: 2, name: "Juliana Costa", email: "juliana@email.com", event: "Festival de Verão", position: 2 },
    ];

    const recentSales = [
        { id: 1, name: "João Silva", initials: "JS", tickets: "2x VIP", event: "Festival de Verão", amount: 450, time: "Há 2 min" },
        { id: 2, name: "Maria Santos", initials: "MS", tickets: "1x Premium", event: "Tech Summit", amount: 280, time: "Há 15 min" },
        { id: 3, name: "Pedro Costa", initials: "PC", tickets: "3x Pista", event: "Show de Rock", amount: 150, time: "Há 45 min" },
    ];

    const recentActivity = [
        { id: 1, type: 'confirmation' as const, name: "Ana Costa", initials: "AC", action: "Confirmou presença", event: "Casamento Silva & Sousa", time: "Há 5 min" },
        { id: 2, type: 'confirmation' as const, name: "Carlos Lima", initials: "CL", action: "Confirmou presença", event: "Casamento Silva & Sousa", time: "Há 30 min" },
        { id: 3, type: 'added' as const, name: "Beatriz Alves", initials: "BA", action: "Adicionada à lista", event: "Aniversário 50 anos", time: "Há 1h" },
    ];

    // Ações rápidas
    const quickActions = [
        {
            link: '/dashboard/organizers/messages',
            icon: <EnvelopeIcon className="w-6 h-6 text-primary" />,
            label: "Mensagens"
        },
        {
            link: '/reports',
            icon: <ChartBarIcon className="w-6 h-6 text-accent" />,
            label: "Relatórios"
        },
        {
            link: '/financial',
            icon: <CurrencyDollarIcon className="w-6 h-6 text-warning" />,
            label: "Financeiro"
        },
        {
            link: '/events',
            icon: <CalendarDaysIcon className="w-6 h-6 text-success" />,
            label: "Eventos"
        },
    ];

    // Check if context exists
    const { profile: organizer } = context;

    React.useEffect(() => {
        if (!context?.profile) navigate('/auth/role');
    }, [context]);

    // Loading state
    if (isLoading) {
        return (
            <Loading text="Carregando dashboard..." />
        );
    }

    if (hasError) {
        return (
            <ErrorState
                title="Erro ao carregar dados do dashboard"
                message="Não foi possível carregar as informações. Tente novamente."
                onRetry={() => window.location.reload()}
            />
        );
    }


    return (
        <div className="min-h-screen bg-background text-text px-2 pb-10">
            {/* Header */}
            <Header
                name={organizer?.companyName}
                title="Dashboard do Organizador"
                description="Visão geral dos seus eventos e performance de vendas."
                buttonLabel="Novo Evento"
                buttonLink="/dashboard/organizers/events/create"
            />

            {/* Quick Actions Panel */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {quickActions.map((action) => (
                    <button
                        key={action.link}
                        onClick={() => navigate(action.link)}
                        className="p-4 border border-borderColor rounded hover:border-primary transition-all flex flex-col items-center gap-2 group">
                        {action.icon}
                        <span className="text-xs font-bold text-text">{action.label}</span>
                    </button>
                ))}
            </div>

            <div className="border-t py-2 border-borderColor"></div>

            {/* Stats Grid */}
            {stats && <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Stat Card 1 - Total Events */}
                {stats.totalEvents && <Link
                    to="/dashboard/organizers/events">
                    <StatisticsCards
                        data={stats.totalEvents}
                        title="Total de Eventos"
                        icon={<CalendarDaysIcon className="w-4 h-4 text-primary-light" />}
                        description="Públicos e Privados" />
                </Link>
                }

                {/* Stat Card 2 - Tickets Sold */}
                {stats.ticketsSold && <Link
                    to="/reports">
                    <StatisticsCards
                        data={stats.ticketsSold}
                        title="Ingressos Vendidos"
                        icon={<TicketIcon className="w-4 h-4 text-secondary" />}
                        description="Apenas eventos pagos" />
                </Link>
                }

                {/* Stat Card 3 - Revenue */}
                {stats.revenue && <Link
                    to="/financial">
                    <StatisticsCards
                        data={(stats.revenue).toLocaleString('pt-MZ', { minimumFractionDigits: 2, maximumFractionDigits: 2, currency: 'MZN', currencyDisplay: 'narrowSymbol', style: 'currency' })}
                        title="Receita Total"
                        icon={<CurrencyDollarIcon className="w-4 h-4 text-accent" />}
                        description="Receita Total" />
                </Link>
                }

                {/* Stat Card 4 - Guests */}
                {stats.guests && <Link
                    to="/guests">
                    <StatisticsCards
                        data={stats.guests}
                        title="Convidados Totais"
                        icon={<UserGroupIcon className="w-4 h-4 text-warning" />}
                        description="Convidados Totais" />
                </Link>
                }
            </div>}

            <div className="border-t py-2 border-borderColor"></div>

            {/* Sales Chart & Tasks Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                {/* Sales Chart */}
                {salesChartData && <div className="backdrop-blur-xl">
                    <h3 className="text-sm font-bold text-text mb-6">Vendas da Semana</h3>
                    <div className="flex items-end justify-between h-48 gap-2">
                        {salesChartData.map((data, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full bg-primary/20 rounded-t relative group cursor-pointer hover:bg-primary/30 transition-colors"
                                    style={{ height: `${(data.sales / 32) * 100}%` }}>
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                        {data.sales}
                                    </span>
                                </div>
                                <span className="text-xs text-muted">{data.day}</span>
                            </div>
                        ))}
                    </div>
                </div>}

                {/* Tasks Checklist */}
                {tasks && <div className="backdrop-blur-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-text">Tarefas Pendentes</h3>
                        <button
                            onClick={() => navigate('/tasks')}
                            className="text-xs text-primary hover:text-primary-light transition-colors">
                            {tasks.filter(t => t.taskStatus !== "DONE").length} de {tasks.length}
                        </button>
                    </div>
                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <div key={task.id} className={`p-3 rounded border ${task.taskStatus === "DONE" ? 'bg-success/5 border-success/20' : 'bg-white/5 border-white/10'} flex items-start gap-3`}>
                                <CheckCircleIcon className={`w-5 h-5 flex-shrink-0 ${task.taskStatus === "DONE" ? 'text-success' : 'text-muted'}`} />
                                <div className="flex-1">
                                    <div className={`text-sm font-bold ${task.taskStatus === "DONE" ? 'text-muted line-through' : 'text-text'}`}>
                                        {task.title}
                                    </div>
                                    <div className="text-xs text-muted mt-1">{task.eventTitle}</div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className={`text-xs px-2 py-0.5 rounded ${task.priority === 'HIGH' ? 'bg-error/20 text-error' :
                                        task.priority === 'MEDIUM' ? 'bg-warning/20 text-warning' :
                                            'bg-info/20 text-info'
                                        }`}>
                                        {formatDate(task.dueDate)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>}
            </div>

            <div className="border-b py-2 border-borderColor"></div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4 mt-4 text-xs">
                {/* Recent Sales / Activity */}
                {stats && <div className="lg:col-span-2 backdrop-blur-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-text">
                            {!stats.hasEvents
                                ? 'Atividade Recente'
                                : (stats.hasPaidEvents && stats.hasPrivateEvents)
                                    ? 'Atividade Recente' // Mix de vendas e confirmações
                                    : stats.hasPaidEvents
                                        ? 'Vendas Recentes'
                                        : 'Confirmações Recentes'}
                        </h3>
                        {stats.hasEvents && (
                            <button
                                onClick={() => navigate('/activity')}
                                className="text-sm text-primary hover:text-primary-light transition-colors">
                                Ver todas
                            </button>
                        )}
                    </div>

                    {!stats.hasEvents ? (
                        /* Empty State - No Events */
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-20 h-20 rounded bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-6">
                                <TicketIcon className="w-10 h-10 text-primary-light" />
                            </div>
                            <h4 className="font-bold text-text mb-2">Nenhuma atividade ainda</h4>
                            <p className="text-muted text-sm mb-6 max-w-md">
                                Crie seu primeiro evento para começar a gerenciar convidados, vendas e muito mais.
                                <br />
                                <span className="text-text-muted text-xs mt-2 block">
                                    Eventos privados (como casamentos) ou públicos com venda de ingressos.
                                </span>
                            </p>
                            <Button onClick={() => navigate('/events/create')}>
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Criar Primeiro Evento
                            </Button>
                        </div>
                    ) : (stats.hasPaidEvents && stats.hasPrivateEvents) ? (
                        /* Combined Activity - Sales AND Confirmations Mixed */
                        <div className="space-y-4">
                            {combinedActivity.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded border border-borderColor hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded ${item.type === 'sale' ? 'bg-gradient-to-tr from-primary to-accent' : 'bg-gradient-to-tr from-secondary to-primary'} flex items-center justify-center text-text font-bold text-sm`}>
                                            {item.initials}
                                        </div>
                                        <div>
                                            <div className="font-bold text-text">{item.name}</div>
                                            <div className="text-muted">{item.action} • {item.event}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {item.type === 'sale' ? (
                                            <>
                                                <div className="font-bold text-secondary">+ R$ {formatCurrency(item.amount ?? 0)}</div>
                                                <div className="text-text-disabled">{item.time}</div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex items-center gap-1 justify-end">
                                                    {item.type === 'confirmation' ? (
                                                        <span className="font-bold text-success bg-success/10 px-2 py-1 rounded border border-success/20">
                                                            Confirmado
                                                        </span>
                                                    ) : (
                                                        <span className="font-bold text-info bg-info/10 px-2 py-1 rounded border border-info/20">
                                                            Novo
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-text-disabled mt-1">{item.time}</div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : stats.hasPaidEvents ? (
                        /* Sales List - For Paid Events Only */
                        <div className="space-y-4">
                            {recentSales.map((sale) => (
                                <div key={sale.id} className="flex items-center justify-between p-2 rounded border-b border-borderColor hover:bg-surface transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-text font-bold text-sm">
                                            {sale.initials}
                                        </div>
                                        <div>
                                            <div className="font-bold text-text">{sale.name}</div>
                                            <div className="text-muted">{sale.tickets} • {sale.event}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-secondary">+ {formatCurrency(sale.amount)}</div>
                                        <div className="text-text-disabled">{sale.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Activity List - For Private Events Only (confirmations, etc) */
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-center justify-between p-4 bg-white/5 rounded border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded bg-gradient-to-tr from-secondary to-primary flex items-center justify-center text-text font-bold text-sm">
                                            {activity.initials}
                                        </div>
                                        <div>
                                            <div className="font-bold text-text">{activity.name}</div>
                                            <div className="text-muted">{activity.action} • {activity.event}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1">
                                            {activity.type === 'confirmation' ? (
                                                <span className="font-bold text-success bg-success/10 px-2 py-1 rounded border border-success/20">
                                                    Confirmado
                                                </span>
                                            ) : (
                                                <span className="font-bold text-info bg-info/10 px-2 py-1 rounded border border-info/20">
                                                    Novo
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-text-disabled mt-1">{activity.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>}

                {/* Quick Actions / Upcoming Events */}
                {stats && <div className="space-y-8">
                    <UpcomingEvents loading={loadingUpcomingEvents} stats={stats} upcomingEvents={upcomingEvents} />
                </div>}
            </div>

            <div className="border-t py-2 border-borderColor"></div>

            {/* Additional Sections Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 text-xs">
                {/* Suppliers Status */}
                {/* fake data */}
                <div className="backdrop-blur-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3
                            onClick={() => navigate('/suppliers')}
                            className="text-sm font-bold text-text cursor-pointer hover:text-primary transition-colors">
                            Fornecedores
                        </h3>
                        <TruckIcon className="w-5 h-5 text-muted" />
                    </div>
                    <div className="space-y-3">
                        {suppliers.map((supplier) => (
                            <div key={supplier.id} className="p-2 bg-white/5 rounded border border-white/10">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <div className="font-bold text-text">{supplier.name}</div>
                                        <div className="text-muted">{supplier.service}</div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded ${supplier.status === 'confirmed' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                                        }`}>
                                        {supplier.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                                    </span>
                                </div>
                                <div className="text-muted">
                                    Pagamento: {supplier.payment === 'paid' ? '✓ Pago' : supplier.payment === 'partial' ? '⚠ Parcial' : '⏳ Pendente'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Messages / Inbox */}
                <div className="backdrop-blur-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3
                            onClick={() => navigate('/dashboard/organizers/messages')}
                            className="text-sm font-bold text-text cursor-pointer hover:text-primary transition-colors">
                            Mensagens
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="text-xs bg-error/20 text-error px-2 py-0.5 rounded">
                                {messages && messages.filter(m => m.unread).length}
                            </span>
                            <ChatBubbleLeftRightIcon className="w-4 h-4 text-muted" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        {messages && messages.map((msg) => (
                            <div key={msg.id} className={`p-3 rounded border ${msg.unread ? 'bg-primary/5 border-primary/20' : 'bg-white/5 border-white/10'}`}>
                                <div className="flex justify-between items-start mb-1">
                                    <div className="text-sm font-bold text-text">{msg.from}</div>
                                    <span className="text-xs text-muted">{msg.time}</span>
                                </div>
                                <div className="text-xs text-muted mb-1">{msg.message}</div>
                                <div className="text-xs text-text-disabled">{msg.event}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t py-2 border-borderColor"></div>

            {/* Feedback & WaitList Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Feedback & Reviews */}
                <div className="backdrop-blur-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3
                            onClick={() => navigate('/reviews')}
                            className="text-sm font-bold text-text cursor-pointer hover:text-primary transition-colors">
                            Avaliações Recentes
                        </h3>
                        <StarIcon className="w-4 h-4 text-warning" />
                    </div>
                    <div className="space-y-4">
                        {feedback && feedback.length > 0 ? (
                            feedback.map((item) => (
                                <div key={item.id} className="p-4 bg-white/5 rounded border border-white/10">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="text-sm font-bold text-text">{item.author}</div>
                                            <div className="flex gap-1 mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon key={i} className={`w-3 h-3 ${i < item.rating ? 'text-warning fill-warning' : 'text-muted'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-xs text-muted">{item.time}</span>
                                    </div>
                                    <p className="text-xs text-muted mb-1">{item.comment}</p>
                                    <div className="text-xs text-text-disabled">{item.event}</div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center border border-white/5 rounded bg-white/5">
                                <StarIcon className="w-8 h-8 text-muted mx-auto mb-2 opacity-50" />
                                <p className="text-sm text-muted">Nenhuma avaliação recebida ainda.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* WaitList Management */}
                <div className="text-xs  backdrop-blur-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3
                            onClick={() => navigate('/waitList')}
                            className="text-sm font-bold text-text cursor-pointer hover:text-primary transition-colors">
                            Lista de Espera
                        </h3>
                        <ListBulletIcon className="w-4 h-4 text-muted" />
                    </div>
                    <div className="space-y-3">
                        {waitList.map((person) => (
                            <div key={person.id} className="p-1 rounded border-b hover:bg-surface-hover border-borderColor flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-gradient-to-tr from-warning to-accent flex items-center justify-center text-text font-bold text-xs">
                                        #{person.position}
                                    </div>
                                    <div>
                                        <div className="font-bold text-text">{person.name}</div>
                                        <div className="text-muted">{person.email}</div>
                                    </div>
                                </div>
                                <button className="font-bold text-primary hover:text-primary-light transition-colors">
                                    Notificar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface UpcomingEventsProps {
    stats: DashboardStats;
    upcomingEvents: UpcomingEvent[] | undefined;
    loading: boolean
}

function UpcomingEvents({ stats, upcomingEvents, loading }: UpcomingEventsProps) {
    const navigate = useNavigate();
    return (
        <div className="backdrop-blur-xl text-xs">
            <h3 className="text-sm font-bold text-text mb-6">
                {stats.hasEvents ? 'Próximos Eventos' : 'Comece Agora'}
            </h3>
            <div className="space-y-4">
                {loading
                    ? <Loading />
                    : upcomingEvents && upcomingEvents.length > 0 ? (
                        /* Upcoming Events List */
                        <>
                            {upcomingEvents.map((event) => (
                                <Link
                                    to={`/dashboard/organizers/events/${event.id}/manage`}
                                    key={event.id}
                                >
                                    <div className="border-b p-1 rounded hover:bg-surface-hover">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-text mb-1">{event.title}</h4>
                                            <span className="text-muted">{event.date}</span>
                                        </div>
                                        <p className="text-muted">{event.location}local</p>
                                    </div>

                                </Link>
                            ))}
                        </>
                    ) : (
                        /* Tips for New Users */
                        <>
                            {/* Tip 1 - Create Event */}
                            <div className="p-1 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded hover:border-primary/40 transition-colors cursor-pointer"
                                onClick={() => navigate('/dashboard/organizers/events/create')}>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0">
                                        <CalendarDaysIcon className="w-4 h-4 text-primary-light" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text mb-1">Crie seu evento</h4>
                                        <p className="text-muted">Público ou privado, com ou sem venda de ingressos</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tip 2 - Manage Guests */}
                            <div className="p-1 border border-borderColor rounded">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded bg-secondary/20 flex items-center justify-center flex-shrink-0">
                                        <UserGroupIcon className="w-4 h-4 text-secondary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text mb-1">Gerencia convidados</h4>
                                        <p className="text-muted">Controle lista de presença e confirmações</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tip 3 - Marketplace */}
                            <div className="p-1 border border-borderColor rounded cursor-pointer"
                                onClick={() => navigate('/marketplace')}>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center flex-shrink-0">
                                        <TicketIcon className="w-4 h-4 text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text mb-1">Encontre fornecedores</h4>
                                        <p className="text-muted">Buffet, decoração, fotografia e mais</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

            </div>
        </div>
    )
}