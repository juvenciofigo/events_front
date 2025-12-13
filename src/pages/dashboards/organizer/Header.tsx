import Button from '@/components/Form/Button'
import { PlusIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useNavigate } from 'react-router-dom'


interface Props {
    name: string | null;
    title: string | null;
    description: React.ReactNode | null;
    buttonLabel?: string | null;
    buttonLink?: string | null;
    children?: React.ReactNode;
    className?: string;
}

export default function Header({ name, title, description, buttonLabel, buttonLink, children, className }: Props) {
    const navigate = useNavigate()
    return (
        <div className={`${className} flex flex-row justify-between items-start md:items-center mb-2 gap-4}`}>
            <div className='flex md:flex-row flex-col gap-4'>
                {children}
                <div>
                    <h1 className="text-base md:text-xl lg:text-2xl font-black tracking-tight text-text mb-2">
                        {title || 'Dashboard'}
                    </h1>
                    <p className="text-muted">
                        {name
                            ? `Bem-vindo, ${name}!`
                            : description}
                    </p>
                </div>
            </div>
            {buttonLabel && buttonLink &&
                <Button
                    size='sm'
                    onClick={() => navigate(buttonLink)}>
                    <div className="flex flex-row items-center gap-1">
                        <PlusIcon className="w-3 h-3" />
                        {buttonLabel}
                    </div>
                </Button>}
        </div>
    )
}
