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

  return (
    <main className='container mx-auto w-11/12 my-4 sm:px-4'>
      <p className='flex items-center gap-2 mb-2 text-xl sm:text-2xl font-semibold tracking-tight leading-loose dark:text-white'>
        <img src={data.image.large} className='w-8' alt='logo' />
        {data.name}
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-7'>
        <Sparkline id={id} />
      </div>
    </main >
  );
};
