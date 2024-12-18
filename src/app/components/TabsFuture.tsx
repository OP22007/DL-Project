"use client";

import Image from "next/image";
import { useState,useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import FutureChartOpen from "./FutureChartOpen";
import FutureChartClose from "./FutureChartClose";
import FutureChartHigh from "./FutureChartHigh";
import FutureChartLow from "./FutureChartLow";
import FutureChartVolume from "./FutureChartVolume";
import { useTheme } from "next-themes";
import { useSidebar } from "@/components/ui/sidebar";
// import Future from "../Future/page";
export function TabsDemo(props:any) {
    // console.log(props.data)
    const theme = useTheme()

    const state = useSidebar();
    const isOpen = state.isMobile ? state.openMobile : state.open;
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, [theme.theme]);
    if (!isMounted) {
        return null;
    }

  const tabs = [
    {
      title: "Closing Price",
      value: "close",
      content: (
        <div className={`w-full overflow-hidden relative h-[700px] rounded-2xl p-10 text-xl md:text-4xl font-bold ${theme.theme=="dark"?"text-white bg-zinc-900":"text-black bg-zinc-100"} `}>
          <p>Closing Price</p>
          <FutureChartClose symbol={props.symbol} data={props.data}/>
        </div>
      ),
    },
    {
      title: "Opening Price",
      value: "open",
      content: (
        <div className={`w-full overflow-hidden relative h-[700px] rounded-2xl p-10 text-xl md:text-4xl font-bold ${theme.theme=="dark"?"text-white bg-zinc-900":"text-black bg-zinc-100"} `}>
          <p>Opening Price</p>
          <FutureChartOpen symbol={props.symbol} data={props.data}/>
        </div>
      ),
    },
    {
      title: "High",
      value: "high",
      content: (
        <div className={`w-full overflow-hidden relative h-[700px] rounded-2xl p-10 text-xl md:text-4xl font-bold ${theme.theme=="dark"?"text-white bg-zinc-900":"text-black bg-zinc-100"} `}>
          <p>High</p>
          <FutureChartHigh symbol={props.symbol} data={props.data}/>
        </div>
      ),
    },
    {
      title: "Low",
      value: "low",
      content: (
        <div className={`w-full overflow-hidden relative h-[700px] rounded-2xl p-10 text-xl md:text-4xl font-bold ${theme.theme=="dark"?"text-white bg-zinc-900":"text-black bg-zinc-100"} `}>
          <p>Low</p>
          <FutureChartLow symbol={props.symbol} data={props.data}/>
        </div>
      ),
    },
    {
      title: "Volume",
      value: "volume",
      content: (
        <div className={`w-full overflow-hidden relative h-[700px] rounded-2xl p-10 text-xl md:text-4xl font-bold ${theme.theme=="dark"?"text-white bg-zinc-900":"text-black bg-zinc-100"} `}>
          <p>Volume</p>
          <FutureChartVolume symbol={props.symbol} data={props.data}/>
        </div>
      ),
    },
  ];

  return (
    <div className={`h-[40rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-center align-middle items-center mt-10 mb-40`}>
      <Tabs tabs={tabs} />
    </div>
  );
}


