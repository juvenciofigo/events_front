# Events SaaS - Frontend (esqueleto)

Projeto scaffold com React + TypeScript + Vite + Tailwind + Zustand + React Query.

Como rodar localmente (Windows - cmd.exe):

1. Instalar dependências

```powershell
npm install
```

2. Rodar em dev

```powershell
npm run dev
```

Estrutura base criada com rotas, proteção por role (Zustand), layouts e páginas-esqueleto para: Auth, Dashboards, Events, Seats, Tickets, Chat, Marketplace, Plans, Payments e Invitations. A lógica e integrações (API, real-time, storage) devem ser implementadas depois.

---

# 📡 API Backend - Documentação de Rotas

Esta seção documenta **todas as rotas** que o backend deve implementar para suportar a aplicação frontend.

## 🔐 Autenticação

Base URL: `/api/auth`

| Método | Rota                 | Descrição                | Body                       | Response                  |
|--------|----------------------|--------------------------|----------------------------|---------------------------|
| `POST` | `/register`          | Registrar novo usuário   | `{ email, password, name }`| `{ token, user }`         |
| `POST` | `/login`             | Login de usuário         | `{ email, password }`      | `{ token, user, roles }`  |
| `POST` | `/logout`            | Logout (invalidar token) | -                          | `{ success: true }`       |
| `POST` | `/refresh`           | Renovar token            | `{ refreshToken }`         | `{ token }`               |
| `POST` | `/forgot-password`   | Solicitar reset de senha | `{ email }`                | `{ success: true }`       |
| `POST` | `/reset-password`    | Resetar senha            | `{ token, newPassword }`   | `{ success: true }`       |
| `GET`  | `/me`                | Obter usuário atual      | -                          | `{ user, roles }`         |
| `PUT`  | `/me`                | Atualizar perfil         | `{ name, email, ... }`     | `{ user }`                |

## 👤 Perfis e Roles

Base URL: `/api/profiles`

| Método    | Rota                  | Descrição                     | Body                              | Response              |
|-----------|-----------------------|-------------------------------|-----------------------------------|-----------------------|
| `POST`    | `/organizer`          | Criar perfil de organizador   | `{ companyName, cnpj, ... }`      | `{ profile }`         |
| `POST`    | `/supplier`           | Criar perfil de fornecedor    | `{ companyName, services, ... }`  | `{ profile }`         |
| `GET`     | `/organizer/:userId`  | Obter perfil de organizador   | -                                 | `{ profile }`         |
| `GET`     | `/supplier/:userId`   | Obter perfil de fornecedor    | -                                 | `{ profile }`         |
| `PUT`     | `/organizer/:id`      | Atualizar perfil organizador  | `{ companyName, ... }`            | `{ profile }`         |
| `PUT`     | `/supplier/:id`       | Atualizar perfil fornecedor   | `{ services, ... }`               | `{ profile }`         |
| `GET`     | `/roles`              | Listar roles do usuário       | -                                 | `{ roles: [] }`       |
| `POST`    | `/request-role`       | Solicitar novo role           | `{ role, data }`                  | `{ success: true }`   |

## 🎫 Eventos

Base URL: `/api/events`

| Método  | Rota                     | Descrição                      | Body                                       | Response                            |
|---------|-------------------       |------------------------------  |--------------------------------------------|-------------------------------------|
| `GET`   | `/`                      | Listar eventos públicos        | `?page=1&limit=10&category=...`            | `{ events: [], total, page }`       |
| `GET`   | `/organizer/:organizerId`| Listar eventos do organizador  | `?status=active`                           | `{ events: [] }`                    |
| `GET`   | `/:id`                   | Obter detalhes do evento       | -                                          | `{ event }`                         |
| `POST`  | `/`                      | Criar novo evento              | `{ title, date, location, isPrivate, ... }`| `{ event }`                         |
| `PUT`   | `/:id`                   | Atualizar evento               | `{ title, date, ... }`                     | `{ event }`                         |
| `DELETE`| `/:id`                   | Deletar evento                 | -                                          | `{ success: true }`                 |
| `POST`  | `/:id/publish`           | Publicar evento                | -                                          | `{ event }`                         |
| `POST`  | `/:id/cancel`            | Cancelar evento                | `{ reason }`                               | `{ success: true }`                 |
| `GET`   | `/:id/analytics`         | Analytics do evento            | -                                          | `{ views, sales, conversion, ... }` |
| `GET`   | `/:id/sales-chart`       | Dados para gráfico de vendas   | `?period=week`                             | `{ data: [] }`                      |

## 🎟️ Ingressos

Base URL: `/api/tickets`

| Método    | Rota              | Descrição                     | Body                                          | Response                            |
|-----------|-------------------|-------------------------------|-----------------------------------------------|-------------------------------------|
| `GET`     | `/event/:eventId` | Listar tipos de ingresso      | -                                             | `{ tickets: [] }`                   |
| `POST`    | `/event/:eventId` | Criar tipo de ingresso        | `{ name, price, quantity, ... }`              | `{ ticket }`                        |
| `PUT`     | `/:id`            | Atualizar ingresso            | `{ price, quantity, ... }`                    | `{ ticket }`                        |
| `DELETE`  | `/:id`            | Deletar tipo de ingresso      | -                                             | `{ success: true }`                 |
| `POST`    | `/purchase`       | Comprar ingresso              | `{ ticketId, quantity, paymentMethod }`       | `{ order, tickets }`                |
| `GET`     | `/my-tickets`     | Meus ingressos                | -                                             | `{ tickets: [] }`                   |
| `GET`     | `/:id/qrcode`     | Gerar QR Code                 | -                                             | `{ qrCode: "base64..." }`           |
| `POST`    | `/:id/validate`   | Validar ingresso (check-in)   | `{ qrCode }`                                  | `{ valid: true, ticket }`           |

## 💺 Assentos

Base URL: `/api/seats`

| Método    | Rota                    | Descrição                     | Body                        | Response                          |
|-----------|-------------------------|-------------------------------|-----------------------------|-----------------------------------|
| `GET`     | `/event/:eventId`       | Obter mapa de assentos        |                 -           | `{ seatMap, seats: [] }`          |
| `POST`    | `/event/:eventId/config`| Configurar mapa de assentos   | `{ rows, columns, layout }` | `{ seatMap }`                     |
| `PUT`     | `/:id`                  | Atualizar assento             | `{ status, price, ... }`    | `{ seat }`                        |
| `POST`    | `/reserve`              | Reservar assento              | `{ seatIds: [], eventId }`  | `{ reservation }`                 |
| `POST`    | `/release`              | Liberar reserva               | `{ reservationId }`         | `{ success: true }`               |
| `GET`     | `/availability/:eventId`| Verificar disponibilidade     |                 -           | `{ available: [], reserved: [] }` |

## 👥 Convidados e Lista

Base URL: `/api/guests`

| Método    | Rota                | Descrição              | Body                           | Response                          |
|-----------|---------------------|------------------------|--------------------------------|-----------------------------------|
| `GET`     | `/event/:eventId`   | Listar convidados      | `?status=confirmed`            | `{ guests: [] }`                  |
| `GET`     | `/event/:eventId`   | Listar convidados      | `?limit=10&page=1...`    | `{ guests: [] }`                  |
| `POST`    | `/event/:eventId`   | Adicionar convidado    | `{ name, email, phone, ... }`  | `{ guest }`                       |
| `DELETE`  | `/:id`              | Remover convidado      | -                              | `{ success: true }`               |
| `PUT`     | `/:id`              | Atualizar convidado    | `{ name, status, ... }`        | `{ guest }`                       |
| `POST`    | `/:id/confirm`      | Confirmar presença     | -                              | `{ guest }`                       |
| `POST`    | `/:id/check-in`     | Fazer check-in         | -                              | `{ guest, timestamp }`            |
| `POST`    | `/import`           | Importar lista (CSV)   | `FormData`                     | `{ imported: 50, errors: [] }`    |
| `GET`     | `/export/:eventId`  | Exportar lista         | `?format=csv`                  | `File Download`                   |

## 📧 Convites

Base URL: `/api/invitations`

| Método    | Rota                      | Descrição                 | Body                                  | Response                                  |
|-----------|---------------------------|---------------------------|---------------------------------------|-------------------------------------------|
| `POST`    | `/send`                   | Enviar convites           | `{ eventId, guestIds: [], template }` | `{ sent: 50 }`                            |
| `GET`     | `/:token`                 | Visualizar convite        | -                                     | `{ invitation, event }`                   |
| `POST`    | `/:token/rsvp`            | Responder convite         | `{ attending, guests, message }`      | `{ success: true }`                       |
| `GET`     | `/event/:eventId/stats`   | Estatísticas de convites  | -                                     | `{ sent, opened, confirmed, declined }`   |

## 🏪 Marketplace (Fornecedores)

Base URL: `/api/marketplace`

| Método    | Rota              | Descrição                   | Body                                   | Response                           |
|-----------|-------------------|-----------------------------|----------------------------------------|------------------------------------|
| `GET`     | `/providers`      | Listar fornecedores         | `?service=catering&city=...`           | `{ providers: [] }`                |
| `GET`     | `/providers/:id`  | Detalhes do fornecedor      | -                                      | `{ provider, services, reviews }`  |
| `GET`     | `/services`       | Listar serviços             | `?category=...`                        | `{ services: [] }`                 |
| `POST`    | `/services`       | Criar serviço (fornecedor)  | `{ name, description, price, ... }`| `{ service }`                          |
| `PUT`     | `/services/:id`   | Atualizar serviço           | `{ price, ... }`                       | `{ service }`                      |
| `DELETE`  | `/services/:id`   | Deletar serviço             | -                                      | `{ success: true }`                |
| `POST`    | `/quote-request`  | Solicitar orçamento         | `{ serviceId, eventId, details }`      | `{ request }`                      |
| `GET`     | `/my-requests`    | Minhas solicitações         | -                                      | `{ requests: [] }`                 |
| `POST`    | `/reviews`        | Avaliar fornecedor          | `{ providerId, rating, comment }`      | `{ review }`                       |

## 💬 Mensagens e Chat

Base URL: `/api/messages`

| Método    | Rota                | Descrição              | Body                                       | Response               |
|-----------|---------------------|------------------------|--------------------------------------------|------------------------|
| `GET`     | `/conversations`    | Listar conversas       | -                                          | `{ conversations: [] }`|
| `GET`     | `/conversation/:id` | Obter mensagens        | `?page=1`                                  | `{ messages: [] }`     |
| `POST`    | `/send`             | Enviar mensagem        | `{ conversationId, message, attachments }` | `{ message }`          |
| `PUT`     | `/:id/read`         | Marcar como lida       | -                                          | `{ success: true }`    |
| `DELETE`  | `/:id`              | Deletar mensagem       | -                                          | `{ success: true }`    |
| `GET`     | `/unread-count`     | Contador de não lidas  | -                                          | `{ count: 5 }`         |

## 💰 Pagamentos

Base URL: `/api/payments`

| Método    | Rota                | Descrição                       | Body                              | Response                          |
|-----------|---------------------|---------------------------------|-----------------------------------|-----------------------------------|
| `POST`    | `/create-intent`    | Criar intenção de pagamento     | `{ amount, eventId, ticketIds }`  | `{ clientSecret, orderId }`       |
| `POST`    | `/confirm`          | Confirmar pagamento             | `{ orderId, paymentMethodId }`    | `{ success: true, order }`        |
| `GET`     | `/orders`           | Listar pedidos                  | -                                 | `{ orders: [] }`                  |
| `GET`     | `/orders/:id`       | Detalhes do pedido              | -                                 | `{ order, items, payment }`       |
| `POST`    | `/refund`           | Solicitar reembolso             | `{ orderId, reason }`             | `{ refund }`                      |
| `GET`     | `/balance`          | Saldo disponível (organizador)  | -                                 | `{ balance, pending, available }` |
| `POST`    | `/withdraw`         | Solicitar saque                 | `{ amount, bankAccount }`         | `{ withdrawal }`                  |

## 📊 Dashboard e Analytics

Base URL: `/api/dashboard`

| Método| Rota                        | Descrição              | Body                                    | Response                                      |
|-------|-----------------------------|------------------------|-----------------------------------------|-----------------------------------------------|
| `GET` | `/organizer/stats`       [x]| Estatísticas gerais    | -                                       | `{ totalEvents, ticketsSold, revenue,guests }`|
| `GET` | `/organizer/activity`       | Atividade recente      | `?limit=10`                             | `{ activities: [] }`                          |
| `GET` | `/organizers/sales`      [x]| Gráfico de vendas      | `?period=week`                          | `{ data: [] }`                                |
| `GET` | `/organizer/tasks`       [x]| Tarefas pendentes      | -                                       | `{ tasks: [] }`                               |
| `POST`| `/organizer/tasks`          | Criar tarefa           | `{ title, eventId, deadline, priority }`| `{ task }`                                    |
| `PUT` | `/tasks/:id`                | Atualizar tarefa       | `{ completed, ... }`                    | `{ task }`                                    |
| `GET` | `/supplier/stats`           | Estatísticas fornecedor| -                                       | `{ totalServices, requests, revenue }`        |
| `GET` | `/alerts`                   | Alertas inteligente    | -                                       | `{ alerts: [] }`                              |
## 📋 Tarefas e Checklist

Base URL: `/api/tasks`

| Método    | Rota                      | Descrição                 | Body                                      | Response              |
|-----------|---------------------------|---------------------------|-------------------------------------------|-----------------------|
| `GET`     | `/event/:eventId`         | Tarefas do evento         | -                                         | `{ tasks: [] }`       |
| `POST`    | `/`                       | Criar tarefa              | `{ title, eventId, deadline, priority }`  | `{ task }`            |
| `PUT`     | `/:id`                    | Atualizar tarefa          | `{ completed, title, ... }`               | `{ task }`            |
| `DELETE`  | `/:id`                    | Deletar tarefa            | -                                         | `{ success: true }`   |
| `POST`    | `/:id/assign`             | Atribuir tarefa           | `{ userId }`                              | `{ task }`            |

## 🚚 Fornecedores Contratados

Base URL: `/api/suppliers`

| Método    | Rota                      | Descrição                 | Body                                  | Response                      |
|-----------|---------------------------|---------------------------|---------------------------------------|-------------------------------|
| `GET`     | `/event/:eventId`         | Fornecedores do evento    | -                                     | `{ suppliers: [] }`           |
| `POST`    | `/hire`                   | Contratar fornecedor      | `{ eventId, supplierId, serviceId }`  | `{ contract }`                |
| `PUT`     | `/contract/:id`           | Atualizar contrato        | `{ status, payment, ... }`            | `{ contract }`                |
| `POST`    | `/contract/:id/confirm`   | Confirmar fornecedor      | -                                     | `{ contract }`                |
| `POST`    | `/contract/:id/payment`   | Registrar pagamento       | `{ amount, method }`                  | `{ payment }`                 |

## ⭐ Avaliações e Feedback

Base URL: `/api/reviews`

| Método    | Rota                   | Descrição                 | Body                              | Response                      |
|-----------|------------------------|---------------------------|-----------------------------------|-------------------------------|
| `GET`     | `/event/:eventId`      | Avaliações do evento      | -                                 | `{ reviews: [], avgRating }`  |
| `POST`    | `/event/:eventId`      | Avaliar evento            | `{ rating, comment }`             | `{ review }`                  |
| `GET`     | `/provider/:providerId`| Avaliações do fornecedor  | -                                 | `{ reviews: [], avgRating }`  |
| `POST`    | `/provider/:providerId`| Avaliar fornecedor        | `{ rating, comment, serviceId }`  | `{ review }`                  |
| `PUT`     | `/:id`                 | Editar avaliação          | `{ rating, comment }`             | `{ review }`                  |
| `DELETE`  | `/:id`                 | Deletar avaliação         | -                                 | `{ success: true }`           |

## 📝 Lista de Espera

Base URL: `/api/waitlist`

| Método    | Rota                          | Descrição         | Body                          | Response                      |
|-----------|-------------------------------|-----------------  |-------------------------------|-------------------------------|
| `GET`     | `/event/:eventId`             | Lista de espera   | -                             | `{ waitlist: [] }`            |
| `POST`    | `/join`                       | Entrar na fila    | `{ eventId, name, email }`    | `{ position, waitlistEntry }` |
| `DELETE`  | `/:id`                        | Sair da fila      | -                             | `{ success: true }`           |
| `POST`    | `/:id/notify`                 | Notificar pessoa  | -                             | `{ sent: true }`              |
| `POST`    | `/event/:eventId/notify-all`  | Notificar todos   | `{ message }`                 | `{ sent: 10 }`                |

## 📅 Planos e Assinaturas

Base URL: `/api/subscriptions`

| Método    | Rota              | Descrição             | Body                          | Response                 |
|-----------|-------------------|-----------------------|------------------------------ |--------------------------|
| `GET`     | `/plans`          | Listar planos         | -                             | `{ plans: [] }`          |
| `POST`    | `/subscribe`      | Assinar plano         | `{ planId, paymentMethodId }` | `{ subscription }`       |
| `GET`     | `/my-subscription`| Minha assinatura      | -                             | `{ subscription, plan }` |
| `PUT`     | `/upgrade`        | Upgrade de plano      | `{ newPlanId }`               | `{ subscription }`       |
| `POST`    | `/cancel`         | Cancelar assinatura   | `{ reason }`                  | `{ success: true }`      |
| `GET`     | `/invoices`       | Histórico de faturas  | -                             | `{ invoices: [] }`       |

## 🔔 Notificações

Base URL: `/api/notifications`

| Método    | Rota              | Descrição                 | Body                                  | Response               |
|-----------|-------------------|---------------------------|---------------------------------------|------------------------|
| `GET`     | `/`               | Listar notificações       | `?unread=true`                        | `{ notifications: [] }`|
| `PUT`     | `/:id/read`       | Marcar como lida          | -                                     | `{ success: true }`    |
| `PUT`     | `/read-all`       | Marcar todas como lidas   | -                                     | `{ success: true }`    |
| `DELETE`  | `/:id`            | Deletar notificação       | -                                     | `{ success: true }`    |
| `GET`     | `/unread-count`   | Contador de não lidas     | -                                     | `{ count: 5 }`         |
| `PUT`     | `/preferences`    | Preferências              | `{ email: true, push: false, ... }`   | `{ preferences }`      |

## 📤 Upload de Arquivos

Base URL: `/api/uploads`

| Método    | Rota                  | Descrição                 | Body                         | Response                   |
|-----------|-----------------------|---------------------------|------------------------------|----------------------------|
| `POST`    | `/image`              | Upload de imagem          | `FormData`                   | `{ url, filename }`        |
| `POST`    | `/document`           | Upload de documento       | `FormData`                   | `{ url, filename }`        |
| `POST`    | `/csv`                | Upload de CSV             | `FormData`                   | `{ url, filename, rows }`  |
| `DELETE`  | `/:filename`          | Deletar arquivo           | -                            | `{ success: true }`        |

## 📊 Relatórios

Base URL: `/api/reports`

| Método    | Rota                  | Descrição                 | Body                         | Response             |
|-----------|-----------------------|---------------------------|------------------------------|----------------------|
| `GET`     | `/sales/:eventId`     | Relatório de vendas       | `?format=pdf`                | `File Download`      |
| `GET`     | `/guests/:eventId`    | Relatório de convidados   | `?format=csv`                | `File Download`      |
| `GET`     | `/financial`          | Relatório financeiro      | `?startDate=...&endDate=...` | `File Download`      |
| `GET`     | `/analytics/:eventId` | Relatório de analytics    | -                            | `{ data, charts }`   |

---

# 🔌 WebSocket Events

Base URL: `ws://api.example.com/ws`

## Conexão
```javascript
const socket = io('ws://api.example.com', {
  auth: { token: 'JWT_TOKEN' }
});
```

## Eventos do Cliente → Servidor

| Evento            | Payload                       | Descrição                 |
|-------------------|-------------------------------|---------------------------|
| `join_event`      | `{ eventId }`                 | Entrar no room do evento  |
| `leave_event`     | `{ eventId }`                 | Sair do room do evento    |
| `send_message`    | `{ conversationId, message }` | Enviar mensagem           |
| `typing`          | `{ conversationId }`          | Indicar digitação         |

## Eventos do Servidor → Cliente

| Evento            | Payload                       | Descrição                     |
|-------------------|-------------------------------|---------------------------    |
| `new_sale`        | `{ eventId, sale }`           | Nova venda realizada          |
| `new_confirmation`| `{ eventId, guest }`          | Nova confirmação de presença  |
| `ticket_sold_out` | `{ eventId, ticketType }`     | Ingresso esgotado             |
| `new_message`     | `{ conversationId, message }` | Nova mensagem recebida        |
| `user_typing`     | `{ conversationId, userId }`  | Usuário digitando             |
| `event_updated`   | `{ eventId, changes }`        | Evento atualizado             |
| `notification`    | `{ notification }`            | Nova notificação              |
| `stats_updated`   | `{ stats }`                   | Estatísticas atualizadas      |

---

# 🪝 Webhooks

Webhooks para integrações externas (pagamentos, email, etc.)

Base URL: `/api/webhooks`

| Método | Rota             | Descrição             | Provider      |
|--------|------------------|-----------------------|---------------|
| `POST` | `/stripe`        | Eventos do Stripe     | Stripe        |
| `POST` | `/mercadopago`   | Eventos do MercadoPago| MercadoPago   |
| `POST` | `/sendgrid`      | Eventos de email      | SendGrid      |
| `POST` | `/twilio`        | Eventos de SMS        | Twilio        |

---

# 🔒 Autenticação

Todas as rotas (exceto `/auth/login`, `/auth/register`, `/auth/forgot-password`) requerem autenticação via **JWT Token**.

**Header:**
```
Authorization: Bearer <JWT_TOKEN>
```

## Roles e Permissões

- **User**: Acesso básico (comprar ingressos, ver eventos)
- **Organizer**: Criar eventos, gerenciar vendas, convidados
- **Supplier**: Oferecer serviços, responder orçamentos
- **Admin**: Acesso total ao sistema

---

# 📦 Formato de Resposta Padrão

## Sucesso
```json
{
  "success": true,
  "data": { ... },
  "message": "Operação realizada com sucesso"
}
```

## Erro
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email já cadastrado",
    "details": { ... }
  }
}
```

## Paginação
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

# 🌐 Variáveis de Ambiente

```env
API_BASE_URL=http://localhost:3000/api
WS_URL=ws://localhost:3000
STRIPE_PUBLIC_KEY=pk_test_...
GOOGLE_MAPS_API_KEY=...
```

##############################################################

# 📡 API Backend - Documentação de Rotas
(Atualizado conforme implementação em `src/services`)

## 🔐 Autenticação (`authApi.ts`)

Base URL: `/api/auth`

| Método | Rota                 | Descrição                | Body                       | Response                  |
|--------|----------------------|--------------------------|----------------------------|---------------------------|
| `POST` | `/login`             | Login de usuário         | `{ email, password }`      | `{ token, user, roles }`  |
| `POST` | `/logout`            | Logout (invalidar token) | -                          | `{ success: true }`       |
| `POST` | `/refresh`           | Renovar token            | -                          | `{ token }`               |

## 👤 Perfis (`profileApi.ts`)

Base URL: `/api`

| Método | Rota                 | Descrição                     | Body                              | Response              |
|--------|----------------------|-------------------------------|-----------------------------------|-----------------------|
| `POST` | `/organizers`        | Criar perfil de organizador   | `{ companyName, cnpj, ... }`      | `{ profile }`         |
| `POST` | `/suppliers`         | Criar perfil de fornecedor    | `{ companyName, services, ... }`  | `{ profile }`         |
| `GET`  | `/organizers/:id/me` | Obter perfil de organizador   | -                                 | `{ profile }`         |
| `GET`  | `/suppliers/:id/me`  | Obter perfil de fornecedor    | -                                 | `{ profile }`         |

## 🎫 Eventos (`eventsApi.ts`)

Base URL: `/api/events`

| Método | Rota                               | Descrição                      | Body                                       | Response                            |
|--------|------------------------------------|------------------------------  |--------------------------------------------|-------------------------------------|
| `GET`  | `/organizer/:organizerId`          | Listar eventos do organizador  | `?limit=10&page=1&sort=createdAt`    | `{ content: [], totalElements, ... }`|
| `GET`  | `/:id`                             | Obter detalhes do evento       | -                                          | `{ event }`                         |
| `POST` | `/`                                | Criar novo evento              | `FormData` (com imagem) ou JSON            | `{ event }`                         |

## 💸 Despesas (`expensesApi.ts`)

Base URL: `/api/expenses`

| Método   | Rota                         | Descrição              | Body                           | Response                          |
|----------|------------------------------|------------------------|--------------------------------|-----------------------------------|
| `GET`    | `/event/:eventId`            | Listar despesas        | -                              | `{ expenses: [] }`                |
| `GET`    | `/event/:eventId/summary`    | Resumo financeiro      | -                              | `{ total, paid, pending }`        |
| `POST`   | `/event/:eventId`            | Criar despesa          | `{ description, amount, ... }` | `{ expense }`                     |
| `PUT`    | `/:id`                       | Atualizar despesa      | `{ description, ... }`         | `{ expense }`                     |
| `DELETE` | `/:id`                       | Deletar despesa        | -                              | `{ success: true }`               |
| `POST`   | `/:id/pay`                   | Pagar despesa          | `{ paymentDate, method }`      | `{ expense }`                     |

## 🚚 Fornecedores do Evento (`suppliersApi.ts`)

Base URL: `/api/suppliers`

| Método   | Rota                         | Descrição              | Body                           | Response                          |
|----------|------------------------------|------------------------|--------------------------------|-----------------------------------|
| `GET`    | `/event/:eventId`            | Listar fornecedores    | -                              | `{ suppliers: [] }`               |
| `POST`   | `/event/:eventId`            | Adicionar fornecedor   | `{ name, category, ... }`      | `{ supplier }`                    |
| `PUT`    | `/:id`                       | Atualizar fornecedor   | `{ name, ... }`                | `{ supplier }`                    |
| `DELETE` | `/:id`                       | Remover fornecedor     | -                              | `{ success: true }`               |

## 📋 Tarefas (`tasksApi.ts`)

Base URL: `/api/tasks`

| Método   | Rota                         | Descrição              | Body                           | Response                          |
|----------|------------------------------|------------------------|--------------------------------|-----------------------------------|
| `GET`    | `/event/:eventId`            | Listar tarefas         | -                              | `{ tasks: [] }`                   |
| `POST`   | `/event/:eventId`            | Criar tarefa           | `{ title, priority, ... }`     | `{ task }`                        |
| `PUT`    | `/:id`                       | Atualizar tarefa       | `{ status, ... }`              | `{ task }`                        |
| `DELETE` | `/:id`                       | Deletar tarefa         | -                              | `{ success: true }`               |
| `POST`   | `/:taskId/assign`            | Atribuir tarefa        | `{ userId }`                   | `{ task }`                        |

## 👥 Equipe (`teamApi.ts`)

Base URL: `/api/team`

| Método   | Rota                         | Descrição              | Body                           | Response                          |
|----------|------------------------------|------------------------|--------------------------------|-----------------------------------|
| `GET`    | `/event/:eventId`            | Listar equipe          | -                              | `{ members: [] }`                 |
| `POST`   | `/event/:eventId`            | Adicionar membro       | `{ name, role, email, ... }`   | `{ member }`                      |
| `PUT`    | `/:id`                       | Atualizar membro       | `{ role, ... }`                | `{ member }`                      |
| `DELETE` | `/:id`                       | Remover membro         | -                              | `{ success: true }`               |
| `POST`   | `/:memberId/assign-task`     | Atribuir tarefa        | `{ taskId }`                   | `{ success: true }`               |

## 💰 Financeiro (`financialApi.ts`)

Base URL: `/api/financial`

| Método   | Rota                                     | Descrição              | Body                           | Response                          |
|----------|------------------------------------------|------------------------|--------------------------------|-----------------------------------|
| `GET`    | `/event/:eventId/stats`                  | Estatísticas           | -                              | `{ revenue, ticketsSold... }`     |
| `GET`    | `/event/:eventId/transactions`           | Transações             | `?limit=10&page=1`             | `{ transactions: [] }`            |

## 📊 Dashboard (`dashboardApi.ts`)

Base URL: `/api`

| Método   | Rota                                     | Descrição              | Body                           | Response                          |
|----------|------------------------------------------|------------------------|--------------------------------|-----------------------------------|
| `GET`    | `/organizers/:organizerId/stats`         | Stats do Dashboard     | -                              | `{ totalEvents, revenue... }`     |
| `GET`    | `/organizers/:organizerId/sales`         | Gráfico de vendas      | -                              | `{ data: [] }`                    |
| `GET`    | `/organizers/:organizerId/tasks`         | Tarefas pendentes      | -                              | `{ tasks: [] }`                   |
| `GET`    | `/events/organizer/:id?upcoming=true`    | Eventos futuros        | -                              | `{ events: [] }`                  |
| `GET`    | `/chats/messages/:organizerId`           | Mensagens recentes     | `?limit=10`                    | `{ messages: [] }`                |
| `GET`    | `/reviews`                               | Feedback               | `?target=...&targetId=...`     | `{ items: [] }`                   |

---

# 🔌 WebSocket Events

Base URL: `ws://api.example.com/ws`

## Conexão
```javascript
const socket = io('ws://api.example.com', {
  auth: { token: 'JWT_TOKEN' }
});
```

## Eventos do Cliente → Servidor

| Evento            | Payload                       | Descrição                 |
|-------------------|-------------------------------|---------------------------|
| `join_event`      | `{ eventId }`                 | Entrar no room do evento  |
| `leave_event`     | `{ eventId }`                 | Sair do room do evento    |
| `send_message`    | `{ conversationId, message }` | Enviar mensagem           |
| `typing`          | `{ conversationId }`          | Indicar digitação         |

## Eventos do Servidor → Cliente

| Evento            | Payload                       | Descrição                     |
|-------------------|-------------------------------|---------------------------    |
| `new_sale`        | `{ eventId, sale }`           | Nova venda realizada          |
| `new_confirmation`| `{ eventId, guest }`          | Nova confirmação de presença  |
| `ticket_sold_out` | `{ eventId, ticketType }`     | Ingresso esgotado             |
| `new_message`     | `{ conversationId, message }` | Nova mensagem recebida        |
| `user_typing`     | `{ conversationId, userId }`  | Usuário digitando             |
| `event_updated`   | `{ eventId, changes }`        | Evento atualizado             |
| `notification`    | `{ notification }`            | Nova notificação              |
| `stats_updated`   | `{ stats }`                   | Estatísticas atualizadas      |

---

# 🪝 Webhooks

Webhooks para integrações externas (pagamentos, email, etc.)

Base URL: `/api/webhooks`

| Método | Rota             | Descrição             | Provider      |
|--------|------------------|-----------------------|---------------|
| `POST` | `/stripe`        | Eventos do Stripe     | Stripe        |
| `POST` | `/mercadopago`   | Eventos do MercadoPago| MercadoPago   |
| `POST` | `/sendgrid`      | Eventos de email      | SendGrid      |
| `POST` | `/twilio`        | Eventos de SMS        | Twilio        |

---

# 🔒 Autenticação

Todas as rotas (exceto `/auth/login`, `/auth/register`, `/auth/forgot-password`) requerem autenticação via **JWT Token**.

**Header:**
```
Authorization: Bearer <JWT_TOKEN>
```

## Roles e Permissões

- **User**: Acesso básico (comprar ingressos, ver eventos)
- **Organizer**: Criar eventos, gerenciar vendas, convidados
- **Supplier**: Oferecer serviços, responder orçamentos
- **Admin**: Acesso total ao sistema

---

# 📦 Formato de Resposta Padrão

## Sucesso
```json
{
  "success": true,
  "data": { ... },
  "message": "Operação realizada com sucesso"
}
```

## Erro
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email já cadastrado",
    "details": { ... }
  }
}
```

## Paginação
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

# 🌐 Variáveis de Ambiente

```env
API_BASE_URL=http://localhost:3000/api
WS_URL=ws://localhost:3000
STRIPE_PUBLIC_KEY=pk_test_...
GOOGLE_MAPS_API_KEY=...
```
