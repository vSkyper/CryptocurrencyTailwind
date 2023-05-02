import { IGlobalData } from '../../../../interfaces';

interface Props {
  globalData: IGlobalData;
};

export default function Global({ globalData }: Props) {
  const marketCap = Number(globalData.data.total_market_cap.usd).toLocaleString('en-US', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'USD',
  });

  const marketCapText = Number(
    globalData.data.total_market_cap.usd / Math.pow(10, 12)
  ).toLocaleString('en-US', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'USD',
  });

  const marketCapPercentage = Number(
    globalData.data.market_cap_change_percentage_24h_usd / 100
  ).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'percent',
  });

  const totalVolume = Number(globalData.data.total_volume.usd).toLocaleString('en-US', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'USD',
  });

  const totalVolumeText = Number(
    globalData.data.total_volume.usd / Math.pow(10, 9)
  ).toLocaleString('en-US', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'USD',
  });

  const marketCapPercentageBTC = Number(
    globalData.data.market_cap_percentage.btc / 100
  ).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'percent',
  });

  const marketCapPercentageETH = Number(
    globalData.data.market_cap_percentage.eth / 100
  ).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'percent',
  });

  const cryptocurrencies = Number(globalData.data.active_cryptocurrencies).toLocaleString(
    'en-US'
  );

  return (
    <div>
      <p className='mb-2 text-lg sm:text-xl font-semibold tracking-tight leading-loose dark:text-white'>
        Cryptocurrency Prices by Market Cap
      </p>
      <p className='text-base sm:text-lg font-normal tracking-tight dark:text-white'>
        The global cryptocurrency market cap today is {marketCapText} Trillion,
        a{' '}
        <span
          className={
            globalData.data.market_cap_change_percentage_24h_usd < 0
              ? 'text-red-500'
              : 'text-green-500'
          }
        >
          {marketCapPercentage}
        </span>{' '}
        change in the last 24 hours. Total cryptocurrency trading volume in the
        last day is at {totalVolumeText} Billion. Bitcoin dominance is at{' '}
        {marketCapPercentageBTC} and Ethereum dominance is at{' '}
        {marketCapPercentageETH}. CoinGecko API is now tracking{' '}
        {cryptocurrencies} cryptocurrencies.
      </p>
      <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm dark:border-gray-700'>
          <h5 className='mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white'>
            Market Capitalization
          </h5>
          <p className='text-base font-normal text-gray-700 dark:text-gray-400'>
            {marketCap}
          </p>
        </div>
        <div className='p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm dark:border-gray-700'>
          <h5 className='mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white'>
            24h Trading Volume
          </h5>
          <p className='text-base font-normal text-gray-700 dark:text-gray-400'>
            {totalVolume}
          </p>
        </div>
        <div className='p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm dark:border-gray-700'>
          <h5 className='mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white'>
            Bitcoin Market Cap Dominance
          </h5>
          <p className='text-base font-normal text-gray-700 dark:text-gray-400'>
            {marketCapPercentageBTC}
          </p>
        </div>
        <div className='p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm dark:border-gray-700'>
          <h5 className='mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white'>
            # of Coins
          </h5>
          <p className='text-base font-normal text-gray-700 dark:text-gray-400'>
            {cryptocurrencies}
          </p>
        </div>
      </div>
    </div>
  );
};
