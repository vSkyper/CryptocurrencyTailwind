import { format } from 'date-fns';
import { useCallback } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useThemeContext } from 'store';
import colors from 'tailwindcss/colors';

interface Props {
  sparkline: {
    date: string;
    value: number;
  }[];
  days: string;
}

export default function Chart({ sparkline, days }: Props) {
  const { darkMode } = useThemeContext();

  const CustomTooltip = useCallback(({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div
        className='bg-white dark:bg-gray-800 opacity-75 p-3 rounded-lg flex flex-col items-center'
      >
        <div className='dark:text-white'>{format(new Date(label), 'eeee, d MMM, yyyy')}</div>
        <div className='dark:text-white'>
          {Number(payload[0].value).toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 8,
            style: 'currency',
            currency: 'USD',
          })}
        </div>
      </div>
    );

  }, []);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart data={sparkline}>
        <defs>
          <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor={colors.blue['500']} stopOpacity={0.4} />
            <stop offset='75%' stopColor={colors.blue['500']} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area dataKey='value' stroke={colors.blue['500']} fill='url(#color)' />
        <XAxis
          dataKey='date'
          stroke={darkMode ? 'white' : 'black'}
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
          stroke={darkMode ? 'white' : 'black'}
          domain={['auto', 'auto']}
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid opacity={0.05} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}