"use client";

import Image from "next/image";
import { Tabs } from "@/components/ui/tabs";
import PrevChartOpen from "./PrevChartOpen";
import PrevChartClose from "./PrevChartClose";
import PrevChartHigh from "./PrevChartHigh";
import PrevChartLow from "./PrevChartLow";
import PrevChartVolume from "./PrevChartVolume";
import Prev from "../prev/page";
export function TabsDemo(props:any) {
  const tabs = [
    {
      title: "Closing Price",
      value: "close",
      content: (
        <div className="w-full overflow-hidden relative h-[700px] rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-zinc-900">
          <p>Closing Price</p>
          <PrevChartClose symbol={props.symbol}/>
        </div>
      ),
    },
    {
      title: "Opening Price",
      value: "open",
      content: (
        <div className="w-full overflow-hidden relative h-[700px] rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-zinc-900">
          <p>Opening Price</p>
          <PrevChartOpen symbol={props.symbol}/>
        </div>
      ),
    },
    {
      title: "High",
      value: "high",
      content: (
        <div className="w-full overflow-hidden relative h-[700px] rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-zinc-900">
          <p>High</p>
          <PrevChartHigh symbol={props.symbol}/>
        </div>
      ),
    },
    {
      title: "Low",
      value: "low",
      content: (
        <div className="w-full overflow-hidden relative h-[700px] rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-zinc-900">
          <p>Low</p>
          <PrevChartLow symbol={props.symbol}/>
        </div>
      ),
    },
    {
      title: "Volume",
      value: "volume",
      content: (
        <div className="w-full overflow-hidden relative h-[700px] rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-zinc-900">
          <p>Volume</p>
          <PrevChartVolume symbol={props.symbol}/>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  );
}


