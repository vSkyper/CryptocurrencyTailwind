import { DescriptionProps } from './interface';

export default function Description(props: DescriptionProps) {
  const { globalData } = props;

  const marketCapText: string = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  }).format(globalData.data.total_market_cap.usd);

  const marketCapPercentage: string = (
    globalData.data.market_cap_change_percentage_24h_usd / 100
  ).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'percent',
  });

  const totalVolumeText: string = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  }).format(globalData.data.total_volume.usd);

  const marketCapPercentageBTC: string = (
    globalData.data.market_cap_percentage.btc / 100
  ).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'percent',
  });

  const marketCapPercentageETH: string = (
    globalData.data.market_cap_percentage.eth / 100
  ).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'percent',
  });

  const cryptocurrencies: string =
    globalData.data.active_cryptocurrencies.toLocaleString('en-US');

  return (
    <>
      <div className='mb-2 text-lg sm:text-xl font-semibold tracking-tight leading-loose text-primaryDark dark:text-primary'>
        Cryptocurrency Prices by Market Cap
      </div>
      <div className='text-base sm:text-lg font-normal tracking-tight text-primaryDark dark:text-primary'>
        The global cryptocurrency market cap today is {marketCapText}, a{' '}
        <span
          className={
            globalData.data.market_cap_change_percentage_24h_usd < 0
              ? 'text-error'
              : 'text-success'
          }
        >
          {marketCapPercentage}
        </span>{' '}
        change in the last 24 hours. Total cryptocurrency trading volume in the
        last day is at {totalVolumeText}. Bitcoin dominance is at{' '}
        {marketCapPercentageBTC} and Ethereum dominance is at{' '}
        {marketCapPercentageETH}. CoinGecko API is now tracking{' '}
        {cryptocurrencies} cryptocurrencies.
      </div>
    </>
  );
}
