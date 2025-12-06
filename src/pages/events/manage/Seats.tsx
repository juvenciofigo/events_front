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
import { StatisticsCards } from "@/components/StatisticsCards";
import Button from "@/components/Form/Button";
import { Seat } from "@/types/seat";
import { useFetchSeats } from "@/hooks/useSeats"
import { useParams } from "react-router-dom";

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

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [sort, setSorte] = useState("createdAt")

    const { eventId } = useParams()
    const { data: seatsData, isError, isLoading } = useFetchSeats(eventId!, {
        limit: limit,
        page: page,
        sort: sort,
        searchQuery: searchQuery
    })
    React.useEffect(() => {
        if (!isLoading && !isError) {
            setSeats(seatsData?.items || []);
        }
    }, [seatsData, isLoading, isError])

    const [selectedSector, setSelectedSector] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('all');

    // Mock sectors data
    const [sectors, setSectors] = useState<Sector[]>([
        { id: '1', name: 'VIP', color: '#fbbf24', price: 250, totalSeats: 50 },
        { id: '2', name: 'Pista Premium', color: '#8b5cf6', price: 150, totalSeats: 200 },
        { id: '3', name: 'Pista', color: '#3b82f6', price: 80, totalSeats: 500 },
        { id: '4', name: 'Arquibancada', color: '#10b981', price: 50, totalSeats: 300 },
        { id: '5', name: 'Arquibancada', color: '#10b981', price: 50, totalSeats: 300 },
        { id: '6', name: 'Arquibancada', color: '#10b981', price: 50, totalSeats: 300 },
        { id: '7', name: 'Arquibancada', color: '#10b981', price: 50, totalSeats: 300 },
        { id: '8', name: 'Arquibancada', color: '#10b981', price: 50, totalSeats: 300 },
    ]);
    const totalSeats = seats.reduce((sum, s) => sum + (s.totalSeats || 0), 0) || 0;
    const totalAvailableSeats = seats.reduce((sum, s) => sum + (s.availableSeats || 0), 0) || 0;
    const soldSeats = seats.reduce((sum, s) => sum + (s.totalSeats || 0) - (s.availableSeats || 0), 0) || 0;

    return (
        <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatisticsCards data={totalSeats} title="Total de Assentos" icon={<Squares2X2Icon className="w-4 h-4 ml-5 flex-1 text-blue-400" />} color="blue-500/5" description={`Em ${seatsData?.items.length} Assentos`} />
                <StatisticsCards data={totalAvailableSeats} title="Disponíveis" icon={<CheckCircleIcon className="w-4 h-4 ml-5 text-green-400" />} color="green-500/5" description={`${Math.round((totalAvailableSeats / totalSeats) * 100)}% disponível`} />
                <StatisticsCards data={soldSeats} title="Vendidos" icon={<ChartBarIcon className="w-4 h-4 ml-5 text-purple-400" />} color="purple-500/5" description={`${Math.round((soldSeats / totalSeats) * 100)}% vendidos`} />
                {/* <StatisticsCards data={reservedSeats} title="Reservados" icon={<ClockIcon className="w-4 h-4 ml-5 text-yellow-400" />} color="yellow-500/5" description={`${Math.round((reservedSeats / totalSeats) * 100)}% reservados`} /> */}
            </div>

            {/* Sectors Management */}
            <div className="border-t border-borderColor py-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <SquaresPlusIcon className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-bold text-text">Assentos do Evento</h3>
                    </div>
                    <Button
                        onClick={() => setModalOpen(true)}
                        label="Novo Assento">
                        <PlusIcon className="w-4 h-4" />
                    </Button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {seats.map((seat) => {
                        const seatsSold = (seat.totalSeats || 0) - (seat.availableSeats || 0);
                        const seatsAvailable = seat.availableSeats || 0;
                        return (
                            <div
                                key={seat.id}
                                onClick={() => setSelectedSector(seat.id === selectedSector ? null : seat.id)}
                                className={`border-2 rounded p-4 cursor-pointer transition-all min-w-[280px] flex-shrink-0 ${selectedSector === seat.id
                                    ? 'border-primary bg-primary/10'
                                    : 'border-borderColor hover:border-primary/50'
                                    }`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div
                                        className="w-4 h-4 rounded-full bg-primary"
                                    ></div>
                                    <div className="font-bold text-text">{seat.name}</div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-text-muted">
                                        <span>Total:</span>
                                        <span className="font-semibold text-text">{seat.totalSeats || 0}</span>
                                    </div>
                                    <div className="flex justify-between text-text-muted">
                                        <span>Disponíveis:</span>
                                        <span className="font-semibold text-green-400">{seatsAvailable}</span>
                                    </div>
                                    <div className="flex justify-between text-text-muted">
                                        <span>Preço:</span>
                                        <span className="font-semibold text-text">R$ {seat.price || 0}</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-2">
                                        <div
                                            className="h-full bg-primary"
                                            style={{ width: `${seat.totalSeats ? (seatsSold / seat.totalSeats) * 100 : 0}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Seat Management */}
            <div className="flex flex-col lg:flex-row 2 gap-6">
                {/* Left Column: Controls & Filters */}
                <div className="space-y-6 flex-1">
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
                                    {/* <option value="available">Disponíveis</option> */}
                                    {/* <option value="sold">Vendidos</option> */}
                                    {/* <option value="reserved">Reservados</option> */}
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

                    <div className="border-b border-borderColor pb-4 ">
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
                <div className="">
                    <div className="lg:border-t border-borderColor">
                        <h3 className="text-xl font-bold text-text mb-6">Mapa de Assentos</h3>

                        <div className="rounded min-h-[400px]">
                            <SeatMap
                                initial={seats}
                                onChange={(next: Seat[]) => setSeats(next)}
                                eventId={eventId}
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
                        const next = [...seats, data];
                        setSeats(next);
                        setModalOpen(false);
                    }}
                />
            </Modal>
        </div>
    );
}
