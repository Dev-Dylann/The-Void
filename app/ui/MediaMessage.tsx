import { Json } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { inter } from "./fonts";
import formatDate from "@/lib/formatDate";
import { ArrowDownTrayIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { downloadImage } from "@/lib/imgDownload";

type Props = {
    message: {
        id: number;
        message: string;
        replied: string | null;
        sent_at: string;
        void_id: string;
        is_media: boolean;
        media: Json | null;
    },
    replied?: {
        id: number;
        message: string;
        replied: string | null;
        sent_at: string;
        void_id: string;
        is_media: boolean;
        media: Json | null;
    },
    setReplying: React.Dispatch<React.SetStateAction<number | undefined>>,
}

export default function MediaMessage({ message, replied, setReplying }: Props) {

    const [fullscreen, setFullscreen] = useState(false)

    const replyActive = (id: number) => {
        const input = document.querySelector<HTMLInputElement>('#message')
        setReplying(id)
        input?.focus()
    }

    const datetime = formatDate(message.sent_at)
    const media = message.media as any
    const repliedMedia = replied?.media as any

    return (
        <div id={`${message.id}`} /* onDoubleClick={() => replyActive(message.id)} */ className={!fullscreen ? `border rounded-lg p-2 my-1 flex flex-col gap-1 w-fit max-w-[75vw] scroll-mt-40 backdrop-blur message transition-all` : `fixed top-0 left-0 w-full h-full z-[11] backdrop-blur transition-all scroll-mt-40 flex flex-col gap-4 px-5 py-8`}>

            {fullscreen && (
                <>
                    <button type="button" onClick={() => setFullscreen(false)} className='p-2 rounded-lg border w-fit'>
                        <XMarkIcon className='h-5 w-5' />
                    </button>

                    <button onClick={async () => await downloadImage(process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL! + media.path, media.path)} className='bg-white text-darkBg rounded-lg self-center py-2 px-5 w-fit flex gap-2 font-semibold order-1'>
                        <ArrowDownTrayIcon className='h-5 w-5' />
                        Download
                    </button>
                </>
            )}

            {replied && !replied.is_media && (
                <Link href={`#${replied.id}`}>
                    <pre className={`${inter.className} p-2 border rounded line-clamp-3 text-xs text-wrap text-ellipsis`}>{replied.message}</pre>
                </Link>
            )}

            {replied && replied.is_media && (
                <Link href={`#${replied.id}`} className='text-xs flex items-center gap-2 p-2 border rounded'>
                    <PhotoIcon className='h-5 w-5' />
                    {repliedMedia.type.includes('image') ? "Image" : "Video"}
                </Link>
            )}

            <div className={!fullscreen ? 'flex items-center gap-2 text-sm overflow-hidden max-h-[40vh] rounded' : 'grow flex justify-center items-center overflow-hidden'} onClick={() => setFullscreen(true)}>
                {media.type.startsWith('image') ? (
                    <Image
                        src={process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL! + media.path}
                        alt={media.path}
                        width={media.width}
                        height={media.height}
                        quality={50}
                        className={fullscreen ? 'max-h-full w-fit max-w-full' : ''}
                    ></Image>
                ) : (
                    <video controls={fullscreen} controlsList="nodownload nofullscreen" className={fullscreen ? 'max-h-full w-fit max-w-full' : ''}>
                        <source src={process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL! + media.path} width={media.width} height={media.height} type={media.type} />
                    </video>
                )}
            </div>

            <span className={!fullscreen ? 'text-[10px] text-gray-400' : 'hidden'}>{datetime}</span>

        </div>
    )
}