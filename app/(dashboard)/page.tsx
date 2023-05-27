import Search from '@/components/sections/home/Search';
import ExploreStocks from '@/components/sections/home/ExploreAssets';
import MarketNews from '@/components/sections/home/MarketNews';

export default function HomePage() {
  return (
    <>
      <Search />
      {/* @ts-expect-error Async Server Component */}
      <ExploreStocks />
      {/* @ts-expect-error Async Server Component */}
      <MarketNews />
    </>
  );
}
