import { EXPLORE_STOCKS } from '@/constants/data';

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

export const getExploreStocksChange = async () => {
  try {
    const promises = EXPLORE_STOCKS.map(async (symbol) => {
      const response = await fetch(
        `${FRONTEND_BASE_URL}/api/stocks/change?symbol=${symbol}`,
        { next: { revalidate: 10 } }
      );
      return await response.json();
    });
    return await Promise.all(promises);
  } catch (error) {
    console.log(error);
  }
};