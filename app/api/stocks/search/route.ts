import { NextResponse } from 'next/server';
import axios from 'axios';

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    const { data } = await axios.get(`${BACKEND_BASE_URL}/search`, {
      params: { query },
    });

    return NextResponse.json(data.slice(0, 16));
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
