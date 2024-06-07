import { montserrat } from "../ui/fonts"

export default function loading() {
    return (
        <>
            <header className={`${montserrat.className} sticky left-0 top-0 font-semibold text-center p-4 shadow-lg bg-darkBg rounded-b-xl z-10`}>
                <h1>Loading Void...</h1>
            </header>

            <main className='grow flex bg-black/65 p-5 items-center justify-center gap-4 text-center'>
                <span className='sr-only'>Loading...</span>
                <div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='h-4 w-4 bg-white rounded-full animate-bounce'></div>
            </main>
        </>
    )
}