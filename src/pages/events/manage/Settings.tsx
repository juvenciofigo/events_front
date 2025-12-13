import React from 'react'
import {
    BellIcon,
    EyeIcon,
    TrashIcon,
    LockClosedIcon,
    GlobeAltIcon,
    ClockIcon,
    TagIcon,
    PhotoIcon,
    DocumentTextIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Button from '@/components/Form/Button';
import { Event } from '@/types/events';
import { useUpdateEvent } from '@/hooks/useEvents';
import { useToast } from '@/contexts/ToastContext';
import { transformDate } from '@/utils';
import Select from '@/components/Form/Select';
import Input from '@/components/Form/Input';

type StatusType = 'active' | 'paused' | 'canceled';

interface StatusOptionProps {
    type: StatusType;
    label: string;
    description: string;
    isSelected: boolean;
    onClick: () => void;
}



export default function Settings({ event }: { event: Event }) {
    const [eventStatus, setEventStatus] = React.useState<StatusType>((event.status as StatusType) || 'active');
    const [isPublic, setIsPublic] = React.useState(event.isPublic);
    const [category, setCategory] = React.useState(event.category);

    const updateEventMutation = useUpdateEvent(event.id);
    const { success, error: showError } = useToast();


    const handleSaveEvent = () => {
        const dateStart = transformDate(event.dateStart)
        const dateEnd = transformDate(event.dateEnd || dateStart)

        const updatedEvent = {
            ...event,
            dateStart,
            dateEnd,
            isPublic,
            category,
            status: eventStatus,
        };

        updateEventMutation.mutate(updatedEvent, {
            onSuccess: () => {
                success("Evento atualizado com sucesso");
            },
            onError: (error: any) => {
                showError(error?.response?.data?.message || "Erro ao atualizar o evento");
            },
        });

    }

    return (
        <div className="space-y-6 text-sm">
            {/* Event Visibility */}
            <div className="">
                <div className="flex items-center gap-2 mb-3">
                    <GlobeAltIcon className="w-4 h-4 text-primary" />
                    <h3 className="font-bold text-text">Visibilidade do Evento</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
                    <div className="flex items-center justify-between p-2 bg-surface-hover rounded border border-borderColor">
                        <div className="flex items-center gap-3">
                            <EyeIcon className="w-4 h-4 text-blue-400" />
                            <div>
                                <div className="font-semibold text-text">Evento Público</div>
                                <div className=" text-text-muted">Visível para todos os usuários</div>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isPublic}
                                onChange={(e) => setIsPublic(e.target.checked)}
                            />
                            <div className="w-7 h-3 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute  after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded border border-borderColor">
                        <div className="flex items-center gap-3">
                            <LockClosedIcon className="w-4 h-4 text-purple-400" />
                            <div>
                                <div className="font-semibold text-text">Evento Privado</div>
                                <div className="text-text-muted">Apenas com convite ou link</div>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={!isPublic}
                                onChange={(e) => setIsPublic(!e.target.checked)}
                            />
                            <div className="w-7 h-3 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute  after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                    {/* <div className="flex items-center justify-between p-4 bg-white/5 rounded border border-borderColor">
                        <div className="flex items-center gap-3">
                            <BellIcon className="w-5 h-5 text-green-400" />
                            <div>
                                <div className="font-semibold text-text">Notificações Automáticas</div>
                                <div className="text-xs text-text-muted">Enviar atualizações aos participantes</div>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-7 h-3 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute  after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div> */}
                </div>
            </div>

            {/* Event Status */}
            <div className="border-t border-borderColor pt-3">
                <div className="flex items-center gap-2 mb-2">
                    <ClockIcon className="w-4 h-4 text-primary" />
                    <h3 className="font-bold text-text">Status do Evento</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatusOption
                        type="active"
                        label="Ativo"
                        description="Vendas abertas e visível"
                        isSelected={eventStatus === 'active'}
                        onClick={() => setEventStatus('active')}
                    />
                    <StatusOption
                        type="paused"
                        label="Pausado"
                        description="Vendas pausadas temporariamente"
                        isSelected={eventStatus === 'paused'}
                        onClick={() => setEventStatus('paused')}
                    />
                    <StatusOption
                        type="canceled"
                        label="Cancelado"
                        description="Evento cancelado"
                        isSelected={eventStatus === 'canceled'}
                        onClick={() => setEventStatus('canceled')}
                    />
                </div>
            </div>

            {/* Additional Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category & Tags */}
                <div className="border-t border-borderColor pt-2">
                    <div className="flex items-center gap-2 mb-4">
                        <TagIcon className="w-4 h-4 text-primary" />
                        <h4 className="font-bold text-text">Categoria & Tags</h4>
                    </div>
                    <div className="space-y-4">
                        <Select
                            selectClassName="md:py-1"
                            label="Categoria Principal"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)} options={[
                                { value: "música", label: "Música" },
                                { value: "desporto", label: "Desporto" },
                                { value: "tecnologia", label: "Tecnologia" },
                                { value: "arte & cultura", label: "Arte & Cultura" },
                                { value: "gastronomia", label: "Gastronomia" },
                                { value: "educação", label: "Educação" },
                                { value: "negócios", label: "Negócios" },
                                { value: "corporativo", label: "Corporativo" }
                            ]} />

                        <Input
                            InputClassName="pl-2"
                            label="Tags"
                            placeholder="festival, verão, música ao vivo"
                        />
                    </div>
                </div>

                {/* Media Settings */}
                <div className="border-t border-borderColor pt-4">
                    <div className="flex items-center gap-2 mb-4">
                        <PhotoIcon className="w-4 h-4 text-primary" />
                        <h4 className="font-bold text-text">Mídia</h4>
                    </div>
                    <div className="space-y-3">
                        <button className="w-full text-xs p-2 border border-borderColor rounded hover:bg-white/5 transition-colors text-left">
                            <div className="flex items-center gap-2">
                                <PhotoIcon className="w-4 h-4 text-blue-400" />
                                <div>
                                    <div className="font-semibold text-text">Alterar Capa</div>
                                    <div className=" text-text-muted">Imagem principal do evento</div>
                                </div>
                            </div>
                        </button>
                        <button className="w-full text-xs p-2 border border-borderColor rounded hover:bg-white/5 transition-colors text-left">
                            <div className="flex items-center gap-2">
                                <DocumentTextIcon className="w-4 h-4 text-green-400" />
                                <div>
                                    <div className="font-semibold text-text">Galeria de Fotos</div>
                                    <div className="text-text-muted">Adicionar mais imagens</div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Advanced Settings */}
            <div className="border-y py-2 border-borderColor">
                <h3 className="font-bold text-text mb-2">Configurações Avançadas</h3>
                <div className="space-y-4 text-xs">
                    <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-borderColor">
                        <div>
                            <div className="font-semibold text-text">Permitir Lista de Espera</div>
                            <div className="text-text-muted">Quando ingressos esgotarem</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-7 h-3 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute  after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-borderColor">
                        <div>
                            <div className="font-semibold text-text">Transferência de Ingressos</div>
                            <div className="text-text-muted">Permitir que participantes transfiram</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-7 h-3 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute  after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between p-1 bg-white/5 rounded border border-borderColor">
                        <div>
                            <div className="font-semibold text-text">Check-in QR Code</div>
                            <div className="text-text-muted">Validação por código QR</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-7 h-3 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute  after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="border border-red-500/50 rounded p-2 bg-red-500/5">
                <div className="flex items-center gap-3 mb-2">
                    <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
                    <h3 className="text-lg font-bold text-red-500">Zona de Perigo</h3>
                </div>
                <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-2 bg-background rounded border border-red-500/30">
                        <div>
                            <div className="font-semibold text-text">Cancelar Evento</div>
                            <div className="text-text-muted">Cancelar e reembolsar todos os participantes</div>
                        </div>
                        <Button
                            size='sm'
                            variant="secondary">
                            Cancelar
                        </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background rounded border border-red-500/30">
                        <div>
                            <div className="font-semibold text-text">Excluir Evento</div>
                            <div className="text-text-muted">Ação permanente e irreversível</div>
                        </div>

                        <Button
                            size='sm'
                            variant="danger">
                            <TrashIcon className="w-3 h-3" />
                            Excluir
                        </Button>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
                <Button
                    size='sm'
                    variant="secondary">Cancelar Alterações</Button>
                <Button
                    size='sm'
                    onClick={() => handleSaveEvent()}
                    variant="primary">
                    Salvar Configurações
                </Button>
            </div>
        </div>
    )
}


function StatusOption({ type, label, description, isSelected, onClick }: StatusOptionProps) {
    const styles = {
        active: {
            dot: "bg-green-500",
            selected: "border-green-500 bg-green-500/10",
            hover: "hover:border-green-500 hover:bg-green-500/5",
        },
        paused: {
            dot: "bg-yellow-500",
            selected: "border-yellow-500 bg-yellow-500/10",
            hover: "hover:border-yellow-500 hover:bg-yellow-500/5",
        },
        canceled: {
            dot: "bg-red-500",
            selected: "border-red-500 bg-red-500/10",
            hover: "hover:border-red-500 hover:bg-red-500/5",
        }
    };

    const style = styles[type];
    const baseClass = "p-1 text-xs rounded text-left transition-all w-full";
    const borderClass = isSelected
        ? `border-2 ${style.selected}`
        : `border border-borderColor ${style.hover}`;

    return (
        <button
            onClick={onClick}
            className={`${baseClass} ${borderClass}`}
        >
            <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${style.dot}`}></div>
                <div className="font-bold text-text">{label}</div>
            </div>
            <div className=" text-text-muted">{description}</div>
        </button>
    );
};