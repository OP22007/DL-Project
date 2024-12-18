'use client'

import React, { useEffect, useState, useRef } from "react";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, registerables } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import { Line } from 'react-chartjs-2';
// import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { useSidebar } from "@/components/ui/sidebar";
import { TabsDemo } from "@/app/components/TabsPrev";

export default function App() {
    const state = useSidebar();
    const isOpen = state.isMobile ? state.openMobile : state.open;
    const searchParams = useSearchParams();
    const symbol = searchParams.get("symbol");
    // console.log(symbol)
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
    return(
        <div>
            <Navbar/>
            <div className={`prev-main-content mt-24 ${isOpen?"ml-[280px] mr-10 translate-x-1 transition-all ease-linear after:absolute after:inset-y-0 after:right-1/2 after:w[2px]":"justify-center ml-20 mr-20 -translate-x-1 transition-all ease-linear after:absolute after:inset-y-0 after:right-1/2 after:w[2px]"}`}>
                <p className="text-2xl font-bold">Ticker Name: {symbol} </p>
                <TabsDemo symbol={symbol}/>
            </div>
        </div>
    )
}