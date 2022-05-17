import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AreaChart, ResponsiveContainer, Area, YAxis } from 'recharts';
import { Link } from 'react-router-dom';

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 170,
    renderCell: (params: any) => (
      <Link
        className='flex items-center gap-2 hover:underline'
        to={`/coins/${params.row.id}`}
      >
        <img src={params.row.image} className='w-7' alt='logo' />
        {params.value}
      </Link>
    ),
    cellClassName: () => 'dark:text-white',
    headerClassName: () => 'dark:text-white',
  },
  {
    field: 'symbol',
    headerName: 'Symbol',
    flex: 0.9,
    minWidth: 135,
    valueFormatter: (params: any) => params.value.toUpperCase(),
    cellClassName: () => 'dark:text-white',
    headerClassName: () => 'dark:text-white',
  },
  {
    type: 'number',
    field: 'current_price',
    headerName: 'Price',
    flex: 1,
    minWidth: 150,
    valueFormatter: (params: any) =>
      Number(params.value).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 8,
        style: 'currency',
        currency: 'USD',
      }),
    cellClassName: () => 'dark:text-white',
    headerClassName: () => 'dark:text-white',
  },
  {
    type: 'number',
    field: 'price_change_percentage_1h_in_currency',
    headerName: '1h',
    flex: 0.7,
    minWidth: 120,
    valueFormatter: (params: any) =>
      Number(params.value / 100).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'percent',
      }),
    cellClassName: (params: any) => {
      if (Number(params.value) < 0) {
        return 'text-red-500';
      } else {
        return 'text-green-500';
      }
    },
    headerClassName: () => 'dark:text-white',
  },
  {
    type: 'number',
    field: 'price_change_percentage_24h_in_currency',
    headerName: '24h',
    flex: 0.7,
    minWidth: 120,
    valueFormatter: (params: any) =>
      Number(params.value / 100).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'percent',
      }),
    cellClassName: (params: any) => {
      if (Number(params.value) < 0) {
        return 'text-red-500';
      } else {
        return 'text-green-500';
      }
    },
    headerClassName: () => 'dark:text-white',
  },
  {
    type: 'number',
    field: 'price_change_percentage_7d_in_currency',
    headerName: '7d',
    flex: 0.7,
    minWidth: 120,
    valueFormatter: (params: any) =>
      Number(params.value / 100).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'percent',
      }),
    cellClassName: (params: any) => {
      if (Number(params.value) < 0) {
        return 'text-red-500';
      } else {
        return 'text-green-500';
      }
    },
    headerClassName: () => 'dark:text-white',
  },
  {
    type: 'number',
    field: 'total_volume',
    headerName: '24h Volume',
    flex: 1,
    minWidth: 180,
    valueFormatter: (params: any) =>
      Number(params.value).toLocaleString('en-US', {
        maximumFractionDigits: 0,
        style: 'currency',
        currency: 'USD',
      }),
    cellClassName: () => 'dark:text-white',
    headerClassName: () => 'dark:text-white',
  },
  {
    type: 'number',
    field: 'market_cap',
    headerName: 'Market Cap',
    flex: 1,
    minWidth: 180,
    valueFormatter: (params: any) =>
      Number(params.value).toLocaleString('en-US', {
        maximumFractionDigits: 0,
        style: 'currency',
        currency: 'USD',
      }),
    cellClassName: () => 'dark:text-white',
    headerClassName: () => 'dark:text-white',
  },
  {
    field: 'sparkline_in_7d',
    headerName: 'Last 7 Days',
    flex: 1,
    minWidth: 190,
    renderCell: (params: any) => {
      const color =
        params.row.price_change_percentage_7d_in_currency < 0
          ? '#EF4444'
          : '#22C55E';
      return (
        <ResponsiveContainer>
          <AreaChart data={params.value.price}>
            <defs>
              <linearGradient
                id={`linearColor${params.row.id}`}
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop offset='5%' stopColor={color} stopOpacity={0.4} />
                <stop offset='75%' stopColor={color} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              dataKey={(value) => value}
              stroke={color}
              fill={`url(#linearColor${params.row.id})`}
            />
            <YAxis dataKey={(value) => value} domain={['auto', 'auto']} hide />
          </AreaChart>
        </ResponsiveContainer>
      );
    },
    headerClassName: () => 'dark:text-white',
  },
];

const MainCryptoTable: React.FC = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d'
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (Object.keys(data).length !== 0) {
    return (
      <div className='mt-5 flex'>
        <div className='grow'>
          <DataGrid className='shadow-sm' autoHeight rows={data} columns={columns} pageSize={50} />
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default MainCryptoTable;
