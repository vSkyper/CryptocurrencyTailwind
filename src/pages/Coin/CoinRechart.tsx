import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CoinRechartInterface, _coinRechart } from '../../temp_interfaces';

type Props = {
  id: string;
};

const CoinRechart: React.FC<Props> = ({ id }) => {
  const [days, setDays] = useState<string>('7');
  const [rechart, setRechart] = useState<CoinRechartInterface[]>(_coinRechart);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRechart([]);
        data.prices.map((item: any) =>
          setRechart((prevData) => [
            ...prevData,
            {
              date: format(new Date(item[0]), 'MMM d y, hh:mm:ss a'),
              value: item[1],
            },
          ])
        );
      });
  }, [id, days]);

  console.log(rechart);

  return (
    <div>
      <div className='inline-flex'>
        <button
          className={'hover:bg-gray-300 dark:hover:bg-gray-700 font-bold py-2 px-4 rounded-l ' + (days === '1' ? 'text-blue-500' : 'dark:text-white')}
          onClick={() => setDays('1')}
        >
          1D
        </button>
        <button
          className={'hover:bg-gray-300 dark:hover:bg-gray-700 font-bold py-2 px-4 ' + (days === '7' ? 'text-blue-500' : 'dark:text-white')}
          onClick={() => setDays('7')}
        >
          1W
        </button>
        <button
          className={'hover:bg-gray-300 dark:hover:bg-gray-700 font-bold py-2 px-4 ' + (days === '30' ? 'text-blue-500' : 'dark:text-white')}
          onClick={() => setDays('30')}
        >
          1M
        </button>
        <button
          className={'hover:bg-gray-300 dark:hover:bg-gray-700 font-bold py-2 px-4 ' + (days === '90' ? 'text-blue-500' : 'dark:text-white')}
          onClick={() => setDays('90')}
        >
          3M
        </button>
        <button
          className={'hover:bg-gray-300 dark:hover:bg-gray-700 font-bold py-2 px-4 ' + (days === '180' ? 'text-blue-500' : 'dark:text-white')}
          onClick={() => setDays('180')}
        >
          6M
        </button>
        <button
          className={'hover:bg-gray-300 dark:hover:bg-gray-700 font-bold py-2 px-4 ' + (days === '365' ? 'text-blue-500' : 'dark:text-white')}
          onClick={() => setDays('365')}
        >
          1Y
        </button>
        <button
          className={'hover:bg-gray-300 dark:hover:bg-gray-700 font-bold py-2 px-4 rounded-r ' + (days === 'max' ? 'text-blue-500' : 'dark:text-white')}
          onClick={() => setDays('max')}
        >
          MAX
        </button>
      </div>
      <div className='w-11/12 h-96 mt-5'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={rechart}>
            <defs>
              <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#648dae' stopOpacity={0.4} />
                <stop offset='75%' stopColor='#648dae' stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area dataKey='value' stroke='#648dae' fill='url(#color)' />
            <XAxis
              dataKey='date'
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => {
                switch (days) {
                  case '1':
                    return format(new Date(value), '| hh:mm a |');
                  case 'max':
                    return format(new Date(value), '| y MMM |');
                  default:
                    return format(new Date(value), '| MMM, d |');
                }
              }}
            />
            <YAxis
              dataKey='value'
              domain={['auto', 'auto']}
              axisLine={false}
              tickLine={false}
              tickCount={8}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip />
            <CartesianGrid opacity={0.05} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CoinRechart;
