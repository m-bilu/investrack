import { NewsType } from '@/constants/types';

export default function NewsCard({ headline, summary, image, url }: NewsType) {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className='transition-300 w-[260px] overflow-hidden rounded-lg border border-grey bg-darkerGrey hover:bg-darkGrey 2xl:w-[320px]'
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={headline}
        width={300}
        height={150}
        className='aspect-[2/1] w-full object-cover'
      />
      <div className='whitespace-normal px-4 pb-6 pt-3 2xl:px-5 2xl:pb-7 2xl:pt-4'>
        <h3
          className={`line-clamp-2 text-base font-medium text-white 2xl:text-lg ${
            summary ? 'mb-2' : ''
          }`}
        >
          {headline}
        </h3>
        <p className='line-clamp-3 text-sm text-lightGrey 2xl:text-base'>
          {summary}
        </p>
      </div>
    </a>
  );
}
