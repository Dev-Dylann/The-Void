import notify from "@/app/ui/toast";
import supabase from "./supabase";

export default async function uploadMedia(voidId: string, media: File, dimensions: { width: number, height: number }) {

    const fileName = `${voidId}_${Date.now()}`

    const { error } = await supabase
        .storage
        .from('void_media')
        .upload(`${voidId}/${fileName}`, media, {
            cacheControl: '3600'
        })

    if (error) notify('Failed to upload', 'error')

    return { fileName, error }
}