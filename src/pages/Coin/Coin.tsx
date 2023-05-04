import { useParams } from 'react-router-dom';
import { ICoin } from '../../interfaces';
import useFetch from '../../hooks/useFetch';
import { ErrorModal, LoadingModal } from '../../components';
import { Sparkline } from './components';

export default function Coin() {
  let { id } = useParams();

  const { data, error } = useFetch<ICoin>(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );

  if (!id || error) return <ErrorModal />

  if (!data) return <LoadingModal />

  console.log(data.market_data.current_price)

  return (
    <main className='container mx-auto w-11/12 my-4 sm:px-4'>
      <div className='flex items-center gap-2 mb-3.5 text-xl sm:text-2xl font-semibold tracking-tight dark:text-white'>
        <img src={data.image.large} className='w-8' alt='logo' />
        <div>{data.name} <span className="text-base sm:text-lg text-gray-500 dark:text-gray-400">{data.symbol.toUpperCase()}</span></div>
      </div>
      <div className='flex gap-3 text-2xl sm:text-3xl font-bold dark:text-white'>
        <div>
          {Number(data.market_data.current_price.usd).toLocaleString(
            'en-US',
            {
              minimumFractionDigits: 0,
              maximumFractionDigits: 8,
              style: 'currency',
              currency: 'USD',
            }
          )}
        </div>
        <div>
          {(data.market_data.price_change_percentage_24h / 100
          ).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'percent',
          })}
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-7'>
        <Sparkline id={id} />
      </div>
    </main >
  );
};
