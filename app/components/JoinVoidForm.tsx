import { montserrat } from "../ui/fonts"

export default function JoinVoid() {
    return (
        <form action="" className="flex flex-col gap-4 pt-6">
            <h2 className={`${montserrat.className} font-semibold text-base`}>Join Existing Void</h2>

            <label htmlFor="voidLink" className='flex flex-col gap-1'>
                Void Link:
                <input type="text" name="voidLink" id="voidLink" placeholder='e.g. "thevoid.netlify.app/uuid-nano"' autoFocus className='text-sm bg-transparent outline-none rounded-lg border border-white backdrop-blur py-2 px-4 focus:border-2' />
            </label>

            <button type="submit" className={`${montserrat.className} text-base font-semibold py-2 text-darkBg bg-white rounded-lg`}>
                Join Void
            </button>
        </form>
    )
}