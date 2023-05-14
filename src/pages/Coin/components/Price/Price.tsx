import { IMarketData } from 'interfaces';
import { useCallback } from 'react';

interface Props {
  marketData: IMarketData;
}

export default function Price({ marketData }: Props) {
  const priceChangeColor = useCallback(() => {
    if ((marketData.price_change_percentage_24h || 0) < 0) return 'text-error';
    return 'text-success';
  }, [marketData.price_change_percentage_24h]);

  return (
    <div className='flex items-baseline gap-3 font-bold text-primaryDark dark:text-primary'>
      <div className='text-2xl sm:text-3xl'>
        {(marketData.current_price?.usd || 0).toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 8,
          style: 'currency',
          currency: 'USD',
        })}
      </div>
      <div className={`text-xl sm:text-2xl ${priceChangeColor()}`}>
        {((marketData.price_change_percentage_24h || 0) / 100).toLocaleString(
          'en-US',
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'percent',
          }
        )}
      </div>
    </div>
  );
}
