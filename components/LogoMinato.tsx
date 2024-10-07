'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function LogoMinato() {
    const [gradient, setGradient] = useState('from-blue-500 to-purple-500')

    useEffect(() => {
        const gradients = [
            'from-blue-500 to-purple-500',
            'from-green-400 to-blue-500',
            'from-pink-500 to-yellow-500'
        ]
        let index = 0
        const intervalId = setInterval(() => {
            index = (index + 1) % gradients.length
            setGradient(gradients[index])
        }, 5000)
        return () => clearInterval(intervalId)
    }, [])

    return (
        <div className="flex flex-row items-center justify-center">
            <Link href="/"
                  target='_blank'
                  className='flex flex-row items-center justify-center'
            >
                <IconMin />
            <div className="w-full items-center justify-start">
                <h1 className={`text-xl md:text-xl font-bold text-center bg-gradient-to-r ${gradient} text-transparent bg-clip-text transition-colors duration-1000`}>
                    飛雷の神
                </h1>
            </div>
            </Link>
            </div>

    )
}

export  function IconMin() {

    return (
        <div className="">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white">
                    <path d="M12 3L8 9l4 2-2 10 6-8-4-2z" />
                </svg>
            </div>
        </div>
    )
}