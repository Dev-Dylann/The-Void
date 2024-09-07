import Link from "next/link"
import { inter } from "./fonts"
import formatDate from "@/lib/formatDate"
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Json } from "@/types";

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

export default function Message({ message, replied, setReplying }: Props) {

    const replyActive = (id: number) => {
        const input = document.querySelector<HTMLTextAreaElement>('#message')
        setReplying(id)
        input?.focus()
    }

    const datetime = formatDate(message.sent_at)
    const repliedMedia = replied?.media as any

    return (
        <div id={`${message.id}`} onDoubleClick={() => replyActive(message.id)} className='border rounded-lg p-2 my-1 flex flex-col gap-1 w-fit min-w-[40vw] max-w-[80vw] scroll-mt-40 backdrop-blur transition-all message sm:max-w-[65vw] sm:min-w-[25vw]'>
            {replied && !replied.is_media && (
                <Link href={`#${replied.id}`}>
                    <pre className={`${inter.className} p-2 border rounded line-clamp-3 text-xs text-wrap text-ellipsis sm:text-sm`}>{replied.message}</pre>
                </Link>
            )}

            {replied && replied.is_media && (
                <Link href={`#${replied.id}`} className='text-xs flex items-center gap-2 p-2 border rounded sm:text-sm'>
                    <PhotoIcon className='h-5 w-5 md:w-7 md:h-7' />
                    {repliedMedia.type.includes('image') ? "Image" : "Video"}
                </Link>
            )}

            <pre className={`${inter.className} text-xs text-wrap sm:text-base`}>{message.message}</pre>

            <span className='text-[10px] text-gray-400 sm:text-xs'>{datetime}</span>
        </div>
    )
}