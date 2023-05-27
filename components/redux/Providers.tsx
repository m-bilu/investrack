'use client';

import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@/store/store';
import { setUser } from '@/store/slices/authSlice';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StateWrapper>{children}</StateWrapper>
    </Provider>
  );
}

function StateWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            provider: user.providerData[0].providerId,
          })
        );
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}
