import { Event } from "@/types/events";
import { FinancialStats, Transaction } from "@/types/finance";
import { Expense, ExpensesSummary } from "@/types/expense";
import { Task } from "@/types/tasks";
import { PaymentMethod, PaymentStatus, Priority, ProgressStatus } from "@/types/system";

/**
 * Complete mock event data for testing and development
 */
export const mockEvent: Event = {
    id: "evt_2024_001",
    title: "Tech Summit 2024 - Inovação e Futuro",
    description: "O maior evento de tecnologia do ano! Junte-se a nós para três dias incríveis de palestras inspiradoras, workshops práticos e networking com os principais líderes da indústria tech. Descubra as últimas tendências em IA, blockchain, cloud computing e muito mais.",
    dateStart: "2024-12-15T09:00:00",
    dateEnd: "2024-12-17T18:00:00",
    location: "Centro de Convenções Internacional - São Paulo, SP",
    status: "active",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
    category: "Tecnologia",
    budgetEstimated: 150000,
    budgetSpent: 87500,
    isPublic: true,
    estimatedGuest: 500
};

/**
 * Mock financial statistics for the event
 */
export const mockFinancialStats: FinancialStats = {
    totalRevenue: 245000,
    netRevenue: 220500,
    totalExpenses: 87500,
    totalFees: 12250,
    totalDiscounts: 12250,
    revenueBySeat: [
        {
            seatName: "VIP Premium",
            revenue: 98000,
            quantity: 140
        },
        {
            seatName: "Pista Gold",
            revenue: 84000,
            quantity: 210
        },
        {
            seatName: "Pista Standard",
            revenue: 42000,
            quantity: 150
        },
        {
            seatName: "Camarote",
            revenue: 21000,
            quantity: 30
        }
    ],
    revenueByPaymentMethod: [
        {
            method: "CARD",
            revenue: 171500,
            quantity: 378
        },
        {
            method: "MPESA",
            revenue: 73500,
            quantity: 152
        }
    ],
    recentTransactions: [
        {
            id: "txn_001",
            date: "2024-12-10T14:32:00",
            guestName: "João Silva",
            guestId: "guest_001",
            seatName: "VIP Premium",
            amount: 700,
            paymentMethod: PaymentMethod.MPESA,
            paymentStatus: "COMPLETED" as any
        },
        {
            id: "txn_002",
            date: "2024-12-10T13:15:00",
            guestName: "Maria Santos",
            guestId: "guest_002",
            seatName: "Pista Gold",
            amount: 400,
            paymentMethod: PaymentMethod.MPESA,
            paymentStatus: "COMPLETED" as any
        },
        {
            id: "txn_003",
            date: "2024-12-10T12:45:00",
            guestName: "Pedro Oliveira",
            guestId: "guest_003",
            seatName: "Camarote",
            amount: 700,
            paymentMethod: PaymentMethod.MPESA,
            paymentStatus: "PENDING" as any
        },
        {
            id: "txn_004",
            date: "2024-12-10T11:20:00",
            guestName: "Ana Costa",
            guestId: "guest_004",
            seatName: "Pista Standard",
            amount: 280,
            paymentMethod: PaymentMethod.MPESA,
            paymentStatus: "COMPLETED" as any
        },
        {
            id: "txn_005",
            date: "2024-12-10T10:05:00",
            guestName: "Carlos Mendes",
            guestId: "guest_005",
            seatName: "VIP Premium",
            amount: 700,
            paymentMethod: PaymentMethod.MPESA,
            paymentStatus: "FAILED" as any
        }
    ]
};

/**
 * Mock expenses for the event
 */
export const mockExpenses: Expense[] = [
    {
        id: "exp_001",
        title: "Aluguel do Centro de Convenções",
        category: "Locação",
        description: "Aluguel do espaço principal para os 3 dias do evento",
        amount: 45000,
        priority: Priority.HIGH,
        status: ProgressStatus.DONE,
        paymentStatus: PaymentStatus.PAID,
        dueDate: "2024-11-30T23:59:59",
        createdAt: "2024-10-15T10:00:00",
        updatedAt: "2024-11-28T14:30:00"
    },
    {
        id: "exp_002",
        title: "Sistema de Som e Iluminação",
        category: "Equipamentos",
        description: "Locação de equipamentos audiovisuais profissionais",
        amount: 18500,
        priority: Priority.HIGH,
        status: ProgressStatus.DONE,
        paymentStatus: PaymentStatus.PAID,
        dueDate: "2024-12-05T23:59:59",
        createdAt: "2024-10-20T11:00:00",
        updatedAt: "2024-12-04T16:20:00"
    },
    {
        id: "exp_003",
        title: "Catering e Buffet",
        category: "Alimentação",
        description: "Coffee breaks e almoços para 500 pessoas durante 3 dias",
        amount: 12000,
        priority: Priority.MEDIUM,
        status: ProgressStatus.IN_PROGRESS,
        paymentStatus: PaymentStatus.PENDING,
        dueDate: "2024-12-14T23:59:59",
        createdAt: "2024-11-01T09:00:00",
        updatedAt: "2024-12-08T10:15:00"
    },
    {
        id: "exp_004",
        title: "Material Gráfico e Sinalização",
        category: "Marketing",
        description: "Banners, crachás, folders e material promocional",
        amount: 5500,
        priority: Priority.MEDIUM,
        status: ProgressStatus.DONE,
        paymentStatus: PaymentStatus.PAID,
        dueDate: "2024-12-10T23:59:59",
        createdAt: "2024-11-10T14:00:00",
        updatedAt: "2024-12-09T11:45:00"
    },
    {
        id: "exp_005",
        title: "Segurança e Equipe de Apoio",
        category: "Serviços",
        description: "Equipe de segurança e staff de apoio durante o evento",
        amount: 6500,
        priority: Priority.HIGH,
        status: ProgressStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        dueDate: "2024-12-17T23:59:59",
        createdAt: "2024-11-15T16:00:00",
        updatedAt: "2024-11-15T16:00:00"
    }
];

/**
 * Mock expenses summary
 */
export const mockExpensesSummary: ExpensesSummary = {
    totalExpenses: 5,
    pendingExpenses: 2,
    totalAmount: 87500
};

/**
 * Mock tasks for the event
 */
export const mockTasks: Task[] = [
    {
        id: "task_001",
        responsibleName: "Roberto Almeida",
        responsiblePhone: "+258 84 123 4567",
        title: "Confirmar palestrantes principais",
        description: "Entrar em contato com os 5 palestrantes principais para confirmar presença e necessidades técnicas",
        priority: Priority.HIGH,
        taskStatus: ProgressStatus.DONE,
        dueDate: "2024-12-01T23:59:59",
        createdAt: "2024-10-15T09:00:00",
        updatedAt: "2024-11-28T15:30:00"
    },
    {
        id: "task_002",
        responsibleName: "Fernanda Lima",
        responsiblePhone: "+258 85 234 5678",
        title: "Testar sistema de credenciamento",
        description: "Realizar testes completos do sistema de check-in e emissão de crachás",
        priority: Priority.HIGH,
        taskStatus: ProgressStatus.IN_PROGRESS,
        dueDate: "2024-12-12T23:59:59",
        createdAt: "2024-11-20T10:00:00",
        updatedAt: "2024-12-09T14:20:00"
    },
    {
        id: "task_003",
        responsibleName: "Lucas Ferreira",
        responsiblePhone: "+258 86 345 6789",
        title: "Preparar kits de boas-vindas",
        description: "Montar e organizar 500 kits com material promocional, caneta, bloco e brindes",
        priority: Priority.MEDIUM,
        taskStatus: ProgressStatus.PENDING,
        dueDate: "2024-12-13T23:59:59",
        createdAt: "2024-11-25T11:00:00",
        updatedAt: "2024-11-25T11:00:00"
    },
    {
        id: "task_004",
        responsibleName: "Juliana Martins",
        responsiblePhone: "+258 87 456 7890",
        title: "Coordenar equipe de fotografia",
        description: "Briefing com fotógrafos e videomakers sobre cobertura do evento",
        priority: Priority.MEDIUM,
        taskStatus: ProgressStatus.IN_PROGRESS,
        dueDate: "2024-12-14T23:59:59",
        createdAt: "2024-11-28T13:00:00",
        updatedAt: "2024-12-08T16:45:00"
    },
    {
        id: "task_005",
        responsibleName: "Marcos Souza",
        responsiblePhone: "+258 84 567 8901",
        title: "Configurar rede Wi-Fi",
        description: "Instalar e testar pontos de acesso Wi-Fi em todas as áreas do evento",
        priority: Priority.HIGH,
        taskStatus: ProgressStatus.PENDING,
        dueDate: "2024-12-14T23:59:59",
        createdAt: "2024-12-01T08:00:00",
        updatedAt: "2024-12-01T08:00:00"
    },
    {
        id: "task_006",
        responsibleName: "Patricia Rocha",
        responsiblePhone: "+258 85 678 9012",
        title: "Enviar comunicado final aos participantes",
        description: "Enviar e-mail com informações finais: horários, localização, estacionamento e dicas",
        priority: Priority.MEDIUM,
        taskStatus: ProgressStatus.PENDING,
        dueDate: "2024-12-13T23:59:59",
        createdAt: "2024-12-05T09:00:00",
        updatedAt: "2024-12-05T09:00:00"
    }
];

/**
 * Additional mock events for list/grid views
 */
export const mockEvents: Event[] = [
    mockEvent,
    {
        id: "evt_2024_002",
        title: "Festival de Música Verão 2025",
        description: "Três dias de música ao vivo com os melhores artistas nacionais e internacionais. Prepare-se para uma experiência inesquecível com shows, food trucks e muito mais!",
        dateStart: "2025-01-20T14:00:00",
        dateEnd: "2025-01-22T23:00:00",
        location: "Parque da Cidade - Rio de Janeiro, RJ",
        status: "upcoming",
        coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=600&fit=crop",
        category: "Música",
        budgetEstimated: 300000,
        budgetSpent: 125000,
        isPublic: true,
        estimatedGuest: 2000
    },
    {
        id: "evt_2024_003",
        title: "Workshop de Fotografia Profissional",
        description: "Aprenda técnicas avançadas de fotografia com profissionais renomados. Inclui sessões práticas, análise de portfólio e certificado de participação.",
        dateStart: "2024-12-10T10:00:00",
        dateEnd: "2024-12-10T17:00:00",
        location: "Estúdio Luz & Arte - Belo Horizonte, MG",
        status: "active",
        coverImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&h=600&fit=crop",
        category: "Educação",
        budgetEstimated: 15000,
        budgetSpent: 12000,
        isPublic: false,
        estimatedGuest: 30
    },
    {
        id: "evt_2024_004",
        title: "Conferência de Empreendedorismo",
        description: "Conecte-se com empreendedores de sucesso, investidores e mentores. Palestras motivacionais, pitch sessions e oportunidades de networking.",
        dateStart: "2025-02-05T08:00:00",
        dateEnd: "2025-02-06T19:00:00",
        location: "Hotel Grand Plaza - Brasília, DF",
        status: "upcoming",
        coverImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=600&fit=crop",
        category: "Negócios",
        budgetEstimated: 80000,
        budgetSpent: 35000,
        isPublic: true,
        estimatedGuest: 300
    },
    {
        id: "evt_2024_005",
        title: "Maratona de Corrida Solidária",
        description: "Participe da nossa corrida beneficente! Todas as inscrições serão revertidas para instituições de caridade locais. Categorias: 5km, 10km e 21km.",
        dateStart: "2025-03-15T06:00:00",
        location: "Parque Ibirapuera - São Paulo, SP",
        status: "upcoming",
        coverImage: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200&h=600&fit=crop",
        category: "Esportes",
        budgetEstimated: 45000,
        budgetSpent: 18000,
        isPublic: true,
        estimatedGuest: 800
    },
    {
        id: "evt_2023_006",
        title: "Gala de Premiação Anual",
        description: "Noite de gala para celebrar os destaques do ano. Jantar, premiações e apresentações especiais. Traje: black tie.",
        dateStart: "2023-11-25T19:00:00",
        dateEnd: "2023-11-25T23:30:00",
        location: "Salão Nobre do Teatro Municipal - Porto Alegre, RS",
        status: "completed",
        coverImage: "https://images.unsplash.com/photo-1519167758481-83f29da8c6b0?w=1200&h=600&fit=crop",
        category: "Corporativo",
        budgetEstimated: 120000,
        budgetSpent: 118500,
        isPublic: false,
        estimatedGuest: 200
    }
];
