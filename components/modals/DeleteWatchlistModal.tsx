import axios from 'axios';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/store/slices/modalSlice';
import { deleteWatchlist } from '@/store/slices/watchlistsSlice';
import Button from '../UI/Button';

export default function DeleteWatchlistModal() {
  const router = useRouter();
  const pathname = usePathname();
  const watchlistId = pathname.split('/')[2];

  const dispatch = useDispatch();

  const handleConfirm = async () => {
    await axios.delete(`/api/watchlists/${watchlistId}`);
    dispatch(deleteWatchlist(watchlistId));
    dispatch(closeModal());
    router.push('/');
  };

  return (
    <>
      <h2 className='mb-3 text-3xl font-semibold text-white'>
        Delete Watchlist
      </h2>
      <p className='mb-8 text-base text-blue1'>
        Are you sure you want to delete this watchlist?
      </p>
      <div className='flex flex-col gap-4'>
        <Button type='onClick' onClick={handleConfirm} hierarchy='tertiary'>
          Confirm
        </Button>
        <Button
          type='onClick'
          onClick={() => dispatch(closeModal())}
          hierarchy='quaternary'
        >
          Cancel
        </Button>
      </div>
    </>
  );
}
