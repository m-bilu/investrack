'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { openMenu, closeMenu } from '@/store/slices/mobileMenuSlice';
import { X, Menu } from 'react-feather';
import logo from '@/public/img/logo.svg';
import { COLORS } from '@/constants/colors';

export default function Header() {
  const pathname = usePathname();
  const isDashboardRoute =
    pathname === '/' ||
    pathname === '/settings' ||
    pathname.startsWith('/watchlist') ||
    pathname.startsWith('/stock');

  const dispatch = useDispatch();
  const isMobileMenuOpen = useSelector(
    (state: RootState) => state.mobileMenu.isOpen
  );

  return (
    <header className='fixed inset-x-5 top-10 z-40 flex items-center justify-between xs:inset-x-7 xl:inset-x-8 xl:top-14'>
      <Link href='/' className='flex items-center gap-2.5'>
        <Image src={logo} alt='Investrack logo' />
        <span className='text-gradient bg-gradient text-xl font-semibold'>
          Investrack
        </span>
      </Link>

      {isDashboardRoute &&
        (isMobileMenuOpen ? (
          <X
            color={COLORS.lightGrey}
            width={32}
            height={32}
            onClick={() => dispatch(closeMenu())}
            className='cursor-pointer xl:hidden'
          />
        ) : (
          <Menu
            color={COLORS.lightGrey}
            width={32}
            height={32}
            onClick={() => dispatch(openMenu())}
            className='cursor-pointer xl:hidden'
          />
        ))}
    </header>
  );
}
