import { montserrat } from "../ui/fonts"
import { useEffect } from "react"
import { createVoid } from "@/lib/actions"
import { useFormStatus, useFormState } from "react-dom"
import Loader from "../ui/Loader"
import notify from "../ui/toast"


type stateType = {
    status: "error" | "success" | "loading" | "",
    message: string
}

const initialState: stateType = {
    status: "",
    message: ""
}

function CreateButton({ status, message }: stateType) {
    const { pending } = useFormStatus()

    useEffect(() => {
        if (pending) {
            notify('loading', 'Creating Void...')
        } else {
            notify(status, message)
        }
    }, [status, message, pending])

    return (
        <button disabled={pending} className={`${montserrat.className} text-base font-semibold py-2 flex items-center justify-center text-darkBg bg-white rounded-lg disabled:brightness-75 sm:text-xl`}>
            {pending ? <Loader /> : 'Create Void'}
        </button>
    )
}

export default function CreateVoid() {

    const [state, formAction] = useFormState(createVoid, initialState)

    return (
        <form action={formAction} className="flex flex-col gap-4 pt-6">
            <h2 className={`${montserrat.className} font-semibold text-base sm:text-xl`}>Create New Void</h2>

            <label htmlFor="voidName" className='flex flex-col gap-1 sm:text-lg'>
                Void Name:
                <input type="text" name="voidName" id="voidName" required placeholder='e.g. "The Boys"' autoFocus className='text-sm bg-transparent outline-none rounded-lg border border-white backdrop-blur py-2 px-4 focus:border-2 sm:text-lg sm:px-6' />
            </label>

            <CreateButton status={state.status} message={state.message} />
        </form>
    )
}