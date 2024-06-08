"use client"

import { useState, useEffect } from 'react'
import MessageArea from './MessageArea'
import MessageInput from './MessageInput'

type Props = {
    messagesArray: {
        id: number;
        message: string;
        replied: string | null;
        sent_at: string;
        void_id: string;
    }[]
}

export default function ChatBody({ messagesArray }: Props) {
    const [replying, setReplying] = useState<number | undefined>(undefined)
    const [messages, setMessages] = useState(messagesArray)

    return (
        <>
            <MessageArea setReplying={setReplying} messages={messages} />

            <MessageInput replying={replying} setReplying={setReplying} messages={messagesArray} />
        </>
    )
}