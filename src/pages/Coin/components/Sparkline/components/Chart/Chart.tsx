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
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { useThemeContext } from 'store';
import tailwindConfig from '../../../../../../../tailwind.config.ts';

interface Props {
  sparkline: {
    date: string;
    value: number;
  }[];
  days: string;
}

export default function Chart({ sparkline, days }: Props) {
  const { darkMode } = useThemeContext();

  const CustomTooltip = useCallback(
    ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
      if (!active || !payload || !payload.length) return null;
      return (
        <div className='bg-primary dark:bg-primaryDark bg-opacity-75 p-3 rounded-lg flex flex-col items-center'>
          <div className='text-primaryDark dark:text-primary'>
            {format(new Date(label), 'eeee, d MMM, yyyy')}
          </div>
          <div className='text-primaryDark dark:text-primary'>
            {Number(payload[0].value).toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 8,
              style: 'currency',
              currency: 'USD',
            })}
          </div>
        </div>
      );
    },
    []
  );

  const handleTickFormatterXAxis = useCallback(
    (value: string) => {
      switch (days) {
        case '1':
          return format(new Date(value), '| hh:mm a |');
        case 'max':
          return format(new Date(value), '| y MMM |');
        default:
          return format(new Date(value), '| MMM, d |');
      }
    },
    [days]
  );

  const handleTickFormatterYAxis = useCallback(
    (value: number) => `$${value}`,
    []
  );

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart data={sparkline}>
        <defs>
          <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
            <stop
              offset='5%'
              stopColor={tailwindConfig.theme.extend.colors.tertiary}
              stopOpacity={0.4}
            />
            <stop
              offset='75%'
              stopColor={tailwindConfig.theme.extend.colors.tertiary}
              stopOpacity={0.05}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey='value'
          stroke={tailwindConfig.theme.extend.colors.tertiary}
          fill='url(#color)'
        />
        <XAxis
          dataKey='date'
          stroke={
            darkMode
              ? tailwindConfig.theme.extend.colors.primary
              : tailwindConfig.theme.extend.colors.primaryDark
          }
          axisLine={false}
          tickLine={false}
          tickFormatter={handleTickFormatterXAxis}
        />
        <YAxis
          dataKey='value'
          stroke={
            darkMode
              ? tailwindConfig.theme.extend.colors.primary
              : tailwindConfig.theme.extend.colors.primaryDark
          }
          domain={['auto', 'auto']}
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={handleTickFormatterYAxis}
        />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid opacity={0.05} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
