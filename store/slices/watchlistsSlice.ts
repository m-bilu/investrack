import { createSlice } from '@reduxjs/toolkit';
import { WatchlistType } from '@/constants/types';

interface WatchlistsState {
  watchlists: WatchlistType[];
}

const initialState: WatchlistsState = {
  watchlists: [],
};

export const watchlistsSlice = createSlice({
  name: 'watchlists',
  initialState,
  reducers: {
    setWatchlists: (state, action) => {
      state.watchlists = action.payload;
    },
    addWatchlist: (state, action) => {
      state.watchlists.push(action.payload);
    },
    deleteWatchlist: (state, action) => {
      state.watchlists = state.watchlists.filter(
        (watchlist) => watchlist._id !== action.payload
      );
    },
    addStockToWatchlists: (state, action) => {
      const { watchlistIds, symbol } = action.payload;

      state.watchlists = state.watchlists.map((watchlist) => {
        if (watchlistIds.includes(watchlist._id)) {
          if (!watchlist.stocks.includes(symbol)) watchlist.stocks.push(symbol);
        }
        return watchlist;
      });
    },
    removeStockFromWatchlist: (state, action) => {
      const { watchlistId, symbol } = action.payload;

      state.watchlists = state.watchlists.map((watchlist) => {
        if (watchlist._id === watchlistId) {
          watchlist.stocks = watchlist.stocks.filter(
            (stock) => stock !== symbol
          );
        }
        return watchlist;
      });
    },
    changeWatchlistName: (state, action) => {
      const { watchlistId, name } = action.payload;

      state.watchlists = state.watchlists.map((watchlist) => {
        if (watchlist._id === watchlistId) {
          watchlist.name = name;
        }
        return watchlist;
      });
    },
    logOutWatchlists: (state) => {
      state.watchlists = [];
    },
  },
});

export const {
  setWatchlists,
  addWatchlist,
  deleteWatchlist,
  addStockToWatchlists,
  removeStockFromWatchlist,
  changeWatchlistName,
  logOutWatchlists,
} = watchlistsSlice.actions;
export default watchlistsSlice.reducer;
