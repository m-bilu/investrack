'use client';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { closeModal } from '@/store/slices/modalSlice';
import AccountRequiredModal from './AccountRequiredModal';
import CreateWatchlistModal from './CreateWatchlistModal';
import ChangeWatchlistNameModal from './ChangeWatchlistNameModal';
import DeleteWatchlistModal from './DeleteWatchlistModal';
import AddToWatchlistModal from './AddToWatchlistModal';
import { XCircle } from 'react-feather';
import { COLORS } from '@/constants/colors';

export default function Modal() {
  const dispatch: AppDispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal.content);

  return (
    <div
      onClick={() => dispatch(closeModal())}
      className={`transition-300 fixed inset-0 z-50 bg-black  ${
        modal
          ? 'pointer-events-auto bg-opacity-80'
          : 'pointer-events-none bg-opacity-0'
      }`}
    >
      <div
        className={`absolute left-1/2 top-1/2 w-[min(440px,100%-40px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-darkGrey px-5 pb-7 pt-6 md:px-6 md:pb-8 md:pt-7 ${
          modal ? 'block' : 'hidden'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        {modal === 'accountRequired' && <AccountRequiredModal />}
        {modal === 'createWatchlist' && <CreateWatchlistModal />}
        {modal === 'changeWatchlistName' && <ChangeWatchlistNameModal />}
        {modal === 'deleteWatchlist' && <DeleteWatchlistModal />}
        {modal === 'addToWatchlist' && <AddToWatchlistModal />}

        <XCircle
          size={32}
          fill={COLORS.blue1}
          stroke={COLORS.darkGrey}
          onClick={() => dispatch(closeModal())}
          className='transition-300 absolute right-4 top-4 cursor-pointer hover:scale-105'
        />
      </div>
    </div>
  );
}
