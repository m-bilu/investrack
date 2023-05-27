import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/models/User';
import Watchlist from '@/models/Watchlist';

// Get user's watchlists
export async function GET(
  request: Request,
  { params }: { params: { uid: string } }
) {
  try {
    const uid = params.uid;
    await connectDB();

    const user = await User.findOne({ uid }).populate('watchlists');
    if (!user) return NextResponse.error();
    return NextResponse.json(user.watchlists);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error, status: 500 });
  }
}

// Create watchlist
export async function POST(
  request: Request,
  { params }: { params: { uid: string } }
) {
  try {
    const uid = params.uid;
    const { name } = await request.json();

    await connectDB();

    const user = await User.findOne({ uid });
    if (!user)
      return NextResponse.json({ error: 'User not found', status: 404 });

    const watchlist = new Watchlist({
      name,
      user: user._id,
      stocks: [],
    });
    const savedWatchlist = await watchlist.save();
    user.watchlists.push(savedWatchlist._id);
    await user.save();

    return NextResponse.json(savedWatchlist);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error, status: 500 });
  }
}
