import { NextRequest, NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get('symbol');
  const period1 = searchParams.get('period1');
  const period2 = searchParams.get('period2');

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  if (!period1) {
    return NextResponse.json({ error: 'Period1 is required' }, { status: 400 });
  }
  if (!period2) {
    return NextResponse.json({ error: 'Period2 is required' }, { status: 400 });
  }

  try {
    
    // const result = await yahooFinance.chart(symbol,queryOptions);
    const query = symbol;
    const queryOptions = {period1:period1,period2:period2 /* ... */ };
    const result = await yahooFinance.historical(query, queryOptions);
    // console.log(result);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
