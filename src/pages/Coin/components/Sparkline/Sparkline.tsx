import { useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { ISparkline } from "../../../../interfaces";
import { ErrorModal, LoadingModal } from "../../../../components";
import { format } from "date-fns";
import { buttons } from "../../../../constants";
import { Button, Chart } from "./components";

interface Props {
  id: string;
}

export default function Sparkline({ id }: Props) {
  const [days, setDays] = useState<string>('7');

  const { data, error } = useFetch<ISparkline>(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  );

  if (error) return <ErrorModal />

  if (!data) return <LoadingModal />

  const sparkline = data?.prices.map((data) => ({
    date: format(new Date(data[0]), 'MMM d y, hh:mm:ss a'),
    value: data[1],
  }));

  return (
    <div>
      <div className='inline-flex'>
        {buttons.map((button) => (
          <Button key={button.days} {...button} setDays={setDays} actualDays={days} />
        ))}
      </div>
      <div className='w-11/12 h-96 mt-5'>
        <Chart sparkline={sparkline} days={days} />
      </div>
    </div>
  );
}