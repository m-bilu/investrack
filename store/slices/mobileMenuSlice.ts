import { createSlice } from '@reduxjs/toolkit';

interface MobileMenuState {
  isOpen: boolean;
}

const initialState: MobileMenuState = {
  isOpen: false,
};

export const mobileMenuSlice = createSlice({
  name: 'mobileMenu',
  initialState,
  reducers: {
    openMenu: (state) => {
      state.isOpen = true;
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openMenu, closeMenu } = mobileMenuSlice.actions;
export default mobileMenuSlice.reducer;
