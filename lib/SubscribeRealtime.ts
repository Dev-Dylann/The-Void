import { Json } from "@/types";
import supabase from "./supabase"
import { RealtimeChannel } from "@supabase/supabase-js"

type message = {
    id: number;
    message: string;
    replied: string | null;
    sent_at: string;
    void_id: string;
    is_media: boolean;
    media: Json | null;
}

export function subscribeToChanges(channel: RealtimeChannel, voidId: string, setMessages: React.Dispatch<React.SetStateAction<{
    id: number;
    message: string;
    replied: string | null;
    sent_at: string;
    void_id: string;
    is_media: boolean;
    media: Json | null;
}[]>>) {

    const listener = channel.on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages', filter: `void_id=eq.${voidId}` },
        (payload) => {
            console.log('Change received!', payload)
            setMessages(prev => {
                const old = [...prev]
                old.push(payload.new as message)

                return old
            })
        }
    )
        .subscribe()

    return listener
}

export function unsubscribeFromChanges(channel: RealtimeChannel) {
    supabase.removeChannel(channel)
}