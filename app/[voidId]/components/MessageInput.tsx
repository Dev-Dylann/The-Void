"use client"

import { useEffect, useState, useRef } from "react"
import { useFormState } from "react-dom"
import { useParams } from "next/navigation"
import Image from "next/image"
import { inputNewMessage } from "@/lib/actions"
import { inter } from "@/app/ui/fonts"
import { XMarkIcon, PhotoIcon, ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import SendButton from "./SendButton"
import getDimensions from "@/lib/getMediaDimensions"
import { Json } from "@/types"
import uploadMedia from "@/lib/uploadMedia"
import notify from "@/app/ui/toast"

type Props = {
    replying: number | undefined,
    setReplying: React.Dispatch<React.SetStateAction<number | undefined>>,
    replied?: {
        id: number;
        message: string;
        replied: string | null;
        sent_at: string;
        void_id: string;
        is_media: boolean;
        media: Json | null;
    }
}

const initState = {
    status: ""
}

export default function MessageInput({ replying, setReplying, replied }: Props) {

    const [message, setMessage] = useState('')
    const [media, setMedia] = useState<File | null>()
    const [preview, setPreview] = useState<string | ArrayBuffer | null>('')
    const [dimensions, setDimensions] = useState<{ width: number, height: number } | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const { voidId } = useParams()
    const repliedMedia = replied?.media as any

    const [state, formAction] = useFormState(inputNewMessage, initState)

    const handleMediaChange = (files: FileList | null) => {
        if (files) {
            const media = files[0]

            setMedia(media)
            showPreview(media)
        } else {
            setMedia(null)
        }
    }

    const showPreview = (media: File) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            getDimensions(media, reader.result as string, setDimensions)
            setPreview(reader.result)
        }
        reader.readAsDataURL(media)
    }

    const nullMedia = () => {
        setMedia(null)
        setPreview(null)
        setDimensions(null)
    }

    const uploadMediaAndUpdateMessages = async () => {
        const { fileName, error } = await uploadMedia(voidId as string, media!, dimensions!)

        if (error) {
            nullMedia()
            return
        }

        const mediaInfo = {
            path: `/${voidId}/${fileName}`,
            width: dimensions?.width,
            height: dimensions?.height,
            type: media?.type
        }

        const formData = new FormData()
        formData.append('voidId', voidId as string)
        formData.append('replied', replied?.id.toString()!)
        formData.append('isMedia', '1')
        formData.append('media', JSON.stringify(mediaInfo))


        const status = await inputNewMessage({ status: '' }, formData)

        if (status.status.includes('Failed')) notify(status.status, 'error')

        nullMedia()
    }

    /* const mediaArgs = {
        media: media!,
        dimensions: dimensions!
    }

    const uploadMediaWithArgs = uploadMedia.bind(null, mediaArgs)
 */

    return (
        <section className='sticky bottom-0 bg-darkBg rounded-t-2xl flex-end w-full py-2 px-3 flex gap-2 z-10'>
            <form action={formAction} className="grid grid-cols-[1fr_auto] w-full gap-2">
                {replying && !replied?.is_media && (
                    <div className='relative p-2 flex flex-col gap-1 text-xs col-span-full text-gray-500 border rounded-lg'>
                        <button type="button" onClick={() => setReplying(undefined)}>
                            <XMarkIcon className='h-4 w-4 absolute top-2 right-2' />
                        </button>
                        Replying to
                        <pre className={`${inter.className} text-white line-clamp-3 text-xs text-wrap text-ellipsis`}>{replied?.message}</pre>
                    </div>
                )}

                {replying && replied?.is_media && (
                    <div className='relative p-2 flex flex-col gap-1 text-xs col-span-full text-gray-500 border rounded-lg'>
                        <button type="button" onClick={() => setReplying(undefined)}>
                            <XMarkIcon className='h-4 w-4 absolute top-2 right-2' />
                        </button>
                        Replying to
                        <div className='flex items-center gap-2 text-white'>
                            <PhotoIcon className='h-6 w-6' />
                            {repliedMedia.type.includes('image') ? "Image" : "Video"}
                        </div>
                    </div>
                )}
                <label htmlFor="message" className='absolute -left-[999px]'>
                    Type your message here
                </label>
                <textarea name="message" rows={1} id="message" autoComplete="off" placeholder='Type your message here' value={message} onChange={(e) => setMessage(e.target.value)} className='text-sm bg-transparent outline-none rounded-lg py-2 h-fit self-center px-4 outline outline-2 focus:outline-white -outline-offset-2 grow resize-none' />
                <input type="hidden" name="voidId" value={voidId} />
                <input type="hidden" name="replied" value={replied?.id.toString()} />

                <SendButton message={message} setMessage={setMessage} setReplying={setReplying} formStatus={state.status} />
            </form>

            {!message && (
                <form className='-order-1 relative h-fit self-end'>
                    <label htmlFor="media" className='absolute -left-[999px]'>
                        Upload media
                    </label>
                    <input type="file" name="media" id="media" ref={fileInputRef} accept="image/*,video/*" className='absolute top-0 left-0 w-full h-full opacity-0' value='' onChange={(e) => handleMediaChange(e.target.files)} />

                    <input type="hidden" name="voidId" value={voidId} />
                    <input type="hidden" name="replied" value={replied?.id.toString()} />

                    <div className='p-3 rounded-lg w-fit border'>
                        <PhotoIcon className='h-5 w-5' />
                    </div>

                    {media && preview && dimensions && (
                        <div className='fixed top-0 left-0 w-full h-full backdrop-blur px-5 py-8 flex flex-col gap-4'>
                            <button type="button" onClick={nullMedia} className='p-2 rounded-lg border w-fit'>
                                <ArrowLeftIcon className='h-5 w-5' />
                            </button>
                            <div className='grow flex justify-center items-center overflow-hidden'>
                                {media.type.startsWith('image') ? (
                                    <Image
                                        src={preview as string}
                                        alt={media.name}
                                        width={dimensions.width}
                                        height={dimensions.height}
                                        className='max-h-full max-w-full'
                                    >
                                    </Image>
                                ) : (
                                    <video controls controlsList='nofullscreen nodownload'>
                                        <source width={dimensions.width} height={dimensions.height} src={preview as string} type={media.type} />
                                        Video preview not supported in your browser.
                                    </video>
                                )}
                            </div>

                            <button onClick={async () => await uploadMediaAndUpdateMessages()} type="button" className='bg-white text-darkBg rounded-lg self-center py-2 px-5 w-fit flex gap-2 font-semibold'>
                                <PaperAirplaneIcon className='h-5 w-5' />
                                Send
                            </button>
                        </div>
                    )}
                </form>
            )}

            {state.status.includes('Failed') && message && (
                <span className='text-red-600 italic absolute bottom-1 left-5 text-[8px]'>Failed to send message!</span>
            )}
        </section>
    )
}