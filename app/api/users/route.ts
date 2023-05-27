import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/models/User';

// Create new user
export async function POST(request: Request) {
  try {
    const { uid, name, email } = await request.json();

    await connectDB();

    const savedUser = await User.findOne({ uid });
    if (savedUser)
      return NextResponse.json(
        { message: 'User already exists.' },
        { status: 200 }
      );
    const newUser = new User({
      uid,
      email,
      name,
      watchlists: [],
    });
    await newUser.save();

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error, status: 500 });
  }
}
