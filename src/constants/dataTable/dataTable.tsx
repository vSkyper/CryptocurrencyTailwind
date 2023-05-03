import { AreaChart, ResponsiveContainer, Area, YAxis } from 'recharts';
import { Link } from 'react-router-dom';
import { CellClassParams, ColDef, ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';
import { ICoins } from '../../interfaces';

export const defaultColDef: ColDef<ICoins> = {
  sortable: true,
  resizable: true,
  suppressMovable: true,
};

export const columns: ColDef<ICoins>[] = [
  {
    headerName: '#',
    width: 65,
    valueGetter: (params: ValueGetterParams<ICoins>) => params.node && params.node.id,
  },
  {
    field: 'name',
    width: 170,
    cellRenderer: (params: any) => (
      <Link
        className='flex items-center gap-2 hover:underline'
        to={`/coins/${params.data.id}`}
      >
        <img src={params.data.image} className='w-5' alt='logo' />
        {params.value}
      </Link>
    ),
  },
  {
    field: 'symbol',
    width: 115,
    valueFormatter: (params: ValueFormatterParams<ICoins, string>) => params.value.toUpperCase(),
  },
  {
    field: 'current_price',
    headerName: 'Current price',
    width: 150,
    valueFormatter: (params: ValueFormatterParams<ICoins, number>) =>
      params.value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 8,
        style: 'currency',
        currency: 'USD',
      }),
  },
  {
    field: 'price_change_percentage_1h_in_currency',
    headerName: '1h',
    width: 120,
    cellClass: (params: CellClassParams<ICoins, number | null>) => {
      if (params.value && params.value < 0) {
        return 'text-red-500';
      }
      return 'text-green-500';
    },
    valueFormatter: (params: ValueFormatterParams<ICoins, number | null>) => {
      if (!params.value) return 'N/A';

      return (params.value / 100).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'percent',
      });
    },
  },
  {
    field: 'price_change_percentage_24h_in_currency',
    headerName: '24h',
    width: 120,
    cellClass: (params: CellClassParams<ICoins, number | null>) => {
      if (params.value && params.value < 0) {
        return 'text-red-500';
      }
      return 'text-green-500';
    },
    valueFormatter: (params: ValueFormatterParams<ICoins, number | null>) => {
      if (!params.value) return 'N/A';

      return (params.value / 100).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'percent',
      });
    },
  },
  {
    field: 'price_change_percentage_7d_in_currency',
    headerName: '7d',
    width: 120,
    cellClass: (params: CellClassParams<ICoins, number | null>) => {
      if (params.value && params.value < 0) {
        return 'text-red-500';
      }
      return 'text-green-500';
    },
    valueFormatter: (params: ValueFormatterParams<ICoins, number | null>) => {
      if (!params.value) return 'N/A';

      return (params.value / 100).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'percent',
      });
    },
  },
  {
    field: 'total_volume',
    headerName: '24h volume',
    width: 175,
    valueFormatter: (params: ValueFormatterParams<ICoins, number>) =>
      params.value.toLocaleString('en-US', {
        maximumFractionDigits: 0,
        style: 'currency',
        currency: 'USD',
      }),
  },
  {
    field: 'market_cap',
    headerName: 'Market cap',
    width: 175,
    valueFormatter: (params: ValueFormatterParams<ICoins, number>) =>
      params.value.toLocaleString('en-US', {
        maximumFractionDigits: 0,
        style: 'currency',
        currency: 'USD',
      }),
  },
  {
    field: 'sparkline_in_7d.price',
    headerName: 'Last 7 days',
    width: 175,
    sortable: false,
    cellRenderer: (params: any) => {
      const color =
        params.data.price_change_percentage_7d < 0 ? '#EF4444' : '#22C55E';
      return (
        <ResponsiveContainer>
          <AreaChart data={params.value}>
            <defs>
              <linearGradient
                id={`linearColor${params.node.id}`}
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
              fill={`url(#linearColor${params.node.id})`}
            />
            <YAxis dataKey={(value) => value} domain={['auto', 'auto']} hide />
          </AreaChart>
        </ResponsiveContainer>
      );
    },
  },
];