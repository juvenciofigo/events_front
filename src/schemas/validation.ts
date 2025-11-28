import * as z from "zod";

// ============ Auth Schemas ============

export const loginSchema = z.object({
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    password: z.string().min(5, "Senha deve ter no mínimo 5 caracteres"),
    // role: z.enum(["organizers", "suppliers", "guest"]).optional().nullable(),
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
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome muito longo"),
    type: z.string().min(2, "Tipo deve ter no mínimo 2 caracteres").max(50, "Tipo muito longo"),
    description: z.string().max(1000, "Descrição muito longa").optional(),
    date: z
        .string()
        .refine((date) => {
            const d = new Date(date);
            return !isNaN(d.getTime());
        }, "Data inválida")
        .optional(),
    location: z.string().max(200, "Local muito longo").optional(),
    capacity: z.coerce.number().int("Capacidade deve ser um número inteiro").positive("Capacidade deve ser positiva").optional(),
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
    paid: z.boolean().optional(),
    price: z.coerce.number().nonnegative("Preço não pode ser negativo").optional(),
    totalSeats: z.coerce.number().int("Deve ser número inteiro").nonnegative("Não pode ser negativo").optional(),
    availableSeats: z.coerce.number().int("Deve ser número inteiro").nonnegative("Não pode ser negativo").optional(),
    posX: z.coerce.number().optional(),
    posY: z.coerce.number().optional(),
});

export type SeatFormData = z.infer<typeof seatSchema>;

// ============ Profile Schemas ============

export const profileSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome muito longo"),
    email: z.string().email("Email inválido"),
    phone: z.string().max(20, "Telefone inválido").optional(),
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
