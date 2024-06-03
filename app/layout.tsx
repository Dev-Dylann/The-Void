import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./ui/fonts";
import Image from 'next/image'
import mobileBg from '../public/mobile-bg.jpg'

export const metadata: Metadata = {
  title: "The Void",
  description: "Create anonymous chatrooms for you andd your friends!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className={`${inter.className} min-h-screen bg-darkBg text-white flex flex-col relative`}>
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
