import { Metadata, ResolvingMetadata } from "next"
import { montserrat } from "../ui/fonts"
import { fetchMessages, fetchVoidName } from "@/lib/actions"
import ChatBody from "./components/ChatBody"
import { notFound } from "next/navigation"
import Link from "next/link"

import { ArrowLeftIcon, ShareIcon } from "@heroicons/react/24/outline"

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

    const voidData = fetchVoidName(voidId)
    const messagesData = fetchMessages(voidId)

    const [data, messages] = await Promise.all([voidData, messagesData])
    const voidName = data.data[0]?.void_name

    return (
        <>
            <header className={`${montserrat.className} sticky left-0 top-0 font-semibold flex items-center justify-between p-4 shadow-lg bg-darkBg rounded-b-xl z-10`}>
                <Link href='/'>
                    <ArrowLeftIcon className='h-5 w-5' />
                </Link>
                <h1>{voidName}</h1>
                <ShareIcon className='h-5 w-5' />
            </header>

            <main className='grow flex flex-col bg-black/65 h-screen prevent-select'>
                <ChatBody messagesArray={messages.messages} />
            </main>
        </>
    )
}