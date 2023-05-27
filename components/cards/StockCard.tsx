'use client';

import Link from 'next/link';

type StockCardProps = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
};

export default function StockCard({
  symbol,
  name,
  price,
  change,
  changePercent,
}: StockCardProps) {
  return (
    <Link
      href={`/stock/${symbol}`}
      className='transition-300 flex flex-col gap-1 rounded-sm border border-grey bg-darkerGrey p-3 hover:bg-darkGrey'
    >
      <div className='flex justify-between gap-6'>
        <p className='text-base font-medium text-white'>{name}</p>
        <p className='text-base font-medium text-white'>{price}</p>
      </div>
      <div className='flex justify-between gap-6'>
        <p className='text-lightGrey'>{symbol}</p>
        <p className={`${change >= 0 ? 'text-green' : 'text-red'}`}>
          {change} ({changePercent})%
        </p>
      </div>
    </Link>
  );
}
