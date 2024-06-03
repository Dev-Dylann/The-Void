"use client"

import { useState, useEffect } from 'react'
import MessageArea from './MessageArea'
import MessageInput from './MessageInput'

export default function ChatBody() {
    const [replying, setReplying] = useState<number | undefined>(undefined)

    return (
        <>
            <MessageArea setReplying={setReplying} />

            <MessageInput replying={replying} setReplying={setReplying} />
        </>
    )
}