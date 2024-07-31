export async function downloadImage(imgUrl: string, alt: string) {
    try {
        const response = await fetch(imgUrl)
        if (!response.ok) throw new Error("Network Error")

        const blob = await response.blob();

        const objectUrl = URL.createObjectURL(blob)

        /* Temporary link to trigger download */
        const link = document.createElement('a')
        link.href = objectUrl
        link.download = alt

        document.body.appendChild(link)
        link.click()

        /* Removing the link */
        document.body.removeChild(link)

        URL.revokeObjectURL(objectUrl)
    } catch (error) {
        console.log(error)
    }
}