import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';
import { Button } from '@/components/ui/button';
import axios from 'axios';

// Register Chart.js components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
  zoomPlugin
);

const FutureChart = ({ symbol, data }) => {
  // console.log(data)
  const [timeRange, setTimeRange] = useState('1D');
  const [predictions, setPredictions] = useState<number[]>([]);
  const [error, setError] = useState<string>("");
  const [dates,setDates] = useState<string[]>([]);
  const [period1, setPeriod1] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Default to 1 day back
    return formatDate(today);
  });
  const period2 = formatDate(new Date());
  console.log(predictions)
  // Time range options
  const timeRanges = [
    { label: '1D', days: 1 },
    { label: '5D', days: 5 },
    { label: '1M', months: 1 },
    { label: '3M', months: 3 },
    { label: '6M', months: 6 },
    { label: '1Y', months: 12 },
  ];

  // Format date as 'YYYY-MM-DD'
  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  const sendDataToBackend = async (volumePrices: number[]) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict_next",
        {
            ticker: symbol,
            features: Array.isArray(data) ? data.map((item) => item.volume) : [],
            type: "volume",
            time_horizon:timeRange
        }
      );
      setDates(response.data.dates)
      setPredictions(response.data.predictions);
    } catch (err: any) {
      setError("Failed to get predictions from the backend.");
    }
  };
  
  // console.log(data)
  useEffect(() => {
    const volumePrices = data.map((entry) => entry.volume).slice(-60);
    // console.log(lowPrices)
    sendDataToBackend(volumePrices);
  }, [data,timeRange])

  const handleTimeRangeChange = (range) => {
    setTimeRange(range.label);

    const startDate = new Date(period2);
    if (range.days) {
      startDate.setDate(startDate.getDate() - range.days);
    } else if (range.months) {
      startDate.setMonth(startDate.getMonth() - range.months);
    }
    setPeriod1(formatDate(startDate));
  };

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'volume',
        data: predictions,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: timeRange === '1D' ? 'hour' : 'day',
        },
      },
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      legend: {
        display: true,
        position: 'top',
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
      },
    },
  };

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Line data={chartData} options={options} />
      <div className="flex gap-2 flex-wrap justify-center mt-4">
        {timeRanges.map((range) => (
          <Button
            key={range.label}
            variant={timeRange === range.label ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => handleTimeRangeChange(range)}
          >
            {range.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FutureChart;
