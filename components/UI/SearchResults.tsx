'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import LoadingSpinner from './LoadingSpinner';
import { SearchResultType } from '@/constants/types';

type SearchResultsProps = {
  showSearchResults: boolean;
  searchValue: string;
  searchResults: SearchResultType[];
  loading: boolean;
  error: boolean;
  position: string;
  maxHeight: string;
};

export default function SearchResults({
  showSearchResults,
  searchValue,
  searchResults,
  loading,
  error,
  position,
  maxHeight,
}: SearchResultsProps) {
  let state = '';

  if (loading) {
    state = 'loading';
  } else if (error) {
    state = 'error';
  } else if (!searchValue || searchResults.length !== 0) {
    state = 'results';
  } else {
    state = 'no-results';
  }

  return (
    <div
      className={`transition-300 no-scrollbar absolute w-full overflow-hidden overflow-y-scroll overscroll-contain rounded-xl border border-grey bg-black ${position} ${maxHeight} ${
        showSearchResults
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      {state === 'loading' && <LoadingSpinner classes='my-6' />}
      {state === 'error' && (
        <p className='p-4 text-white'>
          An error occured. Please try again later.
        </p>
      )}
      {state === 'no-results' && (
        <p className='p-4 text-white'>No results found.</p>
      )}
      {state === 'results' && (
        <>
          {searchResults.map((result, i) => (
            <Fragment key={`result-${i}`}>
              <Link
                href={`/stock/${result.symbol}`}
                className='transition-300 flex items-center justify-between p-4 hover:bg-darkGrey'
              >
                <div>
                  <p className='mb-1 text-base font-semibold text-white xl:text-lg'>
                    {result.symbol}
                  </p>
                  <p className='text-sm font-medium text-blue1 xl:text-base'>
                    {result.name}
                  </p>
                </div>

                <p className='text-sm text-blue1 xl:text-base'>
                  {result.exchange}
                </p>
              </Link>

              {i !== searchResults.length - 1 && <hr className='border-grey' />}
            </Fragment>
          ))}

          {searchResults.length > 3 ? (
            <div className='pointer-events-none sticky inset-x-0 bottom-0 -mt-8 h-10 bg-gradient-to-t from-black to-transparent' />
          ) : null}
        </>
      )}
    </div>
  );
}
