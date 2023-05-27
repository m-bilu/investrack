'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { logOut } from '@/util/firebase/auth';
import { openModal } from '@/store/slices/modalSlice';
import { logOutWatchlists } from '@/store/slices/watchlistsSlice';
import MenuItem from './MenuItem';
import {
  Search,
  List,
  LogIn,
  LogOut,
  Plus,
  Settings,
  UserPlus,
} from 'react-feather';
import { COLORS } from '@/constants/colors';

export default function Menu() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const watchlistId = searchParams.get('watchlistId');

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isMobileMenuOpen = useSelector(
    (state: RootState) => state.mobileMenu.isOpen
  );
  const watchlists = useSelector(
    (state: RootState) => state.watchlists.watchlists
  );

  const handleCreate = (type: 'Watchlist' | 'Portfolio') => {
    if (user) {
      dispatch(openModal(`create${type}`));
    } else {
      dispatch(openModal('accountRequired'));
    }
  };

  const handleLogOut = async () => {
    await logOut();
    dispatch(logOutWatchlists());
    router.replace('/');
  };

  return (
    <nav
      className={`h-100dvh transition-300 fixed inset-0 z-30 flex w-full flex-col bg-darkerGrey px-5 pt-28 xl:w-[300px] xl:pt-32 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full xl:translate-x-0'
      }`}
    >
      <MenuItem
        label='Search Assets'
        icon={
          <Search color={pathname === '/' ? COLORS.white : COLORS.lightGrey} />
        }
        isActive={pathname === '/'}
        onClick={() => router.push('/')}
      />

      <hr className='mx-1 mt-4 border-grey' />

      <div className='no-scrollbar relative flex-grow overflow-y-scroll'>
        <div className='mb-3 mt-6 flex items-center justify-between px-4'>
          <span className='text-sm uppercase text-lightGrey'>Watchlists</span>
          <div
            onClick={() => handleCreate('Watchlist')}
            className='transition-300 -m-1.5 overflow-hidden rounded-full p-1.5 hover:bg-darkGrey'
          >
            <Plus color={COLORS.lightGrey} className='cursor-pointer' />
          </div>
        </div>

        <div className='mb-9 grid gap-1.5'>
          {watchlists.map((watchlist) => {
            const isActive =
              pathname === '/watchlist/[watchlistId]' &&
              watchlistId === watchlist._id;

            return (
              <MenuItem
                label={watchlist.name}
                icon={
                  <List
                    color={isActive ? COLORS.white : COLORS.lightGrey}
                    width={24}
                    height={24}
                    className='transition-300'
                  />
                }
                isActive={isActive}
                onClick={() => router.push(`/watchlist/${watchlist._id}`)}
                key={watchlist._id}
              />
            );
          })}
        </div>

        <div className='pointer-events-none sticky bottom-0 -mt-12 h-28 w-full bg-gradient-to-t from-darkerGrey to-transparent' />
      </div>

      <hr className='mx-1 mb-6 border-grey' />

      <div className='mb-12 grid gap-2'>
        {user ? (
          <>
            <MenuItem
              label='Settings'
              icon={
                <Settings
                  color={
                    pathname === '/settings' ? COLORS.white : COLORS.lightGrey
                  }
                  width={24}
                  height={24}
                  className='transition-300'
                />
              }
              isActive={pathname === '/settings'}
              onClick={() => router.push('/settings')}
            />
            <MenuItem
              label='Log Out'
              icon={
                <LogOut
                  color={COLORS.lightGrey}
                  width={24}
                  height={24}
                  className='transition-300'
                />
              }
              isActive={false}
              onClick={handleLogOut}
            />
          </>
        ) : (
          <>
            <MenuItem
              label='Sign Up'
              icon={
                <UserPlus
                  color={COLORS.lightGrey}
                  width={24}
                  height={24}
                  className='transition-300'
                />
              }
              isActive={false}
              onClick={() => router.push('/sign-up')}
            />

            <MenuItem
              label='Log In'
              icon={
                <LogIn
                  color={COLORS.lightGrey}
                  width={24}
                  height={24}
                  className='transition-300 -translate-x-1'
                />
              }
              isActive={false}
              onClick={() => router.push('/log-in')}
            />
          </>
        )}
      </div>
    </nav>
  );
}
