import { montserrat } from "./fonts"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

export default function DesktopWarning() {
    return (
        <div className="hidden lg:flex flex-col gap-2 text-right p-4 rounded-lg">
            <h2 className={`${montserrat.className} font-bold text-xl flex gap-2 justify-end`}>
                <ExclamationTriangleIcon className='h-8 w-8' />
                Not Optimized for Large Screens
            </h2>

            <p className="text-lg">Please switch to a mobile device<br /> or tablet to get the full experience.</p>
        </div >
    )
}