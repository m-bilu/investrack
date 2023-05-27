'use client';

import IconButton from '@/components/UI/IconButton';
import { List } from 'react-feather';
import { COLORS } from '@/constants/colors';

type IntroductionProps = {
  name: string;
  symbol: string;
  exchange: string;
};

export default function Introduction({
  name,
  symbol,
  exchange,
}: IntroductionProps) {
  return (
    <section className='mb-4 2xl:mb-9'>
      <div className='mb-7 items-center justify-between xl:flex 2xl:mb-9'>
        <div>
          <h1 className='mb-3 text-4xl font-semibold text-white 2xl:text-5xl'>
            {name}
          </h1>
          <p className='text-lg text-lightGrey 2xl:text-xl'>
            {symbol} | {exchange}
          </p>
        </div>

        <div className='hidden gap-6 xl:flex'>
          <IconButton
            icon={<List width={20} height={20} color={COLORS.lightGrey} />}
            onClick={() => {}}
          >
            Add to Watchlist
          </IconButton>
        </div>
      </div>

      <hr className='border-grey' />
    </section>
  );
}
