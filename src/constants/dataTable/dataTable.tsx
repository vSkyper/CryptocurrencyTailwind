import { AreaChart, ResponsiveContainer, Area, YAxis } from 'recharts';
import { Link } from 'react-router-dom';
import {
  CellClassParams,
  ColDef,
  ICellRendererParams,
  ValueFormatterParams,
  ValueGetterParams,
} from 'ag-grid-community';
import tailwindConfig from '../../../tailwind.config.ts';
import { ICoins } from 'interfaces';

export const defaultColDef: ColDef<ICoins> = {
  sortable: true,
  resizable: true,
  suppressMovable: true,
};

export const columns: ColDef<ICoins>[] = [
  {
    headerName: '#',
    cellDataType: 'text',
    width: 65,
    valueGetter: (params: ValueGetterParams<ICoins>) => params.node?.id,
  },
  {
    field: 'name',
    cellDataType: 'text',
    width: 170,
    cellRenderer: (params: ICellRendererParams<ICoins>) => (
      <Link
        className='flex items-center gap-2 hover:underline'
        to={`/coins/${params.data?.id}`}
      >
        <img src={params.data?.image} className='w-5' alt='logo' />
        {params.value}
      </Link>
    ),
  },
  {
    field: 'symbol',
    cellDataType: 'text',
    width: 115,
    valueFormatter: (params: ValueFormatterParams<ICoins, string>) => {
      if (!params.value) return 'N/A';

      return params.value.toUpperCase();
    },
  },
  {
    field: 'current_price',
    cellDataType: 'number',
    headerName: 'Current price',
    width: 150,
    valueFormatter: (params: ValueFormatterParams<ICoins, number>) => {
      if (!params.value) return 'N/A';

      return params.value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 8,
        style: 'currency',
        currency: 'USD',
      });
    },
  },
  {
    field: 'price_change_percentage_1h_in_currency',
    cellDataType: 'number',
    headerName: '1h',
    width: 120,
    cellClass: (params: CellClassParams<ICoins, number | null>) => {
      if (params.value && params.value < 0) {
        return 'text-error';
      }
      return 'text-success';
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
    cellDataType: 'number',
    headerName: '24h',
    width: 120,
    cellClass: (params: CellClassParams<ICoins, number | null>) => {
      if (params.value && params.value < 0) {
        return 'text-error';
      }
      return 'text-success';
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
    cellDataType: 'number',
    headerName: '7d',
    width: 120,
    cellClass: (params: CellClassParams<ICoins, number | null>) => {
      if (params.value && params.value < 0) {
        return 'text-error';
      }
      return 'text-success';
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
    cellDataType: 'number',
    headerName: '24h volume',
    width: 175,
    valueFormatter: (params: ValueFormatterParams<ICoins, number>) => {
      if (!params.value) return 'N/A';

      return params.value.toLocaleString('en-US', {
        maximumFractionDigits: 0,
        style: 'currency',
        currency: 'USD',
      });
    },
  },
  {
    field: 'market_cap',
    cellDataType: 'number',
    headerName: 'Market cap',
    width: 175,
    valueFormatter: (params: ValueFormatterParams<ICoins, number>) => {
      if (!params.value) return 'N/A';

      return params.value.toLocaleString('en-US', {
        maximumFractionDigits: 0,
        style: 'currency',
        currency: 'USD',
      });
    },
  },
  {
    field: 'sparkline_in_7d.price',
    cellDataType: 'object',
    headerName: 'Last 7 days',
    width: 175,
    sortable: false,
    valueFormatter: (params: ValueFormatterParams<ICoins, string>) => {
      if (!params.value) return 'N/A';

      return params.value;
    },
    cellRenderer: (params: ICellRendererParams<ICoins>) => {
      const color =
        (params.data?.price_change_percentage_7d_in_currency || 0) < 0
          ? tailwindConfig.theme.extend.colors.error
          : tailwindConfig.theme.extend.colors.success;
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
