export interface MainTableData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_1h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  total_volume: number;
  market_cap: number;
  chart_in_7d: number[];
  image: string;
}

export const _mainTableData: MainTableData[] = [
  {
    id: '',
    name: '',
    symbol: '',
    current_price: 0,
    price_change_percentage_1h: 0,
    price_change_percentage_24h: 0,
    price_change_percentage_7d: 0,
    total_volume: 0,
    market_cap: 0,
    chart_in_7d: [0],
    image: '',
  },
];

export interface Coin {
  name: string;
  image: string;
}

export const _coin: Coin = {
  name: '',
  image: '',
};

export interface CoinRechartInterface {
  date: any;
  value: number;
}

export const _coinRechart: CoinRechartInterface[] = [
  {
    date: new Date(),
    value: 0,
  },
];
