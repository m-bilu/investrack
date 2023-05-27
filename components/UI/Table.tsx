'use client';

import { getHiddenClasses } from '@/util/helpers';
import { extractDomain } from '@/util/helpers';
import { TableItemType } from '@/constants/types';

type TableProps = {
  items: TableItemType[];
};

export default function Table({ items }: TableProps) {
  return (
    <div className='grid gap-x-8 sm:grid-cols-2 lg:gap-x-12 2xl:grid-cols-3'>
      {items.map((item, i) => (
        <div key={`item-${i}`}>
          <div className='flex justify-between'>
            <p className='text-base text-blue1'>{item[0]}</p>
            {typeof item[1] === 'number' ||
            (!item[1].includes('www') && !item[1].includes('http')) ? (
              <p className='text-base font-medium text-white'>{item[1]}</p>
            ) : (
              <a
                href={item[1]}
                target='_blank'
                rel='noreferrer noopener'
                className='text-base font-medium text-white'
              >
                {extractDomain(item[1])}
              </a>
            )}
          </div>

          <hr
            className={`my-5 border-grey border-opacity-40 ${getHiddenClasses(
              i,
              items.length
            )}`}
          />
        </div>
      ))}
    </div>
  );
}
