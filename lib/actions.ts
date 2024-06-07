"use server"

import supabase from './supabase'
import { nanoid } from 'nanoid'
import { redirect } from 'next/navigation'

export async function createVoid(formData: FormData) {

    const id = nanoid(10)
    const voidName = formData.get('voidName')?.toString().trim()

    const { error } = await supabase.from('void_rooms').insert({ id: id, void_name: voidName })

    if (error) throw new Error(error.message)

    const err = await createChatTable(id)
    if (err) throw new Error(err.message)

    redirect(`/${id}`)
}

async function createChatTable(voidId: string) {
    const { error } = await supabase.rpc('create_table', { table_name: `${voidId}` })

    return error
}

export async function fetchVoidName(voidId: string) {
    const { data, error } = await supabase
        .from('void_rooms')
        .select()
        .eq('id', voidId)

    if (error) throw new Error(error.message)

    return { data }
}

export async function fetchVoidMessages(voidId: string) {
    const { data, error } = await supabase
        .from(voidId)
        .select()
}