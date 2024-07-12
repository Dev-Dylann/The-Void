import { toast } from "sonner";

export default function notify(status: "error" | "success" | "loading" | "", message: string) {
    if (status === 'success') {
        toast.success(message)
    } else if (status === 'error') {
        toast.error(message)
    } else if (status === 'loading') {
        toast.loading(message)
    }
}