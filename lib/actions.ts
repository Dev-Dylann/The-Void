"use server"

import supabase from './supabase'
import { nanoid } from 'nanoid'
import { redirect } from 'next/navigation'

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