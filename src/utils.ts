export const formatCurrency = (value: number) => new Intl.NumberFormat('pt-MZ', { minimumFractionDigits: 2, maximumFractionDigits: 2, currency: 'MZN', currencyDisplay: 'narrowSymbol', style: 'currency' }).format(value);

export const formatDate = (date: string) => new Intl.DateTimeFormat('pt-MZ', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(date));
export const dateToTime = (date: string) => new Intl.DateTimeFormat('pt-MZ', { hour: '2-digit', minute: '2-digit' }).format(new Date(date));
export const dateToDateTime = (date: string) => new Intl.DateTimeFormat('pt-MZ', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(date));

export const transformDate = (value: string) => {
    const dateValue = new Date(value);
    const year = dateValue.getFullYear();
    const month = String(dateValue.getMonth() + 1).padStart(2, '0');
    const day = String(dateValue.getDate()).padStart(2, '0');
    const hours = String(dateValue.getHours()).padStart(2, '0');
    const minutes = String(dateValue.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
} 