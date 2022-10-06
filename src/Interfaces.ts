export interface NavSearch {
  id: string;
  symbol: string;
  name: string;
}

export const _navSearch: NavSearch[] = [
  {
    id: '',
    symbol: '',
    name: '',
  },
];

export interface MainGlobalInfo {
  total_market_cap_in_usd: number;
  market_cap_change_percentage_24h: number;
  total_volume_in_usd: number;
  market_cap_percentage_btc: number;
  market_cap_percentage_eth: number;
  active_cryptocurrencies: number;
}

export const _mainGlobalInfo: MainGlobalInfo = {
  total_market_cap_in_usd: 0,
  market_cap_change_percentage_24h: 0,
  total_volume_in_usd: 0,
  market_cap_percentage_btc: 0,
  market_cap_percentage_eth: 0,
  active_cryptocurrencies: 0,
};

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
