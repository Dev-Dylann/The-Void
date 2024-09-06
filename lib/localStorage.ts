export const createStickerStorage = () => {
    const recent = localStorage.getItem("Void Stickers")

    if (!recent) localStorage.setItem("Void Stickers", JSON.stringify([]))
}

export const getRecentStickers = () => {
    const recent = localStorage.getItem("Void Stickers")!
    const recentStickers: string[] = JSON.parse(recent)

    return recentStickers
}

export const updateRecentStickers = (stickerId: string) => {
    const recentStickers = getRecentStickers()

    const duplicate = recentStickers.find(sticker => sticker === stickerId)!!
    if (duplicate) {
        recentStickers.splice(recentStickers.indexOf(duplicate), 1)
        recentStickers.unshift(stickerId)

        localStorage.setItem("Void Stickers", JSON.stringify(recentStickers))
        return recentStickers
    }

    if (recentStickers.length >= 16) {
        recentStickers.pop()
        recentStickers.unshift(stickerId)

        localStorage.setItem("Void Stickers", JSON.stringify(recentStickers))
        return recentStickers
    } else {
        recentStickers.unshift(stickerId)

        localStorage.setItem("Void Stickers", JSON.stringify(recentStickers))
        return recentStickers
    }
}
