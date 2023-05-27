import Carousel from '@/components/UI/Carousel';
import StockCard from '@/components/cards/StockCard';
import { getExploreStocksChange } from '@/util/stocksInfo';

export default async function ExploreStocks() {
  const stocksChange = await getExploreStocksChange();

  return (
    <section className='mb-18 2xl:mb-24'>
      <h2 className='mb-4 text-2xl font-semibold text-white 2xl:text-3xl 3xl:mb-6'>
        Explore Stocks
      </h2>
      {stocksChange && (
        <Carousel>
          {stocksChange.map((stock) => (
            <StockCard
              symbol={stock.symbol}
              name={stock.name}
              price={stock.price}
              change={stock.change}
              changePercent={stock.changePercent}
              key={stock.symbol}
            />
          ))}
        </Carousel>
      )}
    </section>
  );
}
