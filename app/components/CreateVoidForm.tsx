import { montserrat } from "../ui/fonts"
import { createVoid } from "@/lib/actions"
import notify from "../ui/toast"

export default function CreateVoid() {

    return (
        <form action={createVoid} className="flex flex-col gap-4 pt-6">
            <h2 className={`${montserrat.className} font-semibold text-base`}>Create New Void</h2>

            <label htmlFor="voidName" className='flex flex-col gap-1'>
                Void Name:
                <input type="text" name="voidName" id="voidName" required placeholder='e.g. "The Boys"' autoFocus className='text-sm bg-transparent outline-none rounded-lg border border-white backdrop-blur py-2 px-4 focus:border-2' />
            </label>

            <button onClick={() => notify('Creating Void...', 'loading')} className={`${montserrat.className} text-base font-semibold py-2 text-darkBg bg-white rounded-lg`}>

                Create Void
            </button>
        </form>
    )
}