import Link from "next/link"
import { inter } from "./fonts"
import formatDate from "@/lib/formatDate"
import Image from "next/image";
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
        const input = document.querySelector<HTMLInputElement>('#message')
        setReplying(id)
        input?.focus()
        console.log(replied)
    }

    const datetime = formatDate(message.sent_at)

    return (
        <div id={`${message.id}`} onDoubleClick={() => replyActive(message.id)} className='border rounded-lg p-2 my-1 flex flex-col gap-1 w-fit min-w-[40vw] max-w-[80vw] scroll-mt-40 backdrop-blur transition-all message'>
            {replied && (
                <Link href={`#${replied.id}`}>
                    <pre className={`${inter.className} p-2 border rounded-lg line-clamp-3 text-xs text-wrap text-ellipsis`}>{replied.message}</pre>
                </Link>
            )}

            {message.is_media ? (
                <Image
                    src=''
                    alt=''
                >

                </Image>
            ) : (
                <pre className={`${inter.className} text-xs text-wrap`}>{message.message}</pre>
            )}

            <span className='text-[10px] text-gray-400'>{datetime}</span>
        </div>
    )
}