'use client';

import axios from 'axios';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { closeModal } from '@/store/slices/modalSlice';
import { addWatchlist } from '@/store/slices/watchlistsSlice';
import { validateCreateWatchlist } from '@/util/formValidation';
import TextInput from '../UI/TextInput';
import Button from '../UI/Button';

export default function CreateWatchlistModal() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validate: validateCreateWatchlist,
    onSubmit: async (values) => {
      if (!user) return;
      const { data: watchlist } = await axios.post(
        `/api/users/${user.uid}/watchlists`,
        {
          name: values.name,
        }
      );
      dispatch(addWatchlist(watchlist));
      dispatch(closeModal());
    },
  });

  return (
    <>
      <h2 className='mb-4 text-3xl font-semibold text-white'>
        Create Watchlist
      </h2>
      <form onSubmit={formik.handleSubmit} className='flex flex-col gap-8'>
        <TextInput
          id='name'
          name='name'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder='Watchlist Name'
        />
        <Button type='submit' hierarchy='tertiary' classes='w-full'>
          Confirm
        </Button>
      </form>
    </>
  );
}
