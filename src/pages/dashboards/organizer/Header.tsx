import Button from '@/components/Form/Button'
import { PlusIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useNavigate } from 'react-router-dom'


interface Props {
    name: string | null;
    title: string | null;
    description: string | null;
    buttonLabel: string | null;
    buttonLink: string | null;
}

export default function Header({ name, title, description, buttonLabel, buttonLink }: Props) {
    const navigate = useNavigate()
    return (
        <div className="flex flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-lg md:text-xl lg:text-3xl font-black tracking-tight text-text mb-2">
                    {title || 'Dashboard'}
                </h1>
                <p className="text-muted">
                    {name
                        ? `Bem-vindo, ${name}!`
                        : description}
                </p>
            </div>
            <Button
                onClick={() => navigate(buttonLink || '')}>
                <div className="flex flex-row items-center gap-1">
                    <PlusIcon className="md:w-5 md:h-5 w-4 h-4" />
                    <span className="text-sm font-semibold text-nowrap">{buttonLabel}</span>
                </div>
            </Button>
        </div>
    )
}
