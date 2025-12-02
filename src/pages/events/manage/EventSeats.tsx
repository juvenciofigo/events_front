import React, { useState } from "react";
import SeatMap from "../../../components/SeatMap";
import SeatForm from "../../seats/SeatForm";
import SeatList from "../../seats/SeatList";
import Modal from "../../../components/Modal";
import {
    PlusIcon,
    SquaresPlusIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ClockIcon,
    FunnelIcon,
    Squares2X2Icon
} from "@heroicons/react/24/outline";

type Seat = { id: string; name: string; x: number; y: number; sector?: string; status?: 'available' | 'sold' | 'reserved'; price?: number };
type Sector = { id: string; name: string; color: string; price: number; totalSeats: number };

export default function EventSeats() {
    const [seats, setSeats] = useState<Seat[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [sectorModalOpen, setSectorModalOpen] = useState(false);
    const [selectedSector, setSelectedSector] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('all');

    // Mock sectors data
    const [sectors, setSectors] = useState<Sector[]>([
        { id: '1', name: 'VIP', color: '#fbbf24', price: 250, totalSeats: 50 },
        { id: '2', name: 'Pista Premium', color: '#8b5cf6', price: 150, totalSeats: 200 },
        { id: '3', name: 'Pista', color: '#3b82f6', price: 80, totalSeats: 500 },
        { id: '4', name: 'Arquibancada', color: '#10b981', price: 50, totalSeats: 300 },
    ]);

    // Calculate statistics
    const totalSeats = sectors.reduce((sum, s) => sum + s.totalSeats, 0);
    const soldSeats = Math.floor(totalSeats * 0.45); // Mock: 45% sold
    const reservedSeats = Math.floor(totalSeats * 0.15); // Mock: 15% reserved
    const availableSeats = totalSeats - soldSeats - reservedSeats;

    return (
        <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-blue-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Total de Assentos</div>
                        <Squares2X2Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-3xl font-black text-text">{totalSeats}</div>
                    <div className="text-xs text-text-muted mt-1">Em {sectors.length} setores</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-green-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Disponíveis</div>
                        <CheckCircleIcon className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-3xl font-black text-text">{availableSeats}</div>
                    <div className="text-xs text-green-400 mt-1">{Math.round((availableSeats / totalSeats) * 100)}% disponível</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-purple-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Vendidos</div>
                        <ChartBarIcon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-3xl font-black text-text">{soldSeats}</div>
                    <div className="text-xs text-purple-400 mt-1">{Math.round((soldSeats / totalSeats) * 100)}% ocupação</div>
                </div>
                <div className="border border-borderColor rounded p-4 bg-gradient-to-br from-yellow-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-muted text-sm">Reservados</div>
                        <ClockIcon className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="text-3xl font-black text-text">{reservedSeats}</div>
                    <div className="text-xs text-yellow-400 mt-1">{Math.round((reservedSeats / totalSeats) * 100)}% reservado</div>
                </div>
            </div>

            {/* Sectors Management */}
            <div className="border border-borderColor rounded p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <SquaresPlusIcon className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-bold text-text">Setores do Evento</h3>
                    </div>
                    <button
                        onClick={() => setSectorModalOpen(true)}
                        className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded font-semibold transition-colors flex items-center gap-2">
                        <PlusIcon className="w-4 h-4" />
                        Novo Setor
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {sectors.map((sector) => {
                        const sectorSold = Math.floor(sector.totalSeats * 0.45);
                        const sectorAvailable = sector.totalSeats - sectorSold;
                        return (
                            <div
                                key={sector.id}
                                onClick={() => setSelectedSector(sector.id === selectedSector ? null : sector.id)}
                                className={`border-2 rounded p-4 cursor-pointer transition-all ${selectedSector === sector.id
                                    ? 'border-primary bg-primary/10'
                                    : 'border-borderColor hover:border-primary/50'
                                    }`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: sector.color }}
                                    ></div>
                                    <div className="font-bold text-text">{sector.name}</div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-text-muted">
                                        <span>Total:</span>
                                        <span className="font-semibold text-text">{sector.totalSeats}</span>
                                    </div>
                                    <div className="flex justify-between text-text-muted">
                                        <span>Disponíveis:</span>
                                        <span className="font-semibold text-green-400">{sectorAvailable}</span>
                                    </div>
                                    <div className="flex justify-between text-text-muted">
                                        <span>Preço:</span>
                                        <span className="font-semibold text-text">R$ {sector.price}</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-2">
                                        <div
                                            className="h-full bg-primary"
                                            style={{ width: `${(sectorSold / sector.totalSeats) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Seat Management */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Controls & Filters */}
                <div className="space-y-6">
                    <div className="border border-borderColor rounded p-6">
                        <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                            <FunnelIcon className="w-5 h-5 text-primary" />
                            Filtros
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm text-muted mb-2 block">Status</label>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="w-full bg-surface border border-borderColor rounded p-2 text-text">
                                    <option value="all">Todos</option>
                                    <option value="available">Disponíveis</option>
                                    <option value="sold">Vendidos</option>
                                    <option value="reserved">Reservados</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm text-muted mb-2 block">Setor</label>
                                <select
                                    value={selectedSector || ''}
                                    onChange={(e) => setSelectedSector(e.target.value || null)}
                                    className="w-full bg-surface border border-borderColor rounded p-2 text-text">
                                    <option value="">Todos os setores</option>
                                    {sectors.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="border border-borderColor rounded p-6">
                        <h3 className="text-lg font-bold text-text mb-4">Ações Rápidas</h3>
                        <div className="space-y-2">
                            <button
                                className="w-full px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded font-semibold transition-all flex items-center justify-center gap-2"
                                onClick={() => setModalOpen(true)}>
                                <PlusIcon className="w-5 h-5" />
                                Adicionar Assento
                            </button>
                            <button className="w-full px-4 py-3 border border-borderColor hover:bg-white/5 text-text rounded font-semibold transition-all">
                                Importar Layout
                            </button>
                            <button className="w-full px-4 py-3 border border-borderColor hover:bg-white/5 text-text rounded font-semibold transition-all">
                                Exportar Mapa
                            </button>
                        </div>
                    </div>

                    <div className="border border-borderColor rounded p-6">
                        <h3 className="text-lg font-bold text-text mb-4">Ações em Massa</h3>
                        <div className="space-y-2">
                            <button className="w-full px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500/10 rounded transition-all text-sm">
                                Liberar Selecionados
                            </button>
                            <button className="w-full px-4 py-2 border border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 rounded transition-all text-sm">
                                Reservar Selecionados
                            </button>
                            <button className="w-full px-4 py-2 border border-red-500 text-red-400 hover:bg-red-500/10 rounded transition-all text-sm">
                                Bloquear Selecionados
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Seat Map */}
                <div className="lg:col-span-2">
                    <div className="border border-borderColor rounded p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-text">Mapa de Assentos</h3>
                            <div className="flex gap-4 text-sm flex-wrap">
                                <div className="flex items-center text-text-muted">
                                    <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                                    Disponível
                                </div>
                                <div className="flex items-center text-text-muted">
                                    <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                                    Vendido
                                </div>
                                <div className="flex items-center text-text-muted">
                                    <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                                    Reservado
                                </div>
                                <div className="flex items-center text-text-muted">
                                    <span className="w-3 h-3 rounded-full bg-slate-700 mr-2"></span>
                                    Bloqueado
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 rounded-lg p-4 min-h-[400px] border border-borderColor">
                            <SeatMap
                                initial={seats}
                                onChange={(next: Seat[]) => setSeats(next)}
                            />
                            {seats.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                                    <Squares2X2Icon className="w-16 h-16 text-text-muted mb-4" />
                                    <h4 className="text-lg font-bold text-text mb-2">Nenhum assento configurado</h4>
                                    <p className="text-text-muted text-sm max-w-md">
                                        Comece adicionando assentos ao mapa ou importe um layout existente.
                                    </p>
                                    <button
                                        onClick={() => setModalOpen(true)}
                                        className="mt-4 px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded font-semibold transition-colors">
                                        Adicionar Primeiro Assento
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Seat Legend by Sector */}
                        {sectors.length > 0 && (
                            <div className="mt-4 p-4 bg-white/5 rounded border border-borderColor">
                                <div className="text-sm font-semibold text-text mb-3">Legenda de Setores:</div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {sectors.map(sector => (
                                        <div key={sector.id} className="flex items-center gap-2">
                                            <div
                                                className="w-4 h-4 rounded"
                                                style={{ backgroundColor: sector.color }}
                                            ></div>
                                            <span className="text-xs text-text-muted">{sector.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Criar Novo Assento">
                <SeatForm
                    onSave={(data) => {
                        const s = {
                            id: String(Date.now()),
                            name: data.name || `S${seats.length + 1}`,
                            x: data.posX || 50,
                            y: data.posY || 50,
                            sector: selectedSector || undefined,
                            status: 'available' as const,
                            price: sectors.find(sec => sec.id === selectedSector)?.price || 0
                        };
                        const next = [...seats, s];
                        setSeats(next);
                        setModalOpen(false);
                    }}
                />
            </Modal>

            <Modal
                open={sectorModalOpen}
                onClose={() => setSectorModalOpen(false)}
                title="Criar Novo Setor">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-muted mb-2 block">Nome do Setor</label>
                        <input
                            type="text"
                            placeholder="Ex: VIP, Pista, Camarote"
                            className="w-full bg-surface border border-borderColor rounded p-2 text-text"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-muted mb-2 block">Cor</label>
                        <input
                            type="color"
                            className="w-full h-10 bg-surface border border-borderColor rounded cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-muted mb-2 block">Preço (R$)</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            className="w-full bg-surface border border-borderColor rounded p-2 text-text"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-muted mb-2 block">Total de Assentos</label>
                        <input
                            type="number"
                            placeholder="0"
                            className="w-full bg-surface border border-borderColor rounded p-2 text-text"
                        />
                    </div>
                    <button className="w-full px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded font-semibold transition-colors">
                        Criar Setor
                    </button>
                </div>
            </Modal>
        </div>
    );
}
