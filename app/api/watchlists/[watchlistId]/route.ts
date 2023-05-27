import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Watchlist from '@/models/Watchlist';

// Change watchlist name
export async function PUT(
  request: Request,
  { params }: { params: { watchlistId: string } }
) {
  try {
    const { watchlistId } = params;
    const { name } = await request.json();

    await connectDB();

    const watchlist = await Watchlist.findById(watchlistId);
    if (!watchlist)
      return NextResponse.json({ error: 'Watchlist not found', status: 404 });
    watchlist.name = name;
    await watchlist.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

// Delete watchlist
export async function DELETE(
  request: Request,
  { params }: { params: { watchlistId: string } }
) {
  try {
    const { watchlistId } = params;

    await connectDB();
    await Watchlist.findByIdAndDelete(watchlistId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
