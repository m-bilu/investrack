'use client';

import { useState } from 'react';
import useSearchResults from '@/hooks/useSearchResults';
import SearchBar from '@/components/UI/SearchBar';
import SearchResults from '@/components/UI/SearchResults';

export default function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { loading, error, searchResults } = useSearchResults(searchValue);

  return (
    <section className='relative z-10 mb-20 2xl:mb-24'>
      <h1 className='mx-auto mb-8 max-w-[353px] text-center text-4xl font-semibold 2xl:max-w-[457px] 2xl:text-6xl'>
        <span className='bg-gradient text-gradient'>
          Research the markets with Investrack.
        </span>
      </h1>

      <div className='relative mx-auto max-w-[560px]'>
        <SearchBar
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          onFocus={() => setShowSearchResults(true)}
          onBlur={() =>
            setTimeout(() => {
              setShowSearchResults(false);
            }, 200)
          }
          placeholder='Search for stocks...'
        />
        <SearchResults
          showSearchResults={showSearchResults}
          searchValue={searchValue}
          searchResults={searchResults}
          loading={loading}
          error={error}
          position='top-[calc(100%+24px)]'
          maxHeight='max-h-[300px]'
        />
      </div>
    </section>
  );
}
