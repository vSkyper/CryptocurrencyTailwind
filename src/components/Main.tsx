import React, { useEffect, useState } from 'react';

const Main: React.FC = () => {
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

  if (Object.keys(data).length != 0) {
    return (
      <main className='mx-4 sm:container sm:mx-auto my-4'>
        <article className='prose dark:prose-invert md:prose-lg lg:prose-xl max-w-none'>
          <h4>Cryptocurrency Prices by Market Cap</h4>
          <h5>
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
            the last day is at {totalVolumeText} Billion. Bitcoin dominance is
            at {marketCapPercentageBTC} and Ethereum dominance is at{' '}
            {marketCapPercentageETH}. CoinGecko API is now tracking{' '}
            {cryptocurrencies} cryptocurrencies.
          </h5>
        </article>
      </main>
    );
  }

  return <div></div>;
};

export default Main;
