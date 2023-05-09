import { useState } from 'react';
import { format } from 'date-fns';
import { Button, Chart } from './components';
import { ISparkline } from 'interfaces';
import useFetch from 'hooks/useFetch';
import { ErrorModal, LoadingModal } from 'components';
import { buttons } from 'constants/coin';

interface Props {
  id: string;
}

export default function Sparkline({ id }: Props) {
  const [days, setDays] = useState<string>('7');

  const { data, error } = useFetch<ISparkline>(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  );

  if (error) return <ErrorModal />;

  if (!data) return <LoadingModal />;

  const sparkline = data?.prices.map((data) => ({
    date: format(new Date(data[0]), 'MMM d y, hh:mm:ss a'),
    value: data[1],
  }));

  return (
    <div>
      <div className='flex flex-wrap'>
        {buttons.map((button) => (
          <Button
            key={button.days}
            {...button}
            setDays={setDays}
            actualDays={days}
          />
        ))}
      </div>
      <div className='h-52 sm:h-96 mt-5'>
        <Chart sparkline={sparkline} days={days} />
      </div>
    </div>
  );
}
