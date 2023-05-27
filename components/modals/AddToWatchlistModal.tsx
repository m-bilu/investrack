'use client';

import axios from 'axios';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addStockToWatchlists } from '@/store/slices/watchlistsSlice';
import { closeModal } from '@/store/slices/modalSlice';
import Button from '../UI/Button';

export default function AddToWatchlistModal() {
  const pathname = usePathname();
  const symbol = pathname.split('/')[2];

  const [selectedWatchlistIds, setSelectedWatchlistIds] = useState<string[]>(
    []
  );

  const dispatch = useDispatch();
  const watchlists = useSelector(
    (state: RootState) => state.watchlists.watchlists
  );

  const handleSelect = (event: any, watchlistId: string) => {
    if (event.target.checked) {
      setSelectedWatchlistIds((prevState) => [...prevState, watchlistId]);
    } else {
      setSelectedWatchlistIds((prevState) =>
        prevState.filter((id) => id !== watchlistId)
      );
    }
  };

  const handleConfirm = async () => {
    await axios.post(`/api/watchlists/stock/${symbol}`, {
      watchlistIds: selectedWatchlistIds,
    });

    dispatch(
      addStockToWatchlists({ symbol, watchlistIds: selectedWatchlistIds })
    );
    dispatch(closeModal());
  };

  return (
    <>
      <h2 className='mb-6 text-3xl font-semibold text-white'>
        Add to Watchlist
      </h2>
      <div className='mb-8 flex flex-col gap-7 md:mb-10'>
        {watchlists.length > 0 ? (
          watchlists.map((watchlist) => (
            <label
              htmlFor={watchlist._id}
              className='flex cursor-pointer items-center justify-start gap-4'
              key={watchlist._id}
            >
              <input
                id={watchlist._id}
                type='checkbox'
                onChange={(event) => handleSelect(event, watchlist._id)}
                className='transition-300 rounded h-5 w-5 cursor-pointer appearance-none rounded-2xs border border-white bg-darkerGrey checked:bg-white focus:ring-1 focus:ring-grey'
              />
              <p className='text-base text-white'>{watchlist.name}</p>
            </label>
          ))
        ) : (
          <p className='text-base text-white'>
            You don&apos;t have any watchlists yet.
          </p>
        )}
      </div>
      {watchlists.length > 0 ? (
        <Button
          type='onClick'
          onClick={handleConfirm}
          hierarchy='tertiary'
          classes='w-full'
        >
          Confirm
        </Button>
      ) : (
        <Button
          type='onClick'
          onClick={() => dispatch(closeModal())}
          hierarchy='tertiary'
          classes='w-full'
        >
          OK
        </Button>
      )}
    </>
  );
}
