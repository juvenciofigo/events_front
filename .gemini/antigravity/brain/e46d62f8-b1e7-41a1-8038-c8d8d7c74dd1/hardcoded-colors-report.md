# Relatório de Cores Hardcoded

## Resumo
Encontrei **muitos** componentes e páginas usando cores hardcoded do Tailwind ao invés das variáveis CSS personalizadas definidas em `index.css`.

## Problemas Principais

### Cores mais usadas (hardcoded):
- `slate-*` (cinza) - deveria usar `text-muted`, `bg-surface`, etc.
- `fuchsia-*` (rosa/magenta) - deveria usar `primary`
- `cyan-*` (ciano) - deveria usar `secondary`
- `purple-*` (roxo) - deveria usar `accent`
- `bg-white`, `text-white`, `bg-black`, `text-black` - deveriam usar `bg-background`, `text-text`, etc.

---

## Componentes Críticos (Prioridade Alta)

### 1. **MainNav.tsx** ✅ Parcialmente correto
- ✅ Linha 37: Usa `border-borderColor-light dark:border-white/20`
- ❌ Linha 74: `bg-slate-900/95` → deveria ser `bg-surface/95`

### 2. **LoginRegister.tsx**
- ❌ Linha 33: `hover:text-cyan-400` → `hover:text-secondary`
- ❌ Linhas 56, 63: `hover:border-fuchsia-500/50` → `hover:border-primary/50`

### 3. **Sidebar.tsx**
- ❌ Linha 36: `bg-slate-900` → `bg-surface`
- ❌ Linha 38: `from-fuchsia-500 to-cyan-500` → `from-primary to-secondary`
- ❌ Linha 49: `bg-fuchsia-600` → `bg-primary`
- ❌ Linha 50: `text-slate-400` → `text-muted`
- ❌ Linha 53: `text-slate-500` → `text-muted`
- ❌ Linha 61: `from-slate-800 to-slate-900` → `from-surface-hover to-surface`

### 4. **Form/Button.tsx**
- ❌ Linha 25: `focus:ring-offset-slate-950` → `focus:ring-offset-background`
- ❌ Linha 28: `from-fuchsia-600 to-purple-600` → `from-primary to-accent`

### 5. **Form/Input.tsx**
- ❌ Linha 17: `dark:text-slate-300` → `dark:text-text-secondary`
- ❌ Linha 26: `dark:bg-slate-950/80` → `dark:bg-background/80`
- ❌ Linha 26: `dark:placeholder-slate-500` → `dark:placeholder-text-muted`
- ❌ Linha 26: `focus:border-fuchsia-500` → `focus:border-primary`

### 6. **Form/Select.tsx**
- ❌ Linha 17: `dark:text-slate-300` → `dark:text-text-secondary`
- ❌ Linha 27: `dark:bg-slate-950/80` → `dark:bg-background/80`
- ❌ Linha 27: `dark:placeholder-slate-500` → `dark:placeholder-text-muted`
- ❌ Linha 27: `focus:border-fuchsia-500` → `focus:border-primary`

### 7. **Logo.tsx**
- ❌ Linha 9: `from-fuchsia-500 to-cyan-500` → `from-primary to-secondary`

### 8. **Footer.tsx**
- ❌ Linha 12: `from-fuchsia-500 to-cyan-500` → `from-primary to-secondary`

### 9. **Modal.tsx**
- ❌ Linha 16: `bg-slate-950/80` → `bg-background/80`
- ❌ Linha 19: `bg-slate-900` → `bg-surface`
- ❌ Linha 21: `text-slate-300` → `text-text-secondary`

### 10. **SeatMap.tsx**
- ❌ Linha 25: `bg-slate-950` → `bg-background`
- ❌ Linha 35: `bg-fuchsia-600` → `bg-primary`
- ❌ Linha 40: `text-slate-500` → `text-muted`

---

## Páginas Críticas (Prioridade Média)

### 1. **events/EventsList.tsx**
- ❌ Linha 59: `from-fuchsia-600 to-purple-600` → `from-primary to-accent`
- ❌ Linha 80: `bg-slate-500/20` → `bg-surface/20`
- ❌ Linhas 95, 99, 103: `text-slate-500` → `text-muted`

### 2. **marketplace/ProvidersList.tsx**
- ❌ Linha 145: `bg-fuchsia-600` → `bg-primary`
- ❌ Linha 173: `text-fuchsia-600 dark:text-fuchsia-400` → `text-primary dark:text-primary-light`
- ❌ Linha 180: `group-hover:text-fuchsia-600` → `group-hover:text-primary`
- ❌ Linha 197: `text-fuchsia-600` → `text-primary`

### 3. **marketplace/ProviderPage.tsx**
- ❌ Linha 106: `bg-cyan-500/20 text-cyan-300 border-cyan-500/30` → `bg-secondary/20 text-secondary-light border-secondary/30`
- ❌ Linha 154: `text-cyan-500` → `text-secondary`
- ❌ Linha 165: `bg-cyan-500` → `bg-secondary`
- ❌ Linha 237: `bg-black` → `bg-background`
- ❌ Linha 262: `bg-slate-900` → `bg-surface`

---

## Componentes de Baixa Prioridade

### Card.tsx
- ❌ Linha 9: `dark:bg-gray-800 text-black dark:text-white` → usar variáveis

### Badge.tsx
- ❌ Linha 16: `border-slate-200 text-slate-600` → usar variáveis

### ActivityFeed.tsx
- ❌ Linha 7: `dark:bg-gray-800` → `dark:bg-surface`

### PageTransition.tsx
- ❌ Linhas 15, 34: `bg-slate-950` → `bg-background`
- ❌ Linha 23: `bg-white` → `bg-text` (ou criar variável específica)

### MultiStateBadge.tsx
- ❌ Linha 19: `bg-slate-100 text-slate-600 border-slate-200` → usar variáveis

---

## Recomendações

1. **Prioridade Alta**: Corrigir componentes de formulário e navegação
2. **Prioridade Média**: Corrigir páginas principais (events, marketplace)
3. **Prioridade Baixa**: Corrigir componentes auxiliares

## Benefícios da Correção

✅ Suporte automático a temas (dark/light)
✅ Consistência visual em toda aplicação
✅ Facilidade de manutenção
✅ Mudanças de cor centralizadas
