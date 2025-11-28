import React from "react";
import {
    CalendarDaysIcon,
    TicketIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
    ArrowTrendingUpIcon,
    PlusIcon,
    CheckCircleIcon,
    ClockIcon,
    EnvelopeIcon,
    BellAlertIcon,
    ChartBarIcon,
    CloudIcon,
    TruckIcon,
    ChatBubbleLeftRightIcon,
    StarIcon,
    ListBulletIcon,
    ArrowDownTrayIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { organizerProfile } from "@/stores/useProfileStore";
import Button from "@/components/Form/Button";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDashboardData } from "@/hooks/useDashboard";
import CardDashboard from "./components/CardDashboard";

interface OutletContext {
    profile: organizerProfile;
    role: "organizer" | "supplier";
}

interface data {
    stats: any,
    stats2: any,
    icon: React.ReactNode,
    percent: string | null,
    p1: string,
    p2: string
}

export default function OrganizerDashboard() {
    const navigate = useNavigate();
    const context = useOutletContext<OutletContext>();

    // Buscar dados da API usando React Query
    const {
        stats: statsQuery,
        salesChart: salesChartQuery,
        tasks: tasksQuery,
        // activity: activityQuery,
        upcomingEvents: upcomingEventsQuery,
        // suppliers: suppliersQuery,
        messages: messagesQuery,
        // financial: financialQuery,
        feedback: feedbackQuery,
        // waitList: waitListQuery,
        // alerts: alertsQuery,
        isLoading,
        hasError,
    } = useDashboardData();

    // Check if context exists
    if (!context || !context.profile) {
        navigate('/auth/role');
        return null;
    }

    const { profile: organizer } = context;

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted">Carregando dashboard...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (hasError) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <p className="text-error mb-4">Erro ao carregar dados do dashboard</p>
                    <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
                </div>
            </div>
        );
    }

    // Extrair dados das queries (com fallback para mock data durante desenvolvimento)
    const stats = statsQuery.data
    // || {
    //     totalEvents: 5,
    //     ticketsSold: 450,
    //     revenue: 12500,
    //     totalGuests: 650,
    //     hasEvents: true,
    //     hasPaidEvents: true,
    //     hasPrivateEvents: true,
    // };

    const salesChartData = salesChartQuery.data
    // || [
    //     { day: 'Seg', sales: 12 },
    //     { day: 'Ter', sales: 19 },
    //     { day: 'Qua', sales: 15 },
    //     { day: 'Qui', sales: 25 },
    //     { day: 'Sex', sales: 32 },
    //     { day: 'Sáb', sales: 28 },
    //     { day: 'Dom', sales: 18 },
    // ];

    const tasks = tasksQuery.data
    // || [
    //     { id: 1, title: "Confirmar buffet", event: "Casamento Silva & Sousa", deadline: "Amanhã", priority: "high" as const, taskStatus: "PENDING" },
    //     { id: 2, title: "Enviar convites digitais", event: "Festival de Verão", deadline: "2 dias", priority: "medium" as const, taskStatus: "IN_PROGRESS" },
    //     { id: 3, title: "Contratar fotógrafo", event: "Tech Summit", deadline: "1 semana", priority: "low" as const, taskStatus: "DONE" },
    // ];

    const combinedActivity = [
        { id: 1, type: 'sale' as const, name: "João da Silva", initials: "JS", action: "Comprou 2x VIP", event: "Festival de Verão", amount: 450, time: "Há 2 min" },
        { id: 2, type: 'confirmation' as const, name: "Ana Costa", initials: "AC", action: "Confirmou presença", event: "Casamento Silva & Sousa", time: "Há 5 min" },
        { id: 3, type: 'sale' as const, name: "Maria Santos", initials: "MS", action: "Comprou 1x Premium", event: "Tech Summit", amount: 280, time: "Há 15 min" },
        { id: 4, type: 'confirmation' as const, name: "Carlos Lima", initials: "CL", action: "Confirmou presença", event: "Casamento Silva & Sousa", time: "Há 30 min" },
        { id: 5, type: 'added' as const, name: "Beatriz Alves", initials: "BA", action: "Adicionada à lista", event: "Aniversário 50 anos", time: "Há 1h" },
    ];

    const upcomingEvents = upcomingEventsQuery.data
    // || [
    //     { id: 1, name: "Casamento Silva & Sousa", date: "15 Fev", location: "Jardim Botânico", guests: 150 },
    //     { id: 2, name: "Festival de Verão", date: "20 Fev", location: "Parque Central", guests: 500 },
    // ];

    const suppliers = [
        { id: 1, name: "Buffet Delícias", service: "Catering", status: "confirmed" as const, payment: "paid" as const },
        { id: 2, name: "Foto & Cia", service: "Fotografia", status: "pending" as const, payment: "pending" as const },
        { id: 3, name: "Som Perfeito", service: "Sonorização", status: "confirmed" as const, payment: "partial" as const },
    ];

    const messages = messagesQuery.data;

    // || [
    //     { id: 1, from: "João Silva", message: "Posso levar acompanhante?", event: "Festival de Verão", time: "5 min", unread: true },
    //     { id: 2, from: "Maria Costa", message: "Qual o dress code?", event: "Casamento", time: "1h", unread: true },
    //     { id: 3, from: "Pedro Alves", message: "Obrigado pela confirmação!", event: "Tech Summit", time: "3h", unread: false },
    // ];

    const financialData = {
        revenue: 45200,
        expenses: 28500,
        profit: 16700,
        projectedProfit: 22000,
    };

    const feedback = feedbackQuery.data
    // || [
    //     { id: 1, author: "Ana Silva", rating: 5, comment: "Evento incrível! Organização perfeita.", event: "Workshop Design", time: "2h" },
    //     { id: 2, author: "Carlos Lima", rating: 4, comment: "Muito bom, mas poderia ter mais coffee break.", event: "Tech Summit", time: "1 dia" },
    // ];

    const waitList = [
        { id: 1, name: "Roberto Santos", email: "roberto@email.com", event: "Festival de Verão", position: 1 },
        { id: 2, name: "Juliana Costa", email: "juliana@email.com", event: "Festival de Verão", position: 2 },
    ];

    const alerts = [
        { id: 1, type: "warning" as const, message: "Festival de Verão com apenas 40% de ocupação", action: "Criar promoção" },
        { id: 2, type: "info" as const, message: "Prazo de confirmação do buffet se aproxima", action: "Ver detalhes" },
        { id: 3, type: "success" as const, message: "Tech Summit atingiu 95% de capacidade!", action: "Ver vendas" },
    ];


    return (
        <div className="min-h-screen bg-background text-text">
            <div className="mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-text mb-2">
                            Dashboard do Organizador
                        </h1>
                        <p className="text-muted">
                            {organizer?.companyName
                                ? `Bem-vindo, ${organizer.companyName}!`
                                : 'Visão geral dos seus eventos e performance de vendas.'}
                        </p>
                    </div>
                    <Button onClick={() => navigate('/events/create')}>
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Novo Evento
                    </Button>
                </div>

                {/* Stats Grid */}
                {stats?.totalEvents && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {/* Stat Card 1 - Total Events */}

                    {/* <div
                        onClick={() => navigate('/events')}
                        className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6 hover:border-primary/30 transition-colors group cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-primary/10 rounded-sm border border-primary/20 group-hover:bg-primary/20 transition-colors">
                                <CalendarDaysIcon className="w-6 h-6 text-primary-light" />
                            </div>
                            {stats.hasEvents && (
                                <span className="flex items-center text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-sm border border-success/20">
                                    <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                                    +12%
                                </span>
                            )}
                        </div>
                        <div className="text-3xl font-black text-text mb-1">{stats.totalEvents}</div>
                        <div className="text-sm text-muted">Total de Eventos</div>
                        <div className="text-xs text-text-muted mt-2">Públicos e Privados</div>
                    </div> */}

                    <CardDashboard
                        onClick={() => navigate('/events')}
                        icon={<CalendarDaysIcon className="w-6 h-6 text-primary-light" />}
                        p1="Total de Eventos"
                        p2="Públicos e Privados"
                        stats={stats.totalEvents}
                        stats2={stats.totalEvents}
                        percent="+12%" />

                    {/* Stat Card 2 - Tickets Sold */}
                    <CardDashboard
                        onClick={() => navigate('/reports')}
                        icon={<TicketIcon className="w-6 h-6 text-secondary" />}
                        p1="Ingressos Vendidos"
                        p2="Apenas eventos pagos"
                        stats={stats.ticketsSold}
                        stats2={stats.ticketsSold.toLocaleString('pt-BR')}
                        percent="+24%" />

                    {/* <div
                        onClick={() => navigate('/reports')}
                        className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6 hover:border-secondary/30 transition-colors group cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-secondary/10 rounded-sm border border-secondary/20 group-hover:bg-secondary/20 transition-colors">
                                <TicketIcon className="w-6 h-6 text-secondary" />
                            </div>
                            {stats.hasEvents && stats.ticketsSold > 0 && (
                                <span className="flex items-center text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-sm border border-success/20">
                                    <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                                    +24%
                                </span>
                            )}
                        </div>
                        <div className="text-3xl font-black text-text mb-1">{stats.ticketsSold.toLocaleString('pt-BR')}</div>
                        <div className="text-sm text-muted">Ingressos Vendidos</div>
                        <div className="text-xs text-text-muted mt-2">Apenas eventos pagos</div>
                    </div> */}

                    {/* Stat Card 3 - Revenue */}
                    <CardDashboard
                        onClick={() => navigate('/financial')}
                        icon={<CurrencyDollarIcon className="w-6 h-6 text-accent" />}
                        p1="Receita Total"
                        p2="Últimos 30 dias"
                        stats={null}
                        stats2={`R$ ${(stats.revenue / 1000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}k`}
                        // stats2={stats.totalRevenue.toLocaleString('pt-BR')}
                        percent="+24%" />

                    {/* <div
                        onClick={() => navigate('/financial')}
                        className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6 hover:border-accent/30 transition-colors group cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-accent/10 rounded-sm border border-accent/20 group-hover:bg-accent/20 transition-colors">
                                <CurrencyDollarIcon className="w-6 h-6 text-accent" />
                            </div>
                            {stats.hasEvents && stats.revenue > 0 && (
                                <span className="flex items-center text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-sm border border-success/20">
                                    <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                                    +8%
                                </span>
                            )}
                        </div>
                        <div className="text-3xl font-black text-text mb-1">
                            R$ {(stats.revenue / 1000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}k
                        </div>
                        <div className="text-sm text-muted">Receita Total</div>
                        <div className="text-xs text-text-muted mt-2">Últimos 30 dias</div>
                    </div> */}

                    {/* Stat Card 4 - Guests */}

                    {/* <CardDashboard
                        onClick={() => navigate('/guests')}
                        icon={<UserGroupIcon className="w-6 h-6 text-warning" />}
                        p1="Convidados Totais"
                        p2="Todos os eventos"
                        stats={null}
                        stats2={stats.totalGuests.toLocaleString('pt-BR')}
                        percent="+24%" /> */}

                    {/* <div
                        onClick={() => navigate('/guests')}
                        className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-sm p-6 hover:border-warning/30 transition-colors group cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-warning/10 rounded-sm border border-warning/20 group-hover:bg-warning/20 transition-colors">
                                <UserGroupIcon className="w-6 h-6 text-warning" />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-text mb-1">{stats.totalGuests.toLocaleString('pt-BR')}</div>
                        <div className="text-sm text-muted">Convidados Totais</div>
                        <div className="text-xs text-text-muted mt-2">Todos os eventos</div>
                    </div> */}
                </div>}

                {/* Quick Actions Panel */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    <button
                        onClick={() => navigate('/messages')}
                        className="p-4 bg-surface/50 border border-white/10 rounded-sm hover:border-primary/30 transition-all flex flex-col items-center gap-2 group">
                        <EnvelopeIcon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-text">Enviar Email</span>
                    </button>
                    <button
                        onClick={() => navigate('/guests')}
                        className="p-4 bg-surface/50 border border-white/10 rounded-sm hover:border-secondary/30 transition-all flex flex-col items-center gap-2 group">
                        <ArrowDownTrayIcon className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-text">Exportar Lista</span>
                    </button>
                    <button
                        onClick={() => navigate('/reports')}
                        className="p-4 bg-surface/50 border border-white/10 rounded-sm hover:border-accent/30 transition-all flex flex-col items-center gap-2 group">
                        <ChartBarIcon className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-text">Relatório</span>
                    </button>
                    <button
                        onClick={() => navigate('/events')}
                        className="p-4 bg-surface/50 border border-white/10 rounded-sm hover:border-warning/30 transition-all flex flex-col items-center gap-2 group">
                        <PaperAirplaneIcon className="w-6 h-6 text-warning group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-text">Compartilhar</span>
                    </button>
                </div>

                {/* Smart Alerts */}
                {alerts.length > 0 && (
                    <div className="mb-10 space-y-3">
                        {alerts.map((alert) => (
                            <div key={alert.id} className={`p-4 rounded border flex items-center justify-between ${alert.type === 'warning' ? 'bg-warning/10 border-warning/30' :
                                alert.type === 'success' ? 'bg-success/10 border-success/30' :
                                    'bg-info/10 border-info/30'
                                }`}>
                                <div className="flex items-center gap-3">
                                    <BellAlertIcon className={`w-5 h-5 ${alert.type === 'warning' ? 'text-warning' :
                                        alert.type === 'success' ? 'text-success' :
                                            'text-info'
                                        }`} />
                                    <span className="text-sm text-text">{alert.message}</span>
                                </div>
                                <button className="text-xs font-bold text-primary hover:text-primary-light transition-colors">
                                    {alert.action}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Sales Chart & Tasks Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    {/* Sales Chart */}
                    {salesChartData && <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded p-6">
                        <h3 className="text-lg font-bold text-text mb-6">Vendas da Semana</h3>
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
                    {tasks && <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-text">Tarefas Pendentes</h3>
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
                                        <div className="text-xs text-muted mt-1">{task.event}</div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className={`text-xs px-2 py-0.5 rounded ${task.priority === 'HIGH' ? 'bg-error/20 text-error' :
                                            task.priority === 'MEDIUM' ? 'bg-warning/20 text-warning' :
                                                'bg-info/20 text-info'
                                            }`}>
                                            {task.deadline}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Sales / Activity */}
                    {stats && <div className="lg:col-span-2 bg-surface/50 backdrop-blur-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-text">
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
                                <h4 className="text-lg font-bold text-text mb-2">Nenhuma atividade ainda</h4>
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
                                    <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded ${item.type === 'sale' ? 'bg-gradient-to-tr from-primary to-accent' : 'bg-gradient-to-tr from-secondary to-primary'} flex items-center justify-center text-text font-bold text-sm`}>
                                                {item.initials}
                                            </div>
                                            <div>
                                                <div className="font-bold text-text">{item.name}</div>
                                                <div className="text-xs text-muted">{item.action} • {item.event}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            {item.type === 'sale' ? (
                                                <>
                                                    <div className="font-bold text-secondary">+ R$ {(item.amount ?? 0).toLocaleString('pt-BR')}</div>
                                                    <div className="text-xs text-text-disabled">{item.time}</div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex items-center gap-1 justify-end">
                                                        {item.type === 'confirmation' ? (
                                                            <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded border border-success/20">
                                                                Confirmado
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs font-bold text-info bg-info/10 px-2 py-1 rounded border border-info/20">
                                                                Novo
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-text-disabled mt-1">{item.time}</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : stats.hasPaidEvents ? (
                            /* Sales List - For Paid Events Only */
                            <div className="space-y-4">
                                {/* {recentSales.map((sale) => (
                                    <div key={sale.id} className="flex items-center justify-between p-4 bg-white/5 rounded border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-text font-bold text-sm">
                                                {sale.initials}
                                            </div>
                                            <div>
                                                <div className="font-bold text-text">{sale.name}</div>
                                                <div className="text-xs text-muted">{sale.tickets} • {sale.event}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-secondary">+ R$ {sale.amount.toLocaleString('pt-BR')}</div>
                                            <div className="text-xs text-text-disabled">{sale.time}</div>
                                        </div>
                                    </div>
                                ))} */}
                            </div>
                        ) : (
                            /* Activity List - For Private Events Only (confirmations, etc) */
                            <div className="space-y-4">
                                {/* {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-center justify-between p-4 bg-white/5 rounded border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded bg-gradient-to-tr from-secondary to-primary flex items-center justify-center text-text font-bold text-sm">
                                                {activity.initials}
                                            </div>
                                            <div>
                                                <div className="font-bold text-text">{activity.name}</div>
                                                <div className="text-xs text-muted">{activity.action} • {activity.event}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1">
                                                {activity.type === 'confirmation' ? (
                                                    <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded border border-success/20">
                                                        Confirmado
                                                    </span>
                                                ) : (
                                                    <span className="text-xs font-bold text-info bg-info/10 px-2 py-1 rounded border border-info/20">
                                                        Novo
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-text-disabled mt-1">{activity.time}</div>
                                        </div>
                                    </div>
                                ))} */}
                            </div>
                        )}
                    </div>}

                    {/* Quick Actions / Upcoming Events */}
                    {stats && <div className="space-y-8">
                        <div className="bg-surface/50 backdrop-blur-xl">
                            <h3 className="text-xl font-bold text-text mb-6">
                                {stats.hasEvents ? 'Próximos Eventos' : 'Comece Agora'}
                            </h3>
                            <div className="space-y-4">
                                {stats.hasEvents ? (
                                    /* Upcoming Events List */
                                    <>
                                        {/* {upcomingEvents.map((event) => (
                                            <div key={event.id} className={`p-4 ${event.type === 'today' ? 'bg-gradient-to-r from-primary/20 to-accent/20 border-primary/20' : 'bg-white/5 border-white/5'} border rounded`}>
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className={`text-xs font-bold px-2 py-1 rounded ${event.type === 'today' ? 'text-primary bg-primary/10' : 'text-secondary bg-secondary/10'}`}>
                                                        {event.date}
                                                    </span>
                                                    <span className="text-xs text-muted">{event.time}</span>
                                                </div>
                                                <h4 className="font-bold text-text mb-1">{event.title}</h4>
                                                <p className="text-xs text-muted">{event.location}</p>
                                            </div>
                                        ))} */}
                                    </>
                                ) : (
                                    /* Tips for New Users */
                                    <>
                                        {/* Tip 1 - Create Event */}
                                        <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded hover:border-primary/40 transition-colors cursor-pointer"
                                            onClick={() => navigate('/events/create')}>
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center flex-shrink-0">
                                                    <CalendarDaysIcon className="w-4 h-4 text-primary-light" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-text mb-1 text-sm">Crie seu evento</h4>
                                                    <p className="text-xs text-muted">Público ou privado, com ou sem venda de ingressos</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tip 2 - Manage Guests */}
                                        <div className="p-4 bg-white/5 border border-white/5 rounded">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded bg-secondary/20 flex items-center justify-center flex-shrink-0">
                                                    <UserGroupIcon className="w-4 h-4 text-secondary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-text mb-1 text-sm">Gerencia convidados</h4>
                                                    <p className="text-xs text-muted">Controle lista de presença e confirmações</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tip 3 - Marketplace */}
                                        <div className="p-4 bg-white/5 border border-white/5 rounded cursor-pointer"
                                            onClick={() => navigate('/marketplace')}>
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center flex-shrink-0">
                                                    <TicketIcon className="w-4 h-4 text-accent" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-text mb-1 text-sm">Encontre fornecedores</h4>
                                                    <p className="text-xs text-muted">Buffet, decoração, fotografia e mais</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>}
                </div>

                {/* Additional Sections Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    {/* Suppliers Status */}
                    <div className="bg-surface/50 backdrop-blur-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3
                                onClick={() => navigate('/suppliers')}
                                className="text-lg font-bold text-text cursor-pointer hover:text-primary transition-colors">
                                Fornecedores
                            </h3>
                            <TruckIcon className="w-5 h-5 text-muted" />
                        </div>
                        <div className="space-y-3">
                            {suppliers.map((supplier) => (
                                <div key={supplier.id} className="p-3 bg-white/5 rounded border border-white/10">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="text-sm font-bold text-text">{supplier.name}</div>
                                            <div className="text-xs text-muted">{supplier.service}</div>
                                        </div>
                                        <span className={`text-xs px-2 py-0.5 rounded ${supplier.status === 'confirmed' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                                            }`}>
                                            {supplier.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                                        </span>
                                    </div>
                                    <div className="text-xs text-muted">
                                        Pagamento: {supplier.payment === 'paid' ? '✓ Pago' : supplier.payment === 'partial' ? '⚠ Parcial' : '⏳ Pendente'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Messages / Inbox */}
                    <div className="bg-surface/50 backdrop-blur-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3
                                onClick={() => navigate('/messages')}
                                className="text-lg font-bold text-text cursor-pointer hover:text-primary transition-colors">
                                Mensagens
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-error/20 text-error px-2 py-0.5 rounded">
                                    {messages && messages.filter(m => m.unread).length}
                                </span>
                                <ChatBubbleLeftRightIcon className="w-5 h-5 text-muted" />
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

                    {/* Financial Overview */}
                    <div className="bg-surface/50 backdrop-blur-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-text">Financeiro</h3>
                            <CurrencyDollarIcon className="w-5 h-5 text-muted" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted">Receita</span>
                                <span className="text-lg font-bold text-success">R$ {(financialData.revenue / 1000).toFixed(1)}k</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted">Despesas</span>
                                <span className="text-lg font-bold text-error">R$ {(financialData.expenses / 1000).toFixed(1)}k</span>
                            </div>
                            <div className="h-px bg-white/10"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-text">Lucro</span>
                                <span className="text-xl font-black text-accent">R$ {(financialData.profit / 1000).toFixed(1)}k</span>
                            </div>
                            <div className="p-3 bg-info/10 border border-info/20 rounded">
                                <div className="text-xs text-info mb-1">Projeção</div>
                                <div className="text-lg font-bold text-info">R$ {(financialData.projectedProfit / 1000).toFixed(1)}k</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feedback & WaitList Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    {/* Feedback & Reviews */}
                    <div className="bg-surface/50 backdrop-blur-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3
                                onClick={() => navigate('/reviews')}
                                className="text-lg font-bold text-text cursor-pointer hover:text-primary transition-colors">
                                Avaliações Recentes
                            </h3>
                            <StarIcon className="w-5 h-5 text-warning" />
                        </div>
                        <div className="space-y-4">
                            {feedback && feedback.map((item) => (
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
                            ))}
                        </div>
                    </div>

                    {/* WaitList Management */}
                    <div className="bg-surface/50 backdrop-blur-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3
                                onClick={() => navigate('/waitList')}
                                className="text-lg font-bold text-text cursor-pointer hover:text-primary transition-colors">
                                Lista de Espera
                            </h3>
                            <ListBulletIcon className="w-5 h-5 text-muted" />
                        </div>
                        <div className="space-y-3">
                            {waitList.map((person) => (
                                <div key={person.id} className="p-3 bg-white/5 rounded border border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-gradient-to-tr from-warning to-accent flex items-center justify-center text-text font-bold text-xs">
                                            #{person.position}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-text">{person.name}</div>
                                            <div className="text-xs text-muted">{person.email}</div>
                                        </div>
                                    </div>
                                    <button className="text-xs font-bold text-primary hover:text-primary-light transition-colors">
                                        Notificar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
