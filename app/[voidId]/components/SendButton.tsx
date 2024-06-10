import { useFormStatus } from "react-dom"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { useEffect } from "react"
import notify from "@/app/ui/toast"

type Props = {
    message: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    setReplying: React.Dispatch<React.SetStateAction<number | undefined>>
    formStatus: string
}

function Loader() {
    return (
        <div className='h-5 w-5 bg-darkBg rounded-full grid place-content-center loader animate-spin'>
            <div className='h-3 w-3 bg-white rounded-full'></div>
        </div>
    )
}

export default function SendButton({ message, setMessage, setReplying, formStatus }: Props) {
    const { pending } = useFormStatus()

    useEffect(() => {
        if (!pending && formStatus.includes('success')) {
            setMessage('')
            setReplying(undefined)
        } else if (!pending && formStatus.includes('Failed')) {
            if (window !== undefined) {
                notify(formStatus, 'error')
            }
        }
    }, [pending, formStatus])

    useEffect(() => {
        console.log(formStatus)
    }, [formStatus])

    return (
        <button disabled={pending || !message} className='p-3 rounded-lg text-darkBg bg-white w-fit disabled:brightness-75'>
            {pending ? <Loader /> : <PaperAirplaneIcon className='h-5 w-5' />}
        </button>
    )
}