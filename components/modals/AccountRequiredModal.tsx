'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/store/slices/modalSlice';
import Button from '@/components/UI/Button';

export default function AccountRequiredModal() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = (path: string) => {
    dispatch(closeModal());
    router.push(path);
  };

  return (
    <>
      <h2 className='mb-3 text-3xl font-semibold text-white'>
        Account Required
      </h2>
      <p className='mb-6 text-base text-blue1 md:mb-8'>
        Create an account to create watchlists.
      </p>
      <div className='flex flex-col gap-5'>
        <Button
          type='onClick'
          onClick={() => handleClick('/sign-up')}
          hierarchy='tertiary'
          classes='w-full'
        >
          Sign Up
        </Button>
        <Button
          type='onClick'
          onClick={() => handleClick('/log-in')}
          hierarchy='quaternary'
          classes='w-full'
        >
          Log In
        </Button>
      </div>
    </>
  );
}
