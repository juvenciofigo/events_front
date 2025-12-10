import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useState, useEffect } from 'react';
import {
    QrCodeIcon,
    MagnifyingGlassIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    UserIcon,
    TicketIcon,
    MapPinIcon,
    CurrencyDollarIcon
} from "@heroicons/react/24/outline";
import { useValidateTicket } from "@/hooks/useTickets";
import { useToast } from "@/contexts/ToastContext";
import Loading from "@/components/Loading";
import { formatCurrency } from "@/utils";

type ValidationMode = 'qr' | 'manual';

export default function TicketValidation() {
    const [mode, setMode] = useState<ValidationMode>('manual');
    const [ticketCode, setTicketCode] = useState('');
    const [validatedTicket, setValidatedTicket] = useState<any>(null);
    const [validationHistory, setValidationHistory] = useState<any[]>([]);

    const validateTicket = useValidateTicket();
    const toast = useToast();

    useEffect(() => {
        let scanner: Html5QrcodeScanner | null = null;

        if (mode === 'qr') {
            // Small delay to ensure DOM element exists
            const timer = setTimeout(() => {
                scanner = new Html5QrcodeScanner(
                    "reader",
                    { fps: 10, qrbox: { width: 250, height: 250 } },
                    /* verbose= */ false
                );

                scanner.render(onScanSuccess, onScanFailure);
            }, 100);

            return () => {
                clearTimeout(timer);
                if (scanner) {
                    scanner.clear().catch(error => {
                        console.error("Failed to clear html5-qrcode scanner. ", error);
                    });
                }
            };
        }
    }, [mode]);

    const onScanSuccess = (decodedText: string, decodedResult: any) => {
        // Handle the scanned code as you like, for example:
        console.log(`Code matched = ${decodedText}`, decodedResult);
        setTicketCode(decodedText);
        handleValidate(decodedText);
    };

    const onScanFailure = (error: any) => {
        // handle scan failure, usually better to ignore and keep scanning.
        // for example:
        // console.warn(`Code scan error = ${error}`);
    };

    const handleValidate = async (codeToValidate?: string) => {
        const code = codeToValidate || ticketCode;

        if (!code.trim()) {
            toast.error("Por favor, insira um código de ticket");
            return;
        }

        try {
            const result = await validateTicket.mutateAsync(code);
            setValidatedTicket(result);
            setValidationHistory(prev => [
                {
                    ...result,
                    validatedAt: new Date().toISOString()
                },
                ...prev.slice(0, 9) // Keep last 10
            ]);
            toast.success("Ticket validado com sucesso!");
            if (!codeToValidate) setTicketCode(''); // Clear input only if manual
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Erro ao validar ticket");
            setValidatedTicket(null);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'VALIDATED': return 'text-green-400 bg-green-500/20';
            case 'CONFIRMED': return 'text-blue-400 bg-blue-500/20';
            case 'PENDING': return 'text-yellow-400 bg-yellow-500/20';
            case 'DECLINED': return 'text-red-400 bg-red-500/20';
            default: return 'text-gray-400 bg-gray-500/20';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'VALIDATED': return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
            case 'CONFIRMED': return <CheckCircleIcon className="w-5 h-5 text-blue-400" />;
            case 'PENDING': return <ClockIcon className="w-5 h-5 text-yellow-400" />;
            case 'DECLINED': return <XCircleIcon className="w-5 h-5 text-red-400" />;
            default: return <TicketIcon className="w-5 h-5 text-gray-400" />;
        }
    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-black text-text mb-2">Validação de Tickets</h1>
                    <p className="text-text-muted">Valide tickets usando QR code ou código manual</p>
                </div>

                {/* Mode Selection */}
                <div className="flex gap-4 justify-center mb-6">
                    <button
                        onClick={() => setMode('manual')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${mode === 'manual'
                                ? 'bg-primary text-white'
                                : 'bg-surface border border-borderColor text-text-muted hover:bg-white/5'
                            }`}
                    >
                        <MagnifyingGlassIcon className="w-5 h-5" />
                        Código Manual
                    </button>
                    <button
                        onClick={() => setMode('qr')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${mode === 'qr'
                                ? 'bg-primary text-white'
                                : 'bg-surface border border-borderColor text-text-muted hover:bg-white/5'
                            }`}
                    >
                        <QrCodeIcon className="w-5 h-5" />
                        Scanner QR
                    </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left Column - Validation Input */}
                    <div className="space-y-6">
                        {/* Input Section */}
                        <div className="border border-borderColor rounded-lg p-6 bg-surface">
                            <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                                {mode === 'qr' ? <QrCodeIcon className="w-6 h-6 text-primary" /> : <MagnifyingGlassIcon className="w-6 h-6 text-primary" />}
                                {mode === 'qr' ? 'Scanner QR Code' : 'Código do Ticket'}
                            </h3>

                            {mode === 'qr' ? (
                                <div className="bg-slate-900/50 rounded-lg border-2 border-dashed border-borderColor overflow-hidden">
                                    <div id="reader" className="w-full"></div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value={ticketCode}
                                        onChange={(e) => setTicketCode(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleValidate()}
                                        placeholder="Digite o código do ticket"
                                        className="w-full bg-background border border-borderColor rounded-lg px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
                                    />
                                    <button
                                        onClick={() => handleValidate()}
                                        disabled={validateTicket.isPending || !ticketCode.trim()}
                                        className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        {validateTicket.isPending ? (
                                            <>
                                                <Loading />
                                                Validando...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircleIcon className="w-5 h-5" />
                                                Validar Ticket
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Validated Ticket Details */}
                        {validatedTicket && (
                            <div className="border border-borderColor rounded-lg p-6 bg-surface animate-fadeIn">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-text">Detalhes do Ticket</h3>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(validatedTicket.ticketStatus)}`}>
                                        {validatedTicket.ticketStatus}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <TicketIcon className="w-5 h-5 text-primary mt-0.5" />
                                        <div>
                                            <div className="text-xs text-text-muted">Código</div>
                                            <div className="text-text font-mono font-bold">{validatedTicket.ticketCode}</div>
                                        </div>
                                    </div>

                                    {validatedTicket.seat && (
                                        <>
                                            <div className="flex items-start gap-3">
                                                <MapPinIcon className="w-5 h-5 text-primary mt-0.5" />
                                                <div>
                                                    <div className="text-xs text-text-muted">Assento</div>
                                                    <div className="text-text font-semibold">{validatedTicket.seat.name}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <CurrencyDollarIcon className="w-5 h-5 text-primary mt-0.5" />
                                                <div>
                                                    <div className="text-xs text-text-muted">Preço</div>
                                                    <div className="text-text font-semibold">
                                                        {formatCurrency(validatedTicket.seat.price)}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div className="flex items-start gap-3">
                                        <UserIcon className="w-5 h-5 text-primary mt-0.5" />
                                        <div>
                                            <div className="text-xs text-text-muted">Total de Pessoas</div>
                                            <div className="text-text font-semibold">{validatedTicket.totalPeople}</div>
                                        </div>
                                    </div>

                                    {validatedTicket.notes && (
                                        <div className="mt-4 p-3 bg-background rounded border border-borderColor">
                                            <div className="text-xs text-text-muted mb-1">Observações</div>
                                            <div className="text-sm text-text">{validatedTicket.notes}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Validation History */}
                    <div className="border border-borderColor rounded-lg p-6 bg-surface">
                        <h3 className="text-xl font-bold text-text mb-4">Histórico de Validações</h3>

                        {validationHistory.length === 0 ? (
                            <div className="text-center py-12">
                                <ClockIcon className="w-16 h-16 text-text-muted mx-auto mb-4 opacity-50" />
                                <p className="text-text-muted">Nenhuma validação ainda</p>
                                <p className="text-xs text-text-muted mt-2">Os tickets validados aparecerão aqui</p>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-[600px] overflow-y-auto">
                                {validationHistory.map((ticket, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-background rounded-lg border border-borderColor hover:border-primary/50 transition-colors"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(ticket.ticketStatus)}
                                                <span className="font-mono font-semibold text-text">{ticket.ticketCode}</span>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(ticket.ticketStatus)}`}>
                                                {ticket.ticketStatus}
                                            </span>
                                        </div>
                                        {ticket.seat && (
                                            <div className="text-sm text-text-muted">
                                                Assento: <span className="text-text font-medium">{ticket.seat.name}</span>
                                            </div>
                                        )}
                                        <div className="text-xs text-text-muted mt-2">
                                            {new Date(ticket.validatedAt).toLocaleString('pt-BR')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="border border-borderColor rounded-lg p-4 bg-surface text-center">
                        <div className="text-2xl font-black text-text">{validationHistory.length}</div>
                        <div className="text-xs text-text-muted mt-1">Total Validados</div>
                    </div>
                    <div className="border border-borderColor rounded-lg p-4 bg-surface text-center">
                        <div className="text-2xl font-black text-green-400">
                            {validationHistory.filter(t => t.ticketStatus === 'VALIDATED').length}
                        </div>
                        <div className="text-xs text-text-muted mt-1">Válidos</div>
                    </div>
                    <div className="border border-borderColor rounded-lg p-4 bg-surface text-center">
                        <div className="text-2xl font-black text-yellow-400">
                            {validationHistory.filter(t => t.ticketStatus === 'PENDING').length}
                        </div>
                        <div className="text-xs text-text-muted mt-1">Pendentes</div>
                    </div>
                    <div className="border border-borderColor rounded-lg p-4 bg-surface text-center">
                        <div className="text-2xl font-black text-red-400">
                            {validationHistory.filter(t => t.ticketStatus === 'DECLINED').length}
                        </div>
                        <div className="text-xs text-text-muted mt-1">Recusados</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
