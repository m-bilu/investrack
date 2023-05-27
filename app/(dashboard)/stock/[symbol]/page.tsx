import {
  getStockInfo,
  getStockNews,
  getStockSummary,
  getStockProfile,
} from '@/util/stocksInfo';
import Introduction from '@/components/sections/stock/Introduction';
import Chart from '@/components/sections/stock/Chart';
import MobileButtons from '@/components/sections/stock/MobileButtons';
import Summary from '@/components/sections/stock/Summary';
import Profile from '@/components/sections/stock/Profile';
import Description from '@/components/sections/stock/Description';
import News from '@/components/sections/stock/News';

export default async function StockPage({
  params,
}: {
  params: { symbol: string };
}) {
  const symbol = params.symbol;

  const info = await getStockInfo(symbol);
  const news = await getStockNews(symbol);
  const summary = await getStockSummary(symbol);
  const profile = await getStockProfile(symbol);

  const exchange = info.exchange === 'NMS' ? 'NASDAQ' : 'NYSE';

  return (
    <>
      <Introduction name={info.shortName} symbol={symbol} exchange={exchange} />
      <Chart
        price={info.currentPrice.toFixed(2)}
        change={Number((info.currentPrice - info.previousClose).toFixed(2))}
        changePercent={Number(
          (
            ((info.currentPrice - info.previousClose) / info.previousClose) *
            100
          ).toFixed(2)
        )}
      />
      <MobileButtons />
      <Summary summary={summary} />
      <Profile profile={profile} />
      <Description description={info.longBusinessSummary} />
      <News
        news={news.map((article: any) => ({
          headline: article.title,
          url: article.link,
          image: article?.thumbnail?.resolutions?.at(0)?.url,
        }))}
      />
    </>
  );
}
