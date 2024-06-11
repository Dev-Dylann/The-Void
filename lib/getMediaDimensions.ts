export default function getDimensions(media: File, src: string, setDimensions: React.Dispatch<React.SetStateAction<{ width: number, height: number; } | null>>) {

    if (media.type.startsWith('image')) {
        const img = new Image()
        img.src = src
        img.onload = () => {
            setDimensions({
                width: img.width,
                height: img.height,
            })
        }
    } else if (media.type.startsWith('video')) {
        const vid = document.createElement('video')
        vid.src = src
        vid.onloadedmetadata = () => {
            setDimensions({
                width: vid.videoWidth,
                height: vid.videoHeight
            })
        }
    }
}