import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Watchlist from '@/models/Watchlist';

export async function POST(
  request: Request,
  { params }: { params: { symbol: string } }
) {
  try {
    const { symbol } = params;
    const { watchlistIds } = await request.json();

    await connectDB();

    const watchlists = await Watchlist.find({ _id: { $in: watchlistIds } });

    watchlists.forEach(async (watchlist) => {
      const { stocks } = watchlist;
      if (!stocks.includes(symbol)) stocks.push(symbol);
      await watchlist.save();
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
