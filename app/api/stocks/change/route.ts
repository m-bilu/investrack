import { NextResponse } from 'next/server';
import axios from 'axios';

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');

    const { data } = await axios.get(`${BACKEND_BASE_URL}/info`, {
      params: { symbol },
    });

    return NextResponse.json({
      symbol,
      name: data.shortName,
      price: data.currentPrice.toFixed(2),
      change: (data.currentPrice - data.previousClose).toFixed(2),
      changePercent: (
        ((data.currentPrice - data.previousClose) / data.previousClose) *
        100
      ).toFixed(2),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export const dynamic = 'force-dynamic';
