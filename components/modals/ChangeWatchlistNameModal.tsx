import axios from 'axios';
import { useFormik } from 'formik';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { changeWatchlistName } from '@/store/slices/watchlistsSlice';
import { closeModal } from '@/store/slices/modalSlice';
import { validateChangeWatchlistName } from '@/util/formValidation';
import TextInput from '../UI/TextInput';
import Button from '../UI/Button';
import InputFeedback from '../UI/InputFeedback';

export default function ChangeWatchlistNameModal() {
  const pathname = usePathname();
  const watchlistId = pathname.split('/')[2];

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validate: validateChangeWatchlistName,
    onSubmit: async (values) => {
      await axios.put(`/api/watchlists/${watchlistId}`, {
        name: values.name,
      });

      dispatch(changeWatchlistName({ watchlistId, name: values.name }));
      dispatch(closeModal());
    },
  });

  return (
    <>
      <h2 className='mb-4 text-3xl font-semibold text-white'>Change Name</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='mb-8 md:mb-9'>
          <TextInput
            id='name'
            name='name'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder='New name'
          />
          {formik.touched.name && formik.errors.name && (
            <InputFeedback state='error'>{formik.errors.name}</InputFeedback>
          )}
        </div>
        <Button type='submit' hierarchy='tertiary' classes='w-full'>
          Confirm
        </Button>
      </form>
    </>
  );
}
