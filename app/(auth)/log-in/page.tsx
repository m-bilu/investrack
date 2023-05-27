'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import { logIn, logInWithGoogle } from '@/util/firebase/auth';
import TextInput from '@/components/UI/TextInput';
import Button from '@/components/UI/Button';
import InputFeedback from '@/components/UI/InputFeedback';
import { validateLogIn } from '@/util/formValidation';
import { Eye, EyeOff } from 'react-feather';
import { FcGoogle } from 'react-icons/fc';
import { COLORS } from '@/constants/colors';

export default function LogInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isOtherError, setIsOtherError] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validateLogIn,
    onSubmit: async (values) => {
      setIsOtherError(false);
      try {
        await logIn(values.email, values.password);
      } catch (error: any) {
        const errorCode = error?.code;
        switch (errorCode) {
          case 'auth/wrong-password':
            formik.setFieldError(
              'password',
              'Incorrect password. Please try again.'
            );
            break;
          case 'auth/invalid-email':
            formik.setFieldError('email', 'Invalid email. Please try again.');
            break;
          case 'auth/user-not-found':
            formik.setFieldError('email', 'User not found. Please sign up.');
            break;
          default:
            setIsOtherError(true);
            formik.setFieldError(
              'password',
              'Something went wrong. Please try again.'
            );
            break;
        }
      }
    },
  });

  return (
    <>
      <h1 className='mb-5 text-center text-5xl font-semibold xl:text-6xl'>
        <span className='text-gradient bg-gradient'>Log In</span>
      </h1>
      <p className='mb-9 text-center text-white'>
        Don&apos;t have an account?{' '}
        <Link href='/sign-up' className='text-gradient bg-gradient'>
          Sign Up.
        </Link>
      </p>

      <form onSubmit={formik.handleSubmit} className='flex flex-col'>
        <div className='mb-5'>
          <TextInput
            id='email'
            name='email'
            type='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder='Email'
          />
          {formik.errors.email && formik.touched.email && (
            <InputFeedback state='error'>{formik.errors.email}</InputFeedback>
          )}
        </div>

        <div className='mb-6'>
          <TextInput
            id='password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder='Password'
            icon={
              showPassword ? (
                <EyeOff color={COLORS.lightGrey} size={24} />
              ) : (
                <Eye color={COLORS.lightGrey} size={24} />
              )
            }
            iconOnClick={() =>
              setShowPassword((preShowPassword) => !preShowPassword)
            }
          />
          {((formik.errors.password && formik.touched.password) ||
            isOtherError) && (
            <InputFeedback state='error'>
              {formik.errors.password}
            </InputFeedback>
          )}
        </div>

        <Link href='/forgot-password' className='mb-12 self-end text-white'>
          Forgot Password
        </Link>

        <Button type='submit' hierarchy='primary' classes='mb-5'>
          Log In
        </Button>

        <Button type='onClick' onClick={logInWithGoogle} hierarchy='secondary'>
          Log in with Google
          <FcGoogle className='absolute right-5 top-1/2 h-6 w-6 -translate-y-1/2' />
        </Button>
      </form>
    </>
  );
}
