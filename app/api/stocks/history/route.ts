import axios from 'axios';
import { NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');
    const period = searchParams.get('period');
    const interval = searchParams.get('interval');

    const { data } = await axios.get(`${BACKEND_BASE_URL}/history`, {
      params: { symbol, period, interval },
    });

    return NextResponse.json(
      data.map((item: any) => ({
        time:
          (new Date(item.Datetime || item.Date).getTime() -
            4 * 60 * 60 * 1000) /
          1000,
        value: item.Close,
      }))
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
