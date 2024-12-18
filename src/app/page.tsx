"use client"
import { useEffect,useState } from 'react'
import { Header } from './components/header'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StockChart } from './components/stock-chart'
import { PredictionChart } from './components/prediction-chart'
import Navbar from './components/Navbar'
import { useSidebar } from '@/components/ui/sidebar'
import { redirect } from 'next/navigation'

export default function Home() {
  const state = useSidebar();
    const isOpen = state.isMobile ? state.openMobile : state.open;
    // console.log(symbol)
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className={`prev-main-content mt-24 ${isOpen?"ml-[280px] mr-10 translate-x-1 transition-all ease-linear after:absolute after:inset-y-0 after:right-1/2 after:w[2px]":"justify-center ml-20 mr-20 -translate-x-1 transition-all ease-linear after:absolute after:inset-y-0 after:right-1/2 after:w[2px]"}`}>
        <section className="bg-black text-white py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to StockInsight</h1>
            <p className="text-xl mb-8">Get real-time stock prices and future predictions</p>
            <div className="flex justify-center">
              <Input className="w-64 mr-2" placeholder="Search for a stock..." />
              <Button>Search</Button>
            </div>
          </div>
        </section>

        <section className="py-16 ">
          <div className="container mx-auto">
            <h2 className="text-3xl text-black font-bold mb-8 text-center">Current Stock Prices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StockCard symbol="AAPL" name="Apple Inc." price={150.25} change={2.5} />
              <StockCard symbol="GOOGL" name="Alphabet Inc." price={2750.80} change={-0.5} />
              <StockCard symbol="MSFT" name="Microsoft Corporation" price={305.15} change={1.2} />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">Stock Price Predictions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Apple Inc. (AAPL) - 6 Month Forecast</CardTitle>
                  <CardDescription>Based on historical data and market trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <StockChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Microsoft Corporation (MSFT) - 6 Month Forecast</CardTitle>
                  <CardDescription>Based on historical data and market trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <PredictionChart />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 FutureTickers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function StockCard({ symbol, name, price, change }: { symbol: string; name: string; price: number; change: number }) {
  const isPositive = change >= 0
  return (
    <Card>
      <CardHeader>
        <CardTitle>{symbol}</CardTitle>
        <CardDescription>{name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${price.toFixed(2)}</p>
        <p className={`text-sm ${isPositive ? 'font-bold' : 'font-normal'}`}>
          {isPositive ? '+' : ''}{change.toFixed(2)}%
        </p>
      </CardContent>
    </Card>
  )
}

