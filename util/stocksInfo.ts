import { EXPLORE_STOCKS } from '@/constants/data';

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;
const FINNHUB_BASE_URL = process.env.FINNHUB_BASE_URL;
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

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

export const getMarketNews = async () => {
  const response = await fetch(
    `${FINNHUB_BASE_URL}/news?category=general&token=${FINNHUB_API_KEY}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  const data = await response.json();
  const marketNews = data.filter((news: any) => news.image).slice(0, 20);
  return marketNews;
};
