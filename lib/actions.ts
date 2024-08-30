"use server"

import supabase from './supabase'
import { nanoid } from 'nanoid'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

type returnObject = {
    status: "error" | "success" | "loading" | "",
    message: string,
}

/* Creates a new Void */
export async function createVoid(prevState: returnObject, formData: FormData): Promise<returnObject> {

    const id = nanoid(10)
    const voidName = formData.get('voidName')?.toString().trim()

    const { error } = await supabase.from('void_rooms').insert({ id: id, void_name: voidName })

    if (error) {
        console.log(error)
        return { status: "error", message: "Failed to Create Void!" }
    }

    /* Redirect to newly created Void */
    redirect(`/${id}`)
}

/* Fetch name of specified Void Id */
export async function fetchVoidName(voidId: string) {
    const { data, error } = await supabase
        .from('void_rooms')
        .select()
        .eq('id', voidId)

    if (error) throw new Error(error.message)

    return { data }
}

/* Fetch last messags of the Void with specified Id */
export async function fetchMessages(voidId: string) {
    const { data, error } = await supabase
        .from('messages')
        .select()
        .eq('void_id', voidId)
        .limit(200)

    if (error) throw new Error(error.message)

    return { messages: data }
}

export async function inputNewMessage(prevState: returnObject, formData: FormData): Promise<returnObject> {

    const message = formData.get('message')?.toString().trim()
    const voidId = formData.get('voidId')?.toString()
    const replied = formData.get('replied')?.toString()
    const isMedia = formData.get('isMedia')?.toString()
    const media = formData.get('media')?.toString() ?? null

    const { error } = await supabase
        .from('messages')
        .insert({
            message: message, void_id: voidId, replied: replied ?? null, is_media: !!Number(isMedia), media: media ? JSON.parse(media!) : null
        })

    if (error) {
        return { status: 'error', message: 'Failed to send message!' }
    }

    revalidatePath(`/${voidId}`)
    return { status: 'success', message: 'Message sent successfully!' }
}
