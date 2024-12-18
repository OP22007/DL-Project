'use client'

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { StockData } from '../types/stock';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { formatLargeNumber } from '../utils/format';

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 25, 50, 100];

export default function StockTable() {
  const theme = useTheme();
  const [searchQuery, setFilter] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(1);
  const [view, setView] = useState('most-active'); // Track selected view
  const [data, setData] = useState<StockData[]>([]);
  const [filteredData, setFilteredData] = useState<StockData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getStocksData`);
        const result = await response.json();
        if (Array.isArray(result)) {
          setData(result);
          setFilteredData(result);
        } else {
          console.error('Unexpected response format:', result);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  function filterAndSortData() {
    const lowerCaseQuery = searchQuery.toLowerCase();
    let filtered = data.filter((item) =>
      item.name.toLowerCase().includes(lowerCaseQuery)
    );

    if (view === 'gainers') {
      filtered = filtered.sort((a, b) => b.changePercent - a.changePercent); // Descending % change
    } else if (view === 'losers') {
      filtered = filtered.sort((a, b) => a.changePercent - b.changePercent); // Ascending % change
    }

    return filtered;
  }

  useEffect(() => {
    setFilteredData(filterAndSortData());
  }, [searchQuery, view]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <Select value={view} onValueChange={(value) => setView(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="most-active">Most actives</SelectItem>
            <SelectItem value="gainers">Top gainers</SelectItem>
            <SelectItem value="losers">Top losers</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Filter company..."
          value={searchQuery}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className={`rounded-md border p-4 ${theme.theme === 'dark' ? '' : 'border-black'}`}>
        <Table>
          <TableHeader>
            <TableRow className={`${theme.theme === 'dark' ? '' : 'border-b-black'}`}>
              <TableHead>Symbol</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">% Change</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((stock) => (
              <TableRow className={`${theme.theme === 'dark' ? '' : 'border-b-black'}`} key={stock.symbol}>
                <TableCell className="font-bold text-blue-500">
                  <Link href={{pathname:`/prev/${stock.symbol}`,query:{symbol:stock.symbol}}}>{stock.symbol}</Link>
                </TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell className="text-right">{stock.price.toFixed(2)}</TableCell>
                <TableCell
                  className={`text-right ${
                    stock.change >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {parseFloat(stock.change.toFixed(2)) > 0
                    ? `+` + stock.change.toFixed(2)
                    : stock.change.toFixed(2)}
                  %
                </TableCell>
                <TableCell
                  className={`text-right flex justify-end ${
                    stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  <div
                    className={`p-2 w-fit rounded-lg ${
                      stock.changePercent >= 0 ? `${theme.theme=="dark"?"bg-green-950 ":"bg-green-300 "}` : `${theme.theme=="dark"?"bg-red-950 ":"bg-red-300 "}`
                    }bg-opacity-70`}
                  >
                    {parseFloat(stock.changePercent.toFixed(2)) > 0
                      ? `+` + stock.changePercent.toFixed(2)
                      : stock.changePercent.toFixed(2)}
                    %
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {formatLargeNumber(parseInt(stock.marketCap))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">Rows per page</p>
          <Select
            value={rowsPerPage.toString()}
            onValueChange={(value) => setRowsPerPage(Number(value))}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="15" />
            </SelectTrigger>
            <SelectContent>
              {ROWS_PER_PAGE_OPTIONS.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-6">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
