import supabase from "./supabase";

export default async function fetchStickers() {
    const { data, error } = await supabase
        .storage
        .from('void_stickers')
        .list('/', {
            limit: 25,
            offset: 0,
        })

    return { data, error }
}