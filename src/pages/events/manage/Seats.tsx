import React, { useState } from "react";
import SeatMap from "@/components/SeatMap";
import SeatForm from "../../seats/SeatForm";
import SeatList from "../../seats/SeatList";
import Modal from "@/components/Modal";
import {
    PlusIcon,
    SquaresPlusIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ClockIcon,
    FunnelIcon,
    Squares2X2Icon
} from "@heroicons/react/24/outline";
import { StatisticsCards } from "./Overview";
import Button from "@/components/Form/Button";
import SeatGridGenerator from "./SeatGridGenerator";
import { Seat } from "@/types/seat";

type Sector = {
    id: string;
    name: string;
    color: string;
    price: number;
    totalSeats: number;
};

export default function Seats() {
    const [seats, setSeats] = useState<Seat[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [gridModalOpen, setGridModalOpen] = useState(false);
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
                <StatisticsCards data={totalSeats} title="Total de Assentos" icon={<Squares2X2Icon className="w-4 h-4 ml-5 flex-1 text-blue-400" />} color="blue-500/5" description={`Em ${sectors.length} setores`} />
                <StatisticsCards data={availableSeats} title="Disponíveis" icon={<CheckCircleIcon className="w-4 h-4 ml-5 text-green-400" />} color="green-500/5" description={`${Math.round((availableSeats / totalSeats) * 100)}% disponível`} />
                <StatisticsCards data={soldSeats} title="Vendidos" icon={<ChartBarIcon className="w-4 h-4 ml-5 text-purple-400" />} color="purple-500/5" description={`${Math.round((soldSeats / totalSeats) * 100)}% vendidos`} />
                <StatisticsCards data={reservedSeats} title="Reservados" icon={<ClockIcon className="w-4 h-4 ml-5 text-yellow-400" />} color="yellow-500/5" description={`${Math.round((reservedSeats / totalSeats) * 100)}% reservados`} />
            </div>

            {/* Sectors Management */}
            <div className="border-t border-borderColor py-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <SquaresPlusIcon className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-bold text-text">Setores do Evento</h3>
                    </div>
                    <Button
                        onClick={() => setSectorModalOpen(true)}
                        label="Novo Setor">
                        <PlusIcon className="w-4 h-4" />
                    </Button>
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
                    <div className="border-y py-4 border-borderColor rounded">
                        <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                            <FunnelIcon className="w-4 h-4 text-primary" />
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

                    <div className="border-b border-borderColor pb-4">
                        <h3 className="text-lg font-bold text-text mb-4">Ações Rápidas</h3>
                        <div className="space-y-2">
                            <Button
                                variant="primary"
                                fullWidth
                                onClick={() => setModalOpen(true)}>
                                <PlusIcon className="w-4 h-4" />
                                Adicionar Assento
                            </Button>
                            <Button
                                variant="secondary"
                                fullWidth
                                onClick={() => setGridModalOpen(true)}>
                                <Squares2X2Icon className="w-4 h-4" />
                                Gerar Grade
                            </Button>
                            <Button
                                variant="secondary"
                                fullWidth
                                onClick={() => setModalOpen(true)}>
                                Importar Layout
                            </Button>
                            <Button
                                variant="secondary"
                                fullWidth>
                                Exportar Mapa
                            </Button>
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

                        <div className="rounded min-h-[400px]">
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
                                    <Button
                                        size="lg"
                                        onClick={() => setModalOpen(true)}>
                                        <PlusIcon className="w-4 h-4" />
                                        Adicionar Primeiro Assento
                                    </Button>
                                </div>
                            )}
                        </div>

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
                        console.log(data);

                        // Converter do formato backend (layoutPositionX/Y) para formato local (x/y)
                        // const seatForMap: Seat = {
                        //     id: data.id,
                        //     name: data.name,
                        //     x: data.layoutPositionX || 50,
                        //     y: data.layoutPositionY || 50,
                        //     sector: selectedSector || undefined,
                        //     status: 'available' as const,
                        //     price: data.price || 0
                        // };

                        const next = [...seats, data];
                        setSeats(next);
                        setModalOpen(false);
                    }}
                />
            </Modal>

            {/* <Modal
                open={gridModalOpen}
                onClose={() => setGridModalOpen(false)}
                title="Gerar Grade de Assentos">
                <SeatGridGenerator
                    sectors={sectors}
                    onClose={() => setGridModalOpen(false)}
                    onGenerate={(newSeats) => {
                        const seatsWithIds = newSeats.map((s, i) => ({
                            ...s,
                            id: `gen-${Date.now()}-${i}`
                        }));
                        setSeats([...seats, ...seatsWithIds]);
                        setGridModalOpen(false);
                    }}
                />
            </Modal> */}

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
