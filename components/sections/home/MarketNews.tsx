import Carousel from '@/components/UI/Carousel';
import NewsCard from '@/components/cards/NewsCard';
import { getMarketNews } from '@/util/stocksInfo';

export default async function MarketNews() {
  const marketNews = await getMarketNews();

  return (
    <section>
      <h2 className='mb-4 text-2xl font-semibold text-white 2xl:text-3xl 3xl:mb-6'>
        Market News
      </h2>
      <Carousel>
        {marketNews.map((news: any, i: number) => (
          <NewsCard
            headline={news.headline}
            summary={news.summary}
            image={news.image}
            url={news.url}
            key={i}
          />
        ))}
      </Carousel>
    </section>
  );
}
