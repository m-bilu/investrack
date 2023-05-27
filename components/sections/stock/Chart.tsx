'use client';

import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { createChart, ColorType } from 'lightweight-charts';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import { ChevronUp, ChevronDown } from 'react-feather';
import { COLORS } from '@/constants/colors';
import { PERIODS, INTERVALS } from '@/constants/data';

type ChartProps = {
  price: number;
  change: number;
  changePercent: number;
};

export default function Chart({ price, change, changePercent }: ChartProps) {
  const { symbol } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [periodIdx, setPeriodIdx] = useState(0);
  const [priceHistory, setPriceHistory] = useState<any>([]);

  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const { data } = await axios.get(
          `/api/stocks/history?symbol=${symbol}&period=${PERIODS[periodIdx].value}&interval=${INTERVALS[periodIdx]}`
        );
        setPriceHistory(data);
      } catch (error) {
        setError(true);
        console.error(error);
      }
      setLoading(false);
    };

    setLoading(true);
    fetchData();
  }, [symbol, periodIdx]);

  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current)
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    if (!chartContainerRef.current) return;
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: COLORS.black },
        textColor: COLORS.white,
      },
      grid: {
        vertLines: {
          color: COLORS.black,
        },
        horzLines: {
          color: COLORS.black,
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });
    const timeScale = chart.timeScale();
    timeScale.fitContent();
    timeScale.applyOptions({
      timeVisible: true,
      secondsVisible: false,
    });
    timeScale.applyOptions({
      borderColor: COLORS.black,
    });

    const newSeries = chart.addAreaSeries({
      lineColor: COLORS.lightGrey,
      topColor: COLORS.grey,
      bottomColor: COLORS.darkerGrey,
    });
    newSeries.setData(priceHistory);
    newSeries.priceScale().applyOptions({
      borderColor: COLORS.black,
    });

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [priceHistory]);

  const periodSelector = (
    <div className='flex justify-between gap-4'>
      {PERIODS.map((period, i) => (
        <div
          onClick={() => setPeriodIdx(i)}
          className={`transition-300 cursor-pointer rounded-xs px-2 py-1 hover:bg-darkGrey ${
            periodIdx === i ? 'bg-darkGrey' : ''
          }`}
          key={period.label}
        >
          <p className='text-blue1'>{period.label}</p>
        </div>
      ))}
    </div>
  );

  return (
    <section className='mb-14 2xl:mb-18'>
      <div className='md:flex md:items-center md:justify-between'>
        <div className='flex items-center justify-between md:justify-start md:gap-6'>
          <p className='text-5xl font-medium text-white 2xs:text-6xl xs:text-8xl'>
            ${price}
          </p>
          <div className='flex items-center gap-2'>
            {change >= 0 ? (
              <ChevronUp color={COLORS.green} width={24} height={24} />
            ) : (
              <ChevronDown color={COLORS.red} width={24} height={24} />
            )}
            <p
              className={`texl-lg 2xs:text-xl ${
                change >= 0 ? 'text-green' : 'text-red'
              }`}
            >
              {change} ({changePercent}%)
            </p>
          </div>
        </div>
        <div className='hidden xl:block'>{periodSelector}</div>
      </div>
      {error ? (
        <p className='my-24 text-center text-white'>
          Error loading chart. Please try again later.
        </p>
      ) : loading ? (
        <LoadingSpinner classes='h-[400px]' />
      ) : (
        <div ref={chartContainerRef} />
      )}
      <div className='mt-6 xl:hidden'>{periodSelector}</div>
    </section>
  );
}
