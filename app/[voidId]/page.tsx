import { Metadata, ResolvingMetadata } from "next"
import { montserrat } from "../ui/fonts"
import { fetchVoidName } from "@/lib/actions"
import ChatBody from "./components/ChatBody"
import { notFound } from "next/navigation"

type Props = {
    params: {
        voidId: string,
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const { voidId } = params
    const { data } = await fetchVoidName(voidId)

    if (!data[0]?.void_name) return notFound()

    return {
        title: data![0]?.void_name,
        description: `Join the anonymous discussion in ${data![0]?.void_name}`
    }
}

export default async function VoidRoom({ params }: Props) {

    const { voidId } = params

    const { data } = await fetchVoidName(voidId)
    const voidName = data[0]?.void_name

    return (
        <>
            <header className={`${montserrat.className} sticky left-0 top-0 font-semibold text-center p-4 shadow-lg bg-darkBg rounded-b-xl z-10`}>
                <h1>{voidName}</h1>
            </header>

            <main className='grow flex flex-col bg-black/65'>
                <ChatBody />
            </main>
        </>
    )
}