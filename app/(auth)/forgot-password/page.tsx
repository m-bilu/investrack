'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import { resetPassword } from '@/util/firebase/auth';
import TextInput from '@/components/UI/TextInput';
import InputFeedback from '@/components/UI/InputFeedback';
import Button from '@/components/UI/Button';
import { validateForgotPassword } from '@/util/formValidation';

export default function ForgotPasswordForm() {
  const [emailSent, setEmailSent] = useState(false);
  const [isOtherError, setIsOtherError] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: validateForgotPassword,
    onSubmit: async (values) => {
      try {
        await resetPassword(values.email);
        setEmailSent(true);
      } catch (error: any) {
        const errorCode = error.code;

        switch (errorCode) {
          case 'auth/user-not-found':
            formik.setFieldError('email', 'Email not found. Please try again.');
            break;
          case 'auth/invalid-email':
            formik.setFieldError('email', 'Invalid email. Please try again.');
            break;
          default:
            setIsOtherError(true);
            formik.setFieldError(
              'email',
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
        <span className='text-gradient bg-gradient'>Forgot Password</span>
      </h1>
      <p className='mb-9 text-center text-white'>
        We will send a reset link to your email.
      </p>
      <form onSubmit={formik.handleSubmit} className='flex flex-col'>
        <TextInput
          id='email'
          name='email'
          type='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder='Email'
        />

        {emailSent && (
          <InputFeedback state='success'>Email sent!</InputFeedback>
        )}
        {((formik.touched.email && formik.errors.email) || isOtherError) && (
          <InputFeedback state='error'>{formik.errors.email}</InputFeedback>
        )}

        <Button type='submit' hierarchy='primary' classes='mb-5 mt-12'>
          Get Reset Link
        </Button>
      </form>
    </>
  );
}
