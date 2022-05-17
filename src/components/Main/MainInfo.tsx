import React, { useEffect, useState } from 'react';

const MainCryptoInfo: React.FC = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/global')
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);

  let marketCap = Number(data.total_market_cap?.usd).toLocaleString('en-US', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'USD',
  });

  let marketCapText = Number(
    data.total_market_cap?.usd / 1000000000000
  ).toLocaleString('en-US', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'USD',
  });

  let marketCapPercentage = Number(
    data.market_cap_change_percentage_24h_usd / 100
  ).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'percent',
  });

  let totalVolume = Number(data.total_volume?.usd).toLocaleString('en-US', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'USD',
  });

  let totalVolumeText = Number(
    data.total_volume?.usd / 1000000000
  ).toLocaleString('en-US', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'USD',
  });

  let marketCapPercentageBTC = Number(
    data.market_cap_percentage?.btc / 100
  ).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'percent',
  });

  let marketCapPercentageETH = Number(
    data.market_cap_percentage?.eth / 100
  ).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'percent',
  });

  let cryptocurrencies = Number(data.active_cryptocurrencies).toLocaleString(
    'en-US'
  );

  if (Object.keys(data).length !== 0) {
    return (
      <div>
        <p className='mb-2 text-xl sm:text-2xl font-semibold tracking-tight leading-loose dark:text-white'>
          Cryptocurrency Prices by Market Cap
        </p>
        <p className='text-lg sm:text-xl font-normal tracking-tight dark:text-white'>
          The global cryptocurrency market cap today is {marketCapText}{' '}
          Trillion, a{' '}
          <span
            className={
              data.market_cap_change_percentage_24h_usd < 0
                ? 'text-red-500'
                : 'text-green-500'
            }
          >
            {marketCapPercentage}
          </span>{' '}
          change in the last 24 hours. Total cryptocurrency trading volume in
          the last day is at {totalVolumeText} Billion. Bitcoin dominance is at{' '}
          {marketCapPercentageBTC} and Ethereum dominance is at{' '}
          {marketCapPercentageETH}. CoinGecko API is now tracking{' '}
          {cryptocurrencies} cryptocurrencies.
        </p>
        <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
            <h5 className='mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
              Market Capitalization
            </h5>
            <p className='text-lg font-normal text-gray-700 dark:text-gray-400'>
              {marketCap}
            </p>
          </div>
          <div className='p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
            <h5 className='mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
              24h Trading Volume
            </h5>
            <p className='text-lg font-normal text-gray-700 dark:text-gray-400'>
              {totalVolume}
            </p>
          </div>
          <div className='p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
            <h5 className='mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
              Bitcoin Market Cap Dominance
            </h5>
            <p className='text-lg font-normal text-gray-700 dark:text-gray-400'>
              {marketCapPercentageBTC}
            </p>
          </div>
          <div className='p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
            <h5 className='mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
              # of Coins
            </h5>
            <p className='text-lg font-normal text-gray-700 dark:text-gray-400'>
              {cryptocurrencies}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default MainCryptoInfo;
