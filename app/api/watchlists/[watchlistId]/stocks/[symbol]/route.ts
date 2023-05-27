import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Watchlist from '@/models/Watchlist';

export async function DELETE(
  request: Request,
  { params }: { params: { watchlistId: string; symbol: string } }
) {
  try {
    const { watchlistId, symbol } = params;

    await connectDB();

    const watchlist = await Watchlist.findById(watchlistId);
    if (!watchlist) return NextResponse.error();
    watchlist.stocks = watchlist.stocks.filter(
      (stockSymbol: string) => stockSymbol !== symbol
    );
    await watchlist.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
