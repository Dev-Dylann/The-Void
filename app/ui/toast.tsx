import { toast } from "react-toastify";
import { montserrat } from "./fonts";

export const ToastTemplate = ({ message }: { message: string }) => {
    return (
        <div className={`${montserrat.className} text-xs font-semibold rounded-lg`}>
            {message}
        </div>
    )
}

export default function notify(message: string, type: 'success' | 'error' | 'loading'): void {
    if (type === 'success') {
        toast.success(<ToastTemplate message={message} />)
    } else if (type === 'error') {
        toast.error(<ToastTemplate message={message} />)
    } else if (type === 'loading') {
        toast.loading(<ToastTemplate message={message} />)
    }
}
