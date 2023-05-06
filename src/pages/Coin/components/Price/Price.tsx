import { IMarketData } from "interfaces";


interface Props {
  marketData: IMarketData;
};

export default function Price({ marketData }: Props) {
  return (
    <div className='flex items-baseline gap-3 font-bold dark:text-white'>
      <div className='text-2xl sm:text-3xl'>
        {(marketData.current_price?.usd || 0).toLocaleString(
          'en-US',
          {
            minimumFractionDigits: 0,
            maximumFractionDigits: 8,
            style: 'currency',
            currency: 'USD',
          }
        )}
      </div>
      <div className={'text-xl sm:text-2xl ' + (
        (marketData.price_change_percentage_24h || 0) < 0
          ? 'text-red-500'
          : 'text-green-500')}>
        {((marketData.price_change_percentage_24h || 0) / 100
        ).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          style: 'percent',
        })}
      </div>
    </div>
  )
}