"use client"

import { useState, useEffect } from 'react'
import supabase from '@/lib/supabase'
import { useParams } from 'next/navigation'
import { subscribeToChanges } from '@/lib/SubscribeRealtime'
import MessageArea from './MessageArea'
import MessageInput from './MessageInput'
import { Json } from '@/types'
import notify from '@/app/ui/toast'

type Message = {
    id: number;
    message: string;
    replied: string | null;
    sent_at: string;
    void_id: string;
    is_media: boolean;
    media: Json | null;
}

type Props = {
    messagesArray: Message[]
}

export default function ChatBody({ messagesArray }: Props) {
    const [replying, setReplying] = useState<number | undefined>(undefined)
    const [messages, setMessages] = useState(messagesArray)
    const [replied, setReplied] = useState<Message>()

    const { voidId } = useParams()

    const voidChannel = supabase.channel(voidId as string)

    const data = subscribeToChanges(voidChannel, voidId as string, setMessages)

    useEffect(() => {
        if (replying) {
            const repliedMessage = messages.find(message => {
                return message.id === replying
            })

            setReplied(repliedMessage)
        } else {
            setReplied(undefined)
        }
    }, [replying, messages])

    return (
        <>
            <MessageArea setReplying={setReplying} messages={messages} />

            <MessageInput replying={replying} setReplying={setReplying} replied={replied} />
        </>
    )
}