"use server"

import supabase from './supabase'
import { nanoid } from 'nanoid'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

/* Creates a new Void */
export async function createVoid(formData: FormData) {

    const id = nanoid(10)
    const voidName = formData.get('voidName')?.toString().trim()

    const { error } = await supabase.from('void_rooms').insert({ id: id, void_name: voidName })

    if (error) throw new Error(error.message)

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

/* Fetch all messags of the Void with specified Id */
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
    const isMedia = formData.get('isMedia')?.toString()
    const media = formData.get('media')?.toString() ?? null

    const { error } = await supabase
        .from('messages')
        .insert({
            message: message, void_id: voidId, replied: replied ?? null, is_media: !!Number(isMedia), media: media ? JSON.parse(media!) : null
        })

    if (error) {
        return { status: 'Failed to send message' }
    }

    revalidatePath(`/${voidId}`)
    return { status: 'Message sent successfully' }
}

type MediaArgs = {
    media: File,
    dimensions: { width: number, height: number }
}

/* export async function uploadMedia(mediaArgs: MediaArgs, formData: FormData) {
    console.log(formData)

    const voidId = formData.get('voidId')

    const { media, dimensions } = mediaArgs

    const fileName = `${voidId}_${Date.now()}`

    const mediaInfo = {
        path: `/${fileName}`,
        width: dimensions.width,
        height: dimensions.height,
        type: media.type
    }

    console.log(media)
    console.log(fileName)
    console.log(voidId)

    const { error } = await supabase
        .storage
        .from('void_media')
        .upload(fileName, media, {
            cacheControl: '3600'
        })

    if (error) throw new Error(error.message)

    formData.append('isMedia', '1')
    formData.append('media', mediaInfo as any)

    const status = await inputNewMessage({ status: '' }, formData)

    return status
} */

export async function uploadMedia({ media }: { media: File }, formData: FormData) {
    console.log(formData)
}