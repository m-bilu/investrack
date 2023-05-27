'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import { signUp, logInWithGoogle } from '@/util/firebase/auth';
import TextInput from '@/components/UI/TextInput';
import Button from '@/components/UI/Button';
import InputFeedback from '@/components/UI/InputFeedback';
import { validateSignUp } from '@/util/formValidation';
import { Eye, EyeOff } from 'react-feather';
import { FcGoogle } from 'react-icons/fc';
import { COLORS } from '@/constants/colors';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOtherError, setIsOtherError] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: validateSignUp,
    onSubmit: async (values) => {
      setIsOtherError(false);
      try {
        await signUp(values.name, values.email, values.password);
      } catch (error: any) {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/email-already-in-use':
            formik.setFieldError(
              'email',
              'Email already in use. Please try again.'
            );
            break;
          case 'auth/invalid-email':
            formik.setFieldError('email', 'Invalid email. Please try again.');
            break;
          case 'auth/weak-password':
            formik.setFieldError(
              'confirmPassword',
              'Password must be at least 6 characters long. Please try again.'
            );
            break;
          default:
            setIsOtherError(true);
            formik.setFieldError(
              'confirmPassword',
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
        <span className='text-gradient bg-gradient'>Sign Up</span>
      </h1>

      <p className='mb-9 text-center text-white'>
        Already have an account?{' '}
        <Link href='/log-in' className='text-gradient bg-gradient'>
          Log In.
        </Link>
      </p>

      <form onSubmit={formik.handleSubmit} className='flex flex-col'>
        <div className='mb-5'>
          <TextInput
            id='name'
            name='name'
            type='name'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder='Name'
          />
          {formik.errors.name && formik.touched.name && (
            <InputFeedback state='error'>{formik.errors.name}</InputFeedback>
          )}
        </div>

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

        <div className='mb-5'>
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
                <EyeOff color={COLORS.lightGrey} width={24} height={24} />
              ) : (
                <Eye color={COLORS.lightGrey} />
              )
            }
            iconOnClick={() =>
              setShowPassword((prevShowPassword) => !prevShowPassword)
            }
          />
          {formik.errors.password && formik.touched.password && (
            <InputFeedback state='error'>
              {formik.errors.password}
            </InputFeedback>
          )}
        </div>

        <div className='mb-16'>
          <TextInput
            id='confirmPassword'
            name='confirmPassword'
            type={showConfirmPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            placeholder='Confirm Password'
            icon={
              showConfirmPassword ? (
                <EyeOff color={COLORS.lightGrey} width={24} height={24} />
              ) : (
                <Eye color={COLORS.lightGrey} />
              )
            }
            iconOnClick={() =>
              setShowConfirmPassword(
                (prevShowConfirmPassword) => !prevShowConfirmPassword
              )
            }
          />
          {((formik.errors.confirmPassword && formik.touched.confirmPassword) ||
            isOtherError) && (
            <InputFeedback state='error'>
              {formik.errors.confirmPassword}
            </InputFeedback>
          )}
        </div>

        <Button type='submit' hierarchy='primary' classes='mb-5'>
          Sign Up
        </Button>

        <Button type='onClick' onClick={logInWithGoogle} hierarchy='secondary'>
          Sign up with Google
          <FcGoogle className='absolute right-5 top-1/2 h-6 w-6 -translate-y-1/2' />
        </Button>
      </form>
    </>
  );
}
