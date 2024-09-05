import { Json } from "@/types";
import Link from "next/link";
import { inter } from "./fonts";
import formatDate from "@/lib/formatDate";
import { PhotoIcon } from "@heroicons/react/24/outline";

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
}

export default function StickerMessage({ message, replied }: Props) {
    const datetime = formatDate(message.sent_at)
    const media = message.media as any
    const repliedMedia = replied?.media as any

    return (
        <div id={`${message.id}`} className="border rounded-lg p-2 my-1 flex flex-col gap-1 w-fit max-w-[75vw] scroll-mt-40 backdrop-blur message">
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

            <img src={process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL! + "void_stickers/stickers/" + media.path} alt={media.path} width={media.width} height={media.height} className="h-32 w-32 place-self-center" />

            <span className='text-[10px] text-gray-400'>{datetime}</span>
        </div>
    )
}