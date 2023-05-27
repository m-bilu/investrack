'use client';

import { List } from 'react-feather';
import Button from '@/components/UI/Button';
import { COLORS } from '@/constants/colors';

export default function MobileButtons() {
  return (
    <section className='mb-14 xl:mt-12 xl:hidden 2xl:mb-18'>
      <Button
        type='onClick'
        onClick={() => {}}
        hierarchy='secondary'
        icon={<List color={COLORS.lightGrey} size={20} />}
        classes='w-full'
      >
        Add to Watchlist
      </Button>
    </section>
  );
}
