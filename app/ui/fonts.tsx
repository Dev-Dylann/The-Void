import { Inter, Montserrat } from "next/font/google";
import localFont from 'next/font/local'

const inter = Inter({ subsets: ["latin"], display: 'swap' });
const montserrat = Montserrat({ subsets: ["latin"], display: 'swap' })
const astro = localFont({
    src: './astro.woff2',
    display: 'swap',
})

export { inter, montserrat, astro }