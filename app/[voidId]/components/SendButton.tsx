import { useFormStatus } from "react-dom"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { useEffect } from "react"

type Props = {
    message: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>
}

export default function SendButton({ message, setMessage }: Props) {
    const { pending } = useFormStatus()

    useEffect(() => {
        if (!pending) {
            setMessage('')
        }
    }, [pending])

    return (
        <button disabled={pending || !message} className='p-2 rounded-lg text-darkBg bg-white w-fit disabled:brightness-75'>
            <PaperAirplaneIcon className='h-5 w-5' />
        </button>
    )
}