import { Metadata } from "next"
import { montserrat } from "../ui/fonts"
import ChatBody from "./components/ChatBody"

export const metadata: Metadata = {
    title: 'Void Room | The Void',
    description: 'Join the Void Room on The Void and chat anonymously!'
}

type Props = {
    params: {
        voidId: string,
    }
}

export default function VoidRoom({ params }: Props) {

    const { voidId } = params

    return (
        <>
            <header className={`${montserrat.className} sticky left-0 top-0 font-semibold text-center p-4 shadow-lg backdrop-blur`}>
                <h1>Void Room {voidId}</h1>
            </header>

            <main className='grow flex flex-col bg-black/65'>
                <ChatBody />
            </main>
        </>
    )
}