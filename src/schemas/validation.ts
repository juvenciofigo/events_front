import { PaymentMethod, PaymentStatus, Priority, ProgressStatus } from "@/types/system";
import * as z from "zod";

// ============ Auth Schemas ============

export const loginSchema = z.object({
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    password: z.string().min(5, "Senha deve ter no mínimo 5 caracteres"),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const registerSchema = z
    .object({
        name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome muito longo"),
        email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
        password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
        confirmPassword: z.string().min(6, "Confirmação de senha é obrigatória"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Senhas não correspondem",
        path: ["confirmPassword"],
    });

export type RegisterForm = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
});

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const roleSelectSchema = z.object({
    role: z.enum(["organizers", "suppliers", "guest"], {
        errorMap: () => ({ message: "Selecione um perfil válido" }),
    }),
});

export type RoleSelectForm = z.infer<typeof roleSelectSchema>;

// ============ Event Schemas ============

export const eventCreateSchema = z.object({
    title: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome muito longo"),
    category: z.string().min(2, "Categoria deve ter no mínimo 2 caracteres").max(50, "Categoria muito longa"),
    estimatedGuest: z.number().int("Capacidade deve ser um número inteiro").nonnegative("Capacidade deve ser positiva").optional(),
    budgetEstimated: z.number().int("Capacidade deve ser um número inteiro").nonnegative("Capacidade deve ser positiva").optional(),
    budgetSpent: z.number().int("Capacidade deve ser um número inteiro").nonnegative("Capacidade deve ser positiva").optional(),
    description: z.string().max(1000, "Descrição muito longa").optional(),
    dateStart: z
        .string()
        .refine((date) => {
            const d = new Date(date);
            return !isNaN(d.getTime());
        }, "Data inválida")
        .refine((date) => {
            const d = new Date(date);
            return d >= new Date();
        }, "A data de início não pode ser no passado"),
    dateEnd: z
        .string()
        .refine((date) => {
            if (!date) return true;
            const d = new Date(date);
            return !isNaN(d.getTime());
        }, "Data inválida")
        .optional(),
    isPublic: z.boolean(),
    image: z.any().optional(),
}).refine((data) => {
    if (!data.dateEnd || !data.dateStart) return true;
    const start = new Date(data.dateStart);
    const end = new Date(data.dateEnd);
    return end >= start;
}, {
    message: "A data de término deve ser posterior à data de início",
    path: ["dateEnd"],
});

export type EventCreateForm = z.infer<typeof eventCreateSchema>;

export const eventEditSchema = eventCreateSchema;

export type EventEditForm = z.infer<typeof eventEditSchema>;

// ============ Service/Marketplace Schemas ============

export const serviceCreateSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome muito longo"),
    description: z.string().max(1000, "Descrição muito longa"),
    category: z.string().min(2, "Categoria inválida").optional(),
    price: z.coerce.number().nonnegative("Preço não pode ser negativo").optional(),
    image: z.string().url("URL da imagem inválida").optional(),
});

export type ServiceCreateForm = z.infer<typeof serviceCreateSchema>;

export const serviceEditSchema = serviceCreateSchema;

export type ServiceEditForm = z.infer<typeof serviceEditSchema>;

// ============ Seat Schemas ============

export const seatSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório").max(50, "Nome muito longo"),
    description: z.string().max(500, "Descrição muito longa").optional(),
    totalSeats: z.coerce.number().int("Deve ser número inteiro").nonnegative("Não pode ser negativo").optional(),
    isPaid: z.union([z.boolean(), z.string()]).transform((val) => val === true || val === "true").optional(),
    price: z.coerce.number().nonnegative("Preço não pode ser negativo").optional(),
    layoutPositionX: z.coerce.number().optional(),
    layoutPositionY: z.coerce.number().optional(),
}).refine((data) => {
    if (data.isPaid) {
        return data.price !== undefined && data.price > 0;
    }
    return true;
}, {
    message: "Preço deve ser maior que zero se o assento for pago",
    path: ["price"],
});

export type SeatFormData = z.infer<typeof seatSchema>;

// ============ Profile Schemas ============

export const profileSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome muito longo"),
    email: z.string().email("Email inválido"),
    phone: z
        .string()
        .regex(/^8[2-7]\d{7}$/, "Telefone deve ser um número móvel válido (82-87 + 7 dígitos)")
        .optional()
        .or(z.literal("")),
    bio: z.string().max(500, "Bio muito longa").optional(),
    avatar: z.string().url("URL do avatar inválida").optional(),
});

export type ProfileForm = z.infer<typeof profileSchema>;

// ============ Ticket Types Schemas ============

export const ticketTypeSchema = z.object({
    name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres").max(50, "Nome muito longo"),
    price: z.coerce.number().nonnegative("Preço não pode ser negativo"),
    quantity: z.coerce.number().int("Deve ser número inteiro").positive("Quantidade deve ser positiva"),
    description: z.string().max(200, "Descrição muito longa").optional(),
});

export type TicketTypeForm = z.infer<typeof ticketTypeSchema>;

// ============ Guest Schemas ============

export const guestCreateSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome muito longo"),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    phone: z
        .string()
        .regex(/^8[2-7]\d{7}$/, "Telefone deve ser um número móvel válido (82-87 + 7 dígitos)")
        .optional()
        .or(z.literal("")),
    eventId: z.string().min(1, "Event ID é obrigatório"),
    totalPeople: z.coerce.number().int("Deve ser número inteiro").positive("Quantidade deve ser positiva").optional(),
    notes: z.string().max(500, "Notas muito longas").optional(),
    seatId: z.string().optional(),
    payerNum: z
        .string()
        .regex(/^8[2-7]\d{7}$/, "Telefone deve ser um número móvel válido (82-87 + 7 dígitos)")
        .optional()
        .or(z.literal("")),
    paymentMethod: z.nativeEnum(PaymentMethod).optional(),
});

export type GuestCreateForm = z.infer<typeof guestCreateSchema>;

export const guestEditSchema = guestCreateSchema;

export type GuestEditForm = z.infer<typeof guestEditSchema>;

// ============ Operations Schemas ============

export const expenseCreateSchema = z.object({
    title: z.string().min(3, "Título deve ter no mínimo 3 caracteres").optional().or(z.literal("")),
    category: z.string().min(1, "Categoria é obrigatória").optional().or(z.literal("")),
    description: z.string().min(3, "Descrição deve ter no mínimo 3 caracteres").optional().or(z.literal("")),
    priority: z.nativeEnum(Priority).optional().or(z.literal("")),
    status: z.nativeEnum(ProgressStatus).optional().or(z.literal("")),
    amount: z.coerce.number().positive("Valor deve ser positivo").optional().or(z.literal(0)).or(z.literal(0)),
    dueDate: z.string()
        .refine((date) => !date || !isNaN(new Date(date).getTime()), "Data inválida")
        .optional()
        .or(z.literal("")),
    paymentStatus: z.nativeEnum(PaymentStatus).optional().or(z.literal("")),
});

export type ExpenseCreateForm = z.infer<typeof expenseCreateSchema>;

export const supplierCreateSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    category: z.string().min(1, "Categoria é obrigatória"),
    contactName: z.string().min(3, "Nome do contato deve ter no mínimo 3 caracteres"),
    phone: z.string().regex(/^8[2-7]\d{7}$|^[1-9]{2}9?[0-9]{8}$/, "Telefone inválido").optional().or(z.literal("")),
    email: z.string().email("Email inválido"),
    contractValue: z.coerce.number().nonnegative("Valor deve ser positivo"),
    status: z.enum(["active", "inactive"]).optional(),
});

export type SupplierCreateForm = z.infer<typeof supplierCreateSchema>;

export const taskCreateSchema = z.object({
    title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]),
    category: z.string().min(1, "Categoria é obrigatória"),
    dueDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), "Data inválida"),
    status: z.enum(["pending", "completed"]).optional(),
});

export type TaskCreateForm = z.infer<typeof taskCreateSchema>;

export const teamMemberCreateSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    role: z.string().min(2, "Função deve ter no mínimo 2 caracteres"),
    phone: z.string().regex(/^8[2-7]\d{7}$|^[1-9]{2}9?[0-9]{8}$/, "Telefone inválido").optional().or(z.literal("")),
    email: z.string().email("Email inválido"),
});

export type TeamMemberCreateForm = z.infer<typeof teamMemberCreateSchema>;
