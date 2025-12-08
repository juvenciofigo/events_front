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

type StatusType = 'active' | 'paused' | 'canceled';

interface StatusOptionProps {
    type: StatusType;
    label: string;
    description: string;
    isSelected: boolean;
    onClick: () => void;
}



export default function Settings({ eventId }: { eventId: string }) {
    const [eventStatus, setEventStatus] = React.useState<StatusType>('active');

    return (
        <div className="space-y-3">
            {/* Event Visibility */}
            <div className="">
                <div className="flex items-center gap-3 mb-3">
                    <GlobeAltIcon className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold text-text">Visibilidade do Evento</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-2 bg-surface-hover rounded border border-borderColor">
                        <div className="flex items-center gap-3">
                            <EyeIcon className="w-4 h-4 text-blue-400" />
                            <div>
                                <div className="font-semibold text-text text-sm">Evento Público</div>
                                <div className="text-xs text-text-muted">Visível para todos os usuários</div>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-7 h-3 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute  after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded border border-borderColor">
                        <div className="flex items-center gap-3">
                            <LockClosedIcon className="w-5 h-5 text-purple-400" />
                            <div>
                                <div className="font-semibold text-text">Evento Privado</div>
                                <div className="text-xs text-text-muted">Apenas com convite ou link</div>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded border border-borderColor">
                        <div className="flex items-center gap-3">
                            <BellIcon className="w-5 h-5 text-green-400" />
                            <div>
                                <div className="font-semibold text-text">Notificações Automáticas</div>
                                <div className="text-xs text-text-muted">Enviar atualizações aos participantes</div>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Event Status */}
            <div className="border-t border-borderColor pt-3">
                <div className="flex items-center gap-3 mb-6">
                    <ClockIcon className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold text-text">Status do Evento</h3>
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
                <div className="border border-borderColor rounded p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <TagIcon className="w-5 h-5 text-primary" />
                        <h4 className="text-lg font-bold text-text">Categoria & Tags</h4>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-muted mb-2 block">Categoria Principal</label>
                            <select className="w-full bg-surface border border-borderColor rounded p-2 text-text">
                                <option>Música</option>
                                <option>Esportes</option>
                                <option>Tecnologia</option>
                                <option>Arte & Cultura</option>
                                <option>Gastronomia</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-muted mb-2 block">Tags (separadas por vírgula)</label>
                            <input
                                type="text"
                                placeholder="festival, verão, música ao vivo"
                                className="w-full bg-surface border border-borderColor rounded p-2 text-text placeholder:text-text-muted"
                            />
                        </div>
                    </div>
                </div>

                {/* Media Settings */}
                <div className="border border-borderColor rounded p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <PhotoIcon className="w-5 h-5 text-primary" />
                        <h4 className="text-lg font-bold text-text">Mídia</h4>
                    </div>
                    <div className="space-y-3">
                        <button className="w-full p-3 border border-borderColor rounded hover:bg-white/5 transition-colors text-left">
                            <div className="flex items-center gap-3">
                                <PhotoIcon className="w-5 h-5 text-blue-400" />
                                <div>
                                    <div className="font-semibold text-text text-sm">Alterar Capa</div>
                                    <div className="text-xs text-text-muted">Imagem principal do evento</div>
                                </div>
                            </div>
                        </button>
                        <button className="w-full p-3 border border-borderColor rounded hover:bg-white/5 transition-colors text-left">
                            <div className="flex items-center gap-3">
                                <DocumentTextIcon className="w-5 h-5 text-green-400" />
                                <div>
                                    <div className="font-semibold text-text text-sm">Galeria de Fotos</div>
                                    <div className="text-xs text-text-muted">Adicionar mais imagens</div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Advanced Settings */}
            <div className="border border-borderColor rounded p-6">
                <h3 className="text-xl font-bold text-text mb-4">Configurações Avançadas</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded border border-borderColor">
                        <div>
                            <div className="font-semibold text-text">Permitir Lista de Espera</div>
                            <div className="text-xs text-text-muted">Quando ingressos esgotarem</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded border border-borderColor">
                        <div>
                            <div className="font-semibold text-text">Transferência de Ingressos</div>
                            <div className="text-xs text-text-muted">Permitir que participantes transfiram</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded border border-borderColor">
                        <div>
                            <div className="font-semibold text-text">Check-in QR Code</div>
                            <div className="text-xs text-text-muted">Validação por código QR</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="border-2 border-red-500/50 rounded p-6 bg-red-500/5">
                <div className="flex items-center gap-3 mb-4">
                    <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
                    <h3 className="text-xl font-bold text-red-500">Zona de Perigo</h3>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-background rounded border border-red-500/30">
                        <div>
                            <div className="font-semibold text-text">Cancelar Evento</div>
                            <div className="text-xs text-text-muted">Cancelar e reembolsar todos os participantes</div>
                        </div>
                        <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded font-semibold transition-colors">
                            Cancelar
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-background rounded border border-red-500/30">
                        <div>
                            <div className="font-semibold text-text">Excluir Evento</div>
                            <div className="text-xs text-text-muted">Ação permanente e irreversível</div>
                        </div>
                        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition-colors flex items-center gap-2">
                            <TrashIcon className="w-4 h-4" />
                            Excluir
                        </button>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
                <button className="px-6 py-3 border border-borderColor rounded hover:bg-white/5 transition-colors text-text font-semibold">
                    Cancelar Alterações
                </button>
                <button className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded font-semibold transition-colors">
                    Salvar Configurações
                </button>
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
    const baseClass = "p-4 rounded text-left transition-all w-full";
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
            <div className="text-xs text-text-muted">{description}</div>
        </button>
    );
};