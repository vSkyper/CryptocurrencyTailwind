import { CardsProps } from './interface';

export default function Cards(props: CardsProps) {
  const { globalData } = props;

  const marketCap: string = globalData.data.total_market_cap.usd.toLocaleString(
    'en-US',
    {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'USD',
    }
  );

  const totalVolume: string = globalData.data.total_volume.usd.toLocaleString(
    'en-US',
    {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'USD',
    }
  );

  const marketCapPercentageBTC: string = (
    globalData.data.market_cap_percentage.btc / 100
  ).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'percent',
  });

  const cryptocurrencies: string =
    globalData.data.active_cryptocurrencies.toLocaleString('en-US');

  return (
    <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      <div className='p-4 sm:p-6 rounded-lg border border-secondary shadow-sm dark:border-secondaryDark'>
        <div className='mb-2 text-lg font-semibold tracking-tight text-primaryDark dark:text-primary'>
          Market Capitalization
        </div>
        <div className='text-base font-normal text-secondaryDark dark:text-secondary'>
          {marketCap}
        </div>
      </div>
      <div className='p-4 sm:p-6 rounded-lg border border-secondary shadow-sm dark:border-secondaryDark'>
        <div className='mb-2 text-lg font-semibold tracking-tight text-primaryDark dark:text-primary'>
          24h Trading Volume
        </div>
        <div className='text-base font-normal text-secondaryDark dark:text-secondary'>
          {totalVolume}
        </div>
      </div>
      <div className='p-4 sm:p-6 rounded-lg border border-secondary shadow-sm dark:border-secondaryDark'>
        <div className='mb-2 text-lg font-semibold tracking-tight text-primaryDark dark:text-primary'>
          Bitcoin Market Cap Dominance
        </div>
        <div className='text-base font-normal text-secondaryDark dark:text-secondary'>
          {marketCapPercentageBTC}
        </div>
      </div>
      <div className='p-4 sm:p-6 rounded-lg border border-secondary shadow-sm dark:border-secondaryDark'>
        <div className='mb-2 text-lg font-semibold tracking-tight text-primaryDark dark:text-primary'>
          # of Coins
        </div>
        <div className='text-base font-normal text-secondaryDark dark:text-secondary'>
          {cryptocurrencies}
        </div>
      </div>
    </div>
  );
}
