import { useFormStatus } from "react-dom"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import Loader from "@/app/ui/Loader"
import { useEffect } from "react"
import notify from "@/app/ui/toast"
import { toast } from "sonner"

type Props = {
    message: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    setReplying: React.Dispatch<React.SetStateAction<number | undefined>>
    formStatus: { status: "error" | "success" | "loading" | "", message: string }
}

export default function SendButton({ message, setMessage, setReplying, formStatus }: Props) {
    const { pending } = useFormStatus()

    useEffect(() => {
        if (!pending && formStatus.status === "success") {
            setMessage('')
            setReplying(undefined)
        } else if (formStatus.status === "error") {
            toast.error('Failed to send')
            console.log(formStatus)
        }
    }, [pending, formStatus, setMessage, setReplying])

    return (
        <button disabled={pending || !message} className='p-3 rounded-lg text-darkBg bg-white w-fit disabled:brightness-75'>
            {pending ? <Loader /> : <PaperAirplaneIcon className='h-5 w-5 md:h-7 md:w-7' />}
        </button>
    )
}