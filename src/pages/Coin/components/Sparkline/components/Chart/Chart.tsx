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

interface Props {
  sparkline: {
    date: string;
    value: number;
  }[];
  days: string;
}

export default function Chart({ sparkline, days }: Props) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart data={sparkline}>
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
  )
}