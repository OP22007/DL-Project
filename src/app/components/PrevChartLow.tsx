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

// Register the components and plugins
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

const PrevChart = ({ symbol }) => {
  const [data, setData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState('1D');
  const [period1, setPeriod1] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Subtract 1 day from today
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Ensure month is two digits
    const day = today.getDate().toString().padStart(2, '0'); // Ensure day is two digits
    return `${year}-${month}-${day}`; // Format as 'YYYY-MM-DD'
  });
  const period2 = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/finance?symbol=${symbol}&period1=${period1}&period2=${period2}`);
        let result = await response.json();
        if (Array.isArray(result)) {
          setData(result);
        } else {
          console.error('Unexpected response format:', result);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [symbol, period1]);

  const handleTimeRangeChange = (range: string) => {
    let startDate = new Date(period2); // Convert period2 to a Date object

    if (range === '1D') {
      startDate.setDate(startDate.getDate() - 1);
    } else if (range === '5D') {
      startDate.setDate(startDate.getDate() - 5);
    } else if (range === '1M') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (range === '3M') {
      startDate.setMonth(startDate.getMonth() - 3);
    } else if (range === '6M') {
      startDate.setMonth(startDate.getMonth() - 6);
    } else if (range === 'YTD') {
      startDate.setMonth(0);
      startDate.setDate(1);
    } else if (range === '1Y') {
      startDate.setFullYear(startDate.getFullYear() - 1);
    } else if (range === '2Y') {
      startDate.setFullYear(startDate.getFullYear() - 2);
    } else if (range === '5Y') {
      startDate.setFullYear(startDate.getFullYear() - 5);
    } else if (range === 'Max') {
      startDate = new Date('2000-01-01');
    }

    const year = startDate.getFullYear();
    const month = (startDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure month is two digits
    const day = startDate.getDate().toString().padStart(2, '0'); // Ensure day is two digits

    setPeriod1(`${year}-${month}-${day}`);
    setTimeRange(range); // Update the time range
  };

  const chartData = {
    labels: Array.isArray(data) ? data.map(item => item.date) : [],
    datasets: [
      {
        label: 'Low',
        data: Array.isArray(data) ? data.map(item => item.low) : [],
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
          onZoom: ({ chart }) => {
            const { min, max } = chart.scales.x;
            const duration = max - min;
            if (duration < 24 * 60 * 60 * 1000) {
              chart.options.scales.x.time.unit = 'minute';
            } else if (duration < 7 * 24 * 60 * 60 * 1000) {
              chart.options.scales.x.time.unit = 'hour';
            } else {
              chart.options.scales.x.time.unit = 'day';
            }
            chart.update();
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Line data={chartData} options={options} />
      <div className="flex gap-2 mt-4">
        {['1D', '5D', '1M', '3M', '6M', '1Y', '2Y', '5Y', 'Max'].map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? 'secondary' : 'outline'}
            size="sm"
            className="w-12"
            onClick={() => handleTimeRangeChange(range)}
          >
            {range}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PrevChart;
