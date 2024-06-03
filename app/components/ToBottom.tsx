"use client"

import React, { useState, useEffect } from 'react'
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';

type Props = {
    scrollFn: () => void,
    bottomRef: React.RefObject<HTMLDivElement>
}

const ToBottom = ({ scrollFn, bottomRef }: Props) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            setIsVisible(scrollTop > 200);
        };

        window.addEventListener('scroll', handleScroll);
    }, [])

    return (
        <button onClick={scrollFn} className='z-[99] fixed right-6 bottom-16 bg-white text-darkBg rounded-lg w-fit p-2 invisible transition-all hover:brightness-90 shadow-lg' style={isVisible ? { visibility: 'visible' } : {}}><ChevronDoubleDownIcon className='h-4 w-4' /></button>
    )
}

export default ToBottom