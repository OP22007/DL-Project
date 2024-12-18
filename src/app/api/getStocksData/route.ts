import { NextRequest, NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';
import data from '@/app/data/tickers.json';

export async function GET(req: NextRequest) {
  const symbols = data.map((item) => item.symbol);

  try {
    const quotes = await yahooFinance.quote(symbols);
    const tableData = quotes.map((quote) => ({
      symbol: quote.symbol,
      name: quote.shortName || quote.longName,
      price: quote.regularMarketPrice,
      change: quote.regularMarketChange,
      changePercent: quote.regularMarketChangePercent,
      marketCap: quote.marketCap
    }));

    return NextResponse.json(tableData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
}