"use server"

import supabase from './supabase'
import { nanoid } from 'nanoid'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createVoid(formData: FormData) {

    const id = nanoid(10)
    const voidName = formData.get('voidName')?.toString().trim()

    const { error } = await supabase.from('void_rooms').insert({ id: id, void_name: voidName })

    if (error) throw new Error(error.message)

    redirect(`/${id}`)
}

export async function fetchVoidName(voidId: string) {
    const { data, error } = await supabase
        .from('void_rooms')
        .select()
        .eq('id', voidId)

    if (error) throw new Error(error.message)

    return { data }
}

export async function fetchMessages(voidId: string) {
    const { data, error } = await supabase
        .from('messages')
        .select()
        .eq('void_id', voidId)

    if (error) throw new Error(error.message)

    return { messages: data }
}

/* type newMessageArgs = {
    voidId: string,
    replied?: string
} */

export async function inputNewMessage(prevState: { status: string }, formData: FormData) {
    const message = formData.get('message')?.toString().trim()
    const voidId = formData.get('voidId')?.toString()
    const replied = formData.get('replied')?.toString()

    const { error } = await supabase
        .from('messages')
        .insert({
            message: message, void_id: voidId, replied: replied
        })

    if (error) {
        return { status: 'Failed to send message' }
    }

    revalidatePath(`/${voidId}`)
    return { status: 'Message sent successfully' }
}