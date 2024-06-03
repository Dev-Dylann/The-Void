"use client"

import React, { useState, useEffect } from 'react'
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';

type Props = {
    scrollFn: () => void,
    atBottom: boolean
}

const ToBottom = ({ scrollFn, atBottom }: Props) => {

    return (
        <button onClick={scrollFn} className='z-[99] fixed right-5 bottom-16 bg-white text-darkBg rounded-lg w-fit p-2 invisible transition-all hover:brightness-90 shadow-lg' style={!atBottom ? { visibility: 'visible' } : {}}><ChevronDoubleDownIcon className='h-4 w-4' /></button>
    )
}

export default ToBottom