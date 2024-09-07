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
import Loader from "@/app/ui/Loader"
import notify from "@/app/ui/toast"
import StickerArea from "./StickerArea"

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

type stateType = {
    status: "error" | "success" | "loading" | "",
    message: string,
}

export default function MessageInput({ replying, setReplying, replied }: Props) {

    const [message, setMessage] = useState('')
    const [media, setMedia] = useState<File | null>()
    const [preview, setPreview] = useState<string | ArrayBuffer | null>('')
    const [dimensions, setDimensions] = useState<{ width: number, height: number } | null>(null)
    const [uploading, setUploading] = useState(false)

    /* state for sticker area open or not */
    const [isOpen, setIsOpen] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const hiddenInputRef = useRef<HTMLInputElement>(null)

    const { voidId } = useParams()
    const repliedMedia = replied?.media as any

    const [state, formAction] = useFormState(inputNewMessage, { status: "", message: "" } as stateType)

    /* set value of the hidden ref for id of message beimg replied to cos it wasn't working the normal way for some reason */
    useEffect(() => {
        const hiddenInput = hiddenInputRef.current!

        hiddenInput.value = replying?.toString() ?? ''
    }, [replying])

    /* handle media change ... lol */
    const handleMediaChange = (files: FileList | null) => {
        if (files) {
            const media = files[0]

            setMedia(media)
            showPreview(media)
        } else {
            setMedia(null)
        }
    }

    /* get dimensions of selected media for easy rendering with next and triggers the preview screen */
    const showPreview = (media: File) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            getDimensions(media, reader.result as string, setDimensions)
            setPreview(reader.result)
        }
        reader.readAsDataURL(media)
    }

    /* untriggers the preview screen */
    const nullMedia = () => {
        setMedia(null)
        setPreview(null)
        setDimensions(null)
    }

    /* uploads media to the bucket first then adds a media json object to the messages table */
    const uploadMediaAndUpdateMessages = async () => {
        setUploading(true)
        const { fileName, error } = await uploadMedia(voidId as string, media!)

        if (error) {
            notify('error', 'Failed to send media!')
            setUploading(false)
            nullMedia()
            return
        }

        /* create the media json object */
        const mediaInfo = {
            path: `/${voidId}/${fileName}`,
            width: dimensions?.width,
            height: dimensions?.height,
            type: media?.type
        }

        /* input new message action needs a formdata so creating one and appending the required data */
        const formData = new FormData()
        formData.append('voidId', voidId as string)
        formData.append('replied', replying?.toString()!)
        formData.append('isMedia', '1')
        formData.append('media', JSON.stringify(mediaInfo))


        const state = await inputNewMessage({ status: '', message: "" }, formData)

        if (state.status === 'error') {
            notify('error', "Failed to send message")
            setUploading(false)
            nullMedia()
        }

        setUploading(false)
        nullMedia()
    }

    return (
        <section className='fixed bottom-0 bg-darkBg rounded-t-2xl flex-end w-full py-2 px-3 flex gap-2 z-10 sm:px-5 sm:py-4 sm:rounded-t-3xl lg:hidden'>
            <form action={formAction} className="grid grid-cols-[1fr_auto] w-full gap-2">
                {replying && !replied?.is_media && (
                    <div className='relative p-2 flex flex-col gap-1 text-xs col-span-full text-gray-500 border rounded-lg sm:text-sm'>
                        <button type="button" onClick={() => setReplying(undefined)}>
                            <XMarkIcon className='h-4 w-4 absolute top-2 right-2 sm:h-6 sm:w-6' />
                        </button>
                        Replying to
                        <pre className={`${inter.className} text-white line-clamp-3 text-wrap text-ellipsis`}>{replied?.message}</pre>
                    </div>
                )}

                {replying && replied?.is_media && (
                    <div className='relative p-2 flex flex-col gap-1 text-xs col-span-full text-gray-500 border rounded-lg sm:text-sm'>
                        <button type="button" onClick={() => setReplying(undefined)}>
                            <XMarkIcon className='h-4 w-4 absolute top-2 right-2 sm:h-6 sm:w-6' />
                        </button>
                        Replying to
                        <div className='flex items-center gap-2 text-white'>
                            <PhotoIcon className='h-6 w-6' />
                            {repliedMedia.type.includes('video') ? "Video" : repliedMedia.path.includes('sticker') ? "Sticker" : "Image"}
                        </div>
                    </div>
                )}

                <label htmlFor="message" className='absolute -left-[999px]'>
                    Type your message here
                </label>
                <textarea name="message" rows={1} id="message" autoComplete="off" placeholder='Type your message here' value={message} onChange={(e) => setMessage(e.target.value)} className='text-sm bg-transparent outline-none rounded-lg py-2 h-fit self-center px-4 outline outline-2 focus:outline-white -outline-offset-2 grow resize-none sm:text-base' />
                <input type="hidden" name="voidId" value={voidId} />
                <input type="hidden" name="replied" ref={hiddenInputRef} />

                <SendButton message={message} setMessage={setMessage} setReplying={setReplying} formStatus={state} />
            </form>

            {!message && (
                <button onClick={() => setIsOpen(prev => !prev)} className="px-3.5 py-3 rounded-lg w-fit h-fit self-end border -order-2">
                    <img src="./sticker-icon.svg" alt="sticker icon" width={24} height={24} />
                </button>
            )}

            {!message && (
                <form className='-order-1 relative h-fit self-end'>
                    <label htmlFor="media" className='absolute -left-[999px]'>
                        Upload media
                    </label>
                    <input type="file" name="media" id="media" ref={fileInputRef} accept="image/*,video/*" className='absolute top-0 left-0 w-full h-full opacity-0' value='' onChange={(e) => handleMediaChange(e.target.files)} />

                    <input type="hidden" name="voidId" value={voidId} />
                    <input type="hidden" name="replied" value={replied?.id.toString()} />

                    <div className='p-3 rounded-lg w-fit border'>
                        <PhotoIcon className='h-5 w-5 md:w-7 md:h-7' />
                    </div>

                    {media && preview && dimensions && (
                        <div className='fixed top-0 left-0 w-full h-full backdrop-blur px-5 py-8 flex flex-col gap-4 sm:px-10 sm:pb-16'>
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
                                        quality={50}
                                        className='max-h-full w-fit max-w-full'
                                    >
                                    </Image>
                                ) : (
                                    <video controls controlsList='nofullscreen nodownload'>
                                        <source width={dimensions.width} height={dimensions.height} src={preview as string} type={media.type} />
                                        Video preview not supported in your browser.
                                    </video>
                                )}
                            </div>

                            <button disabled={uploading} onClick={async () => await uploadMediaAndUpdateMessages()} type="button" className='bg-white text-darkBg rounded-lg self-center py-2 px-5 w-fit flex gap-2 font-semibold disabled:brightness-75 sm:text-lg'>
                                {!uploading ? (
                                    <>
                                        <PaperAirplaneIcon className='h-5 w-5 md:h-7 md:w-7' />
                                        Send
                                    </>
                                ) : (
                                    <>
                                        <Loader />
                                        Sending
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </form>
            )}

            {state.status === 'error' && message && (
                <span className='text-red-600 italic absolute bottom-1 left-5 text-[8px]'>Failed to send message!</span>
            )}


            <StickerArea isOpen={isOpen} setIsOpen={setIsOpen} replying={replying} setReplying={setReplying} />
        </section>
    )
}