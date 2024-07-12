import type { Metadata, Viewport } from "next";
import "./globals.css";
import { inter } from "./ui/fonts";
import Image from 'next/image'
import mobileBg from '../public/mobile-bg.jpg'

export const metadata: Metadata = {
  title: {
    default: 'The Void',
    template: '%s | The Void'
  },
  description: "Create anonymous chatrooms for you and your friends!",
  metadataBase: new URL('https://the-void-pi.vercel.app'),
  openGraph: {
    images: '/opengraph-image.jpg',
  },
};

export const viewport: Viewport = {
  themeColor: '#101720',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className={`${inter.className} bg-darkBg text-white grid grid-rows-[auto,_1fr] relative overflow-hidden`}>
        <Image
          alt='Background'
          src={mobileBg}
          fill
          quality={100}
          placeholder='blur'
          sizes='100vw'
          className='object-cover bg-fixed -z-[1]'
        />

        {children}
      </body>
    </html>
  );
}
