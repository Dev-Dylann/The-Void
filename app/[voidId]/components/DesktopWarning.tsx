import { montserrat } from "@/app/ui/fonts"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

export default function DesktopWarning() {
    return (
        <div className="hidden lg:flex flex-col justify-center gap-2 text-center p-4 my-auto rounded-lg z-50">
            <ExclamationTriangleIcon className='h-16 w-16 mx-auto' />

            <h2 className={`${montserrat.className} font-bold text-xl`}>
                Not Optimized for Large Screens
            </h2>

            <p className="text-lg">Please switch to a mobile device or tablet to get the full experience.</p>
        </div>
    )
}