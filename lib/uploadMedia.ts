import supabase from "./supabase";

export default async function uploadMedia(voidId: string, media: File) {

    const fileName = `${voidId}_${Date.now()}`

    const { error } = await supabase
        .storage
        .from('void_media')
        .upload(`${voidId}/${fileName}`, media, {
            cacheControl: '3600'
        })

    if (error) console.log(error.message)

    return { fileName, error }
}