'use client';

import axios from 'axios';
import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@/store/store';
import { setUser } from '@/store/slices/authSlice';
import {
  logOutWatchlists,
  setWatchlists,
} from '@/store/slices/watchlistsSlice';
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
  const user = useSelector((state: RootState) => state.auth.user);

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

  useEffect(() => {
    const fetchWatchlists = async () => {
      if (user) {
        try {
          const { data: watchlists } = await axios.get(
            `/api/users/${user.uid}/watchlists`
          );
          dispatch(setWatchlists(watchlists));
        } catch (error) {
          console.log(error);
        }
      } else {
        dispatch(logOutWatchlists());
      }
    };

    fetchWatchlists();
  }, [user, dispatch]);

  return <>{children}</>;
}
