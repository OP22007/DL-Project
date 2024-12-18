'use client'
import React,{ useEffect,useState} from 'react'
import FinanceChart from '../components/PrevChartClose'
import Navbar from '../components/Navbar'
import data from '../data/tickers.json'
import StockTable from '../components/StockTable'
import { useSidebar } from '@/components/ui/sidebar'
const Prev = () => {
  const state = useSidebar();
  const isOpen = state.isMobile ? state.openMobile : state.open;
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (

    <div>
      <Navbar/>
      <div className={`prev-main-content mt-24 ${isOpen?"ml-[280px] mr-10 translate-x-1 transition-all ease-linear after:absolute after:inset-y-0 after:right-1/2 after:w[2px]":"justify-center ml-20 mr-20 -translate-x-1 transition-all ease-linear after:absolute after:inset-y-0 after:right-1/2 after:w[2px]"}`}>
        <p className='font-bold text-2xl mb-4'>Markets</p>
        <StockTable/>
        {/* <FinanceChart symbol='AAPL' /> */}
      </div>
    </div>
  )
}

export default Prev