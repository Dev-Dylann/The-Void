import { useState, useEffect, useRef, createElement } from 'react';
import supabase from '@/lib/supabase';
import fetchStickers from '@/lib/fetchStickers';
import { XMarkIcon, ClockIcon } from "@heroicons/react/24/outline";
import stickerIcon from "@/public/sticker-icon.svg"
import Link from 'next/link';


type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function generateArray(start: number) {
    const arr = [];
    for (let i = start; i <= start + 47; i++) {
        if (i > 150) break
        arr.push(i);
    }
    return arr;
}

export default function StickerArea({ isOpen, setIsOpen }: Props) {
    const stickerContainerRef = useRef<HTMLDivElement>(null)

    const startArray = generateArray(2)

    const loadMoreStickers = () => {
        const stickerContainer = stickerContainerRef.current!

        const last = stickerContainer.lastElementChild!
        const lastId = last.id

        const nextArray = generateArray(Number(lastId) + 1)

        nextArray.map((el, index) => {
            const sticker = document.createElement("img")
            sticker.id = `${el}`
            sticker.src = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL! + 'void_stickers/stickers/sticker' + el + '.webp'
            sticker.alt = `sticker${index}`
            sticker.width = 512
            sticker.width = 512

            stickerContainer.appendChild(sticker)
        })
    }

    return (
        <div className={`absolute w-full h-[60vh] p-5 flex flex-col gap-4 bg-darkBg transition-all duration-500 bottom-0 left-0 z-40 rounded-t-xl ${isOpen ? "translate-y-0" : "translate-y-full"}`}>
            <div className='flex gap-4'>
                <Link href='#recent-stickers' className=" p-1 rounded-md">
                    <ClockIcon className="h-5 w-5" />
                </Link>

                <Link href='#all-stickers' className=" p-1 rounded-md">
                    <img src="./sticker-icon.svg" alt="sticker icon" width={16} height={16} />
                </Link>
                <div className='grow'></div>

                <button onClick={() => setIsOpen(prev => !prev)} className="border p-1 rounded-md self-end">
                    <XMarkIcon className="h-5 w-5" />
                </button>
            </div>

            <div id="snap-container" className="overflow-x-auto scroll-smooth scroll-snap-mandatory">
                <div className='w-full h-full flex flex-nowrap gap-4 scroll-smooth overflow-y-hidden'>

                    <div id="recent-stickers" className='py-10 h-fit min-w-[calc(100vw_-_40px)] scroll-snap-start text-center flex flex-col gap-2'>
                        <p className='font-semibold'>No recent stickers</p>
                        <p className='text-xs text-gray-400'>Use a sticker to add it to your recently used stickers</p>
                    </div>

                    <div id='all-stickers' ref={stickerContainerRef} className='min-w-[calc(100vw_-_45px)] scroll-snap-start grid grid-cols-4 gap-4 overflow-y-scroll'>
                        <div className="col-span-full flex has-[:disabled]:hidden justify-center order-1">
                            <button disabled={stickerContainerRef.current?.lastElementChild?.id === '150'} onClick={loadMoreStickers} className='border rounded-lg text-xs w-fit mt-4 py-2 px-4'>
                                Load More
                            </button>
                        </div>

                        {startArray.map((el, index) => (
                            <img id={`${el}`} key={`sticker${index}`} src={process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL! + 'void_stickers/stickers/sticker' + el + '.webp'} alt={`sticker${index}`} width={512} height={512} className="place-content-center" />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}