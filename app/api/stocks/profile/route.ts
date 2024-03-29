import axios from 'axios';
import { NextResponse } from 'next/server';
import { formatNumber } from '@/util/helpers';
import { PROFILE_FIELDS, PROFILE_FIELDS_NUMBER_FORMAT } from '@/constants/data';

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');

    const { data } = await axios.get(`${BACKEND_BASE_URL}/info`, {
      params: { symbol },
    });

    const profile: any = [];
    Object.entries(PROFILE_FIELDS).forEach(([key, value]) => {
      if (data[key]) {
        if (PROFILE_FIELDS_NUMBER_FORMAT.has(key)) {
          profile.push([value, formatNumber(data[key])]);
        } else {
          profile.push([value, data[key]]);
        }
      }
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
