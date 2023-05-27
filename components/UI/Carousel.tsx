'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { COLORS } from '@/constants/colors';

type CarouselProps = {
  children: React.ReactNode[];
};

export default function Carousel({ children }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) carouselRef.current.scrollLeft -= 250;
  };

  const scrollRight = () => {
    if (carouselRef.current) carouselRef.current.scrollLeft += 250;
  };

  return (
    <div className='relative'>
      <div
        ref={carouselRef}
        className='no-scrollbar relative flex gap-6 overflow-x-scroll scroll-smooth whitespace-nowrap pr-[10%]'
      >
        {children.map((child, i) => (
          <div className='inline-flex self-stretch' key={`child-${i}`}>
            {child}
          </div>
        ))}
      </div>

      <div className='pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-black to-transparent'></div>

      <div
        onClick={scrollLeft}
        className='transition-300 absolute -left-4 top-1/2 hidden -translate-y-1/2 cursor-pointer rounded-full bg-darkGrey p-2.5 opacity-60 hover:opacity-100 md:block 2xl:-left-8 3xl:-left-16 4xl:-left-24'
      >
        <ChevronLeft color={COLORS.lightGrey} size={32} className='-ml-0.5' />
      </div>

      <div
        onClick={scrollRight}
        className='transition-300 absolute -right-4 top-1/2 hidden -translate-y-1/2 cursor-pointer rounded-full bg-darkGrey p-2.5 opacity-60 hover:opacity-100 md:block 2xl:-right-8 3xl:-right-16 4xl:-right-24'
      >
        <ChevronRight color={COLORS.lightGrey} size={32} className='-mr-0.5' />
      </div>
    </div>
  );
}
