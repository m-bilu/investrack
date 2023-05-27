'use client';

import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { openModal } from '@/store/slices/modalSlice';
import { removeStockFromWatchlist } from '@/store/slices/watchlistsSlice';
import IconButton from '@/components/UI/IconButton';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import { Edit, Trash, ChevronUp, ChevronDown, X } from 'react-feather';
import { COLORS } from '@/constants/colors';

export default function WatchlistPage({
  params,
}: {
  params: { watchlistId: string };
}) {
  const { watchlistId } = params;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [watchlistStocksChange, setWatchlistsStockChange] = useState([]);

  const dispatch = useDispatch();
  const watchlist = useSelector((state: RootState) =>
    state.watchlists.watchlists.find(
      (watchlist) => watchlist._id === watchlistId
    )
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (watchlist && watchlist.stocks) {
          const promises = watchlist.stocks.map(async (symbol) => {
            const response = await fetch(
              `/api/stocks/change?symbol=${symbol}`,
              {
                next: {
                  revalidate: 10,
                },
              }
            );
            return await response.json();
          });
          const data: any = await Promise.all(promises);
          setWatchlistsStockChange(data);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [watchlist]);

  const handleRemoveStock = async (event: any, symbol: string) => {
    event.preventDefault();
    await axios.delete(`/api/watchlists/${watchlistId}/stocks/${symbol}`);
    dispatch(removeStockFromWatchlist({ watchlistId, symbol }));
  };

  if (!watchlist) return <LoadingSpinner />;

  return (
    <section className='max-w-[620px]'>
      <div className='mb-6 flex items-center justify-between gap-6 2xl:mb-8'>
        <h1 className='text-3xl font-semibold text-white 2xl:text-4xl'>
          {watchlist.name}
        </h1>

        <div className='flex gap-2 sm:gap-4'>
          <IconButton
            icon={<Edit width={20} height={20} color={COLORS.lightGrey} />}
            onClick={() => dispatch(openModal('changeWatchlistName'))}
          />
          <IconButton
            icon={<Trash width={20} height={20} color={COLORS.lightGrey} />}
            onClick={() => dispatch(openModal('deleteWatchlist'))}
          />
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className='text-white text-lg'>
          An error has occured. Please try again later.
        </p>
      ) : (
        <div>
          {watchlistStocksChange.map((stock: any, i) => (
            <Fragment key={stock.symbol}>
              <Link
                href={`/stock/${stock.symbol}`}
                className={`transition-300 grid grid-cols-[8fr_2fr_4fr_1fr] items-center gap-4 py-4 xs:px-4 xs:hover:bg-darkGrey 
              ${i === 0 ? 'rounded-t-sm' : ''} 
              ${i === watchlistStocksChange.length - 1 ? 'rounded-b-sm' : ''}`}
              >
                <div className='flex flex-col gap-1.5 xl:flex-row-reverse xl:items-center xl:gap-0 xl:justify-self-start'>
                  <p className='line-clamp-1 text-base font-medium text-white'>
                    {stock.name}
                  </p>
                  <p className='text-sm text-blue1 xl:w-16'>{stock.symbol}</p>
                </div>

                <p className='justify-self-end text-base font-medium text-white'>
                  {stock.price}
                </p>

                <div className='flex items-center gap-1 xs:gap-1.5'>
                  {stock.change > 0 ? (
                    <ChevronUp size={20} color={COLORS.green} />
                  ) : (
                    <ChevronDown size={20} color={COLORS.red} />
                  )}

                  <p
                    className={`whitespace-nowrap text-base ${
                      stock.change > 0 ? 'text-green' : 'text-red'
                    }`}
                  >
                    {stock.change} ({stock.changePercent}%)
                  </p>
                </div>

                <div
                  onClick={(event) => handleRemoveStock(event, stock.symbol)}
                  className='transition-300 -m-2 justify-self-end rounded-full border border-transparent p-2 hover:border-grey'
                >
                  <X size={20} color={COLORS.lightGrey} />
                </div>
              </Link>

              {i !== watchlistStocksChange.length - 1 && (
                <div className='border-b border-grey' />
              )}
            </Fragment>
          ))}
        </div>
      )}
    </section>
  );
}
