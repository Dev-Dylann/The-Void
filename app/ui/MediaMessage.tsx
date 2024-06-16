import { Json } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { inter } from "./fonts";
import formatDate from "@/lib/formatDate";
import { ArrowDownTrayIcon, PhotoIcon } from "@heroicons/react/24/outline";

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

    const replyActive = (id: number) => {
        const input = document.querySelector<HTMLInputElement>('#message')
        setReplying(id)
        input?.focus()
    }

    const datetime = formatDate(message.sent_at)
    const media = message.media as any
    const repliedMedia = replied?.media as any

    return (
        <div id={`${message.id}`} onDoubleClick={() => replyActive(message.id)} className='border rounded-lg p-2 my-1 flex flex-col gap-1 w-fit max-w-[80vw] scroll-mt-40 backdrop-blur transition-all message'>
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

            <div className='flex items-center gap-2 text-sm'>
                {media.type.startsWith('image') ? (
                    <Image
                        src={process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL! + media.path}
                        alt={media.path}
                        width={media.width}
                        height={media.height}
                        quality={50}
                        className='rounded'
                    ></Image>
                ) : (
                    <video controls className='rounded'>
                        <source src={process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL! + media.path} type={media.type} />
                    </video>
                )}
            </div>

            <span className='text-[10px] text-gray-400'>{datetime}</span>
        </div>
    )
}