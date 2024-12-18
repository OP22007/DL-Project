import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
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
          <span className="font-bold">StockInsight</span>
        </Link>
        <nav className="flex items-center space-x-4 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/market">Market</Link>
          <Link href="/news">News</Link>
          <Link href="/about">About</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="outline">Sign In</Button>
          <Button variant="default">Sign Up</Button>
        </div>
      </div>
    </header>
  )
}

