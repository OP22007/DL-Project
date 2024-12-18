import React from 'react'
import { ModeToggle } from './ModeToggle'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useSidebar } from '@/components/ui/sidebar'
import { useTheme } from 'next-themes'
import Link from 'next/link'
const Navbar = () => {
    const { open, openMobile,isMobile } = useSidebar();
    const isOpen = isMobile ? openMobile : open;
    const theme = useTheme();
    console.log(theme.theme)
  return (
    <div className={`fixed w-[100%] overflow-hidden top-0 opacity-100 ${theme.theme=="dark"?"bg-black":"bg-white"} z-20`}>
        <nav className={`flex flex-row mt-2 items-center ${isOpen?'ml-[275px] transition-all ease-linear after:absolute after:inset-y-0 after:right-1/2 after:w[2px]':'ml-20  transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px]'} h-[60px] justify-start gap-20 `}>
            <SidebarTrigger />
            <Link href="/" className="flex items-center space-x-2 ml-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
              <span className="font-bold text-xl">FutureTickers</span>
            </Link>
            <Link href='/prev'>Current Market</Link>
            <Link href='/future'>Future Prediction</Link>
            <div className='absolute right-16'>
            <ModeToggle/>
            </div>
        </nav>
        <hr className='border-1'/>
    </div>
  )
}

export default Navbar