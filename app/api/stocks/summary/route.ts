import axios from 'axios';
import { NextResponse } from 'next/server';
import { SUMMARY_FIELDS, SUMMARY_FIELDS_NUMBER_FORMAT } from '@/constants/data';
import { formatNumber } from '@/util/helpers';

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');

    const { data } = await axios.get(`${BACKEND_BASE_URL}/info`, {
      params: { symbol },
    });

    const summary: any = [];

    Object.entries(SUMMARY_FIELDS).forEach(([key, value]) => {
      if (data[key]) {
        summary.push([
          value,
          SUMMARY_FIELDS_NUMBER_FORMAT.has(key)
            ? formatNumber(data[key])
            : data[key],
        ]);
      }
    });

    return NextResponse.json(summary);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export const dynamic = 'force-dynamic';
