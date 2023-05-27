import Carousel from '@/components/UI/Carousel';
import NewsCard from '@/components/cards/NewsCard';
import { NewsType } from '@/constants/types';

export default function News({ news }: { news: NewsType[] }) {
  return (
    <section>
      <h2 className='mb-4 text-2xl font-semibold text-white 2xl:text-3xl'>
        News
      </h2>
      <Carousel>
        {news.map((article, i) => (
          <NewsCard
            headline={article.headline}
            summary=''
            image={article.image}
            url={article.url}
            key={i}
          />
        ))}
      </Carousel>
    </section>
  );
}
