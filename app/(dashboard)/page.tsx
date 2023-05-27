import Search from '@/components/sections/home/Search';
import ExploreStocks from '@/components/sections/home/ExploreAssets';

export default function HomePage() {
  return (
    <>
      <Search />
      {/* @ts-expect-error Async Server Component */}
      <ExploreStocks />
    </>
  );
}
