import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Coin, _coin } from '../../Interfaces';

const Main: React.FC = () => {
  let { id } = useParams();

  const [coin, setCoin] = useState<Coin>(_coin);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    )
      .then((response) => response.json())
      .then((data) => {
        setCoin({
          name: data.name,
          image: data.image.large,
        });
      });
  }, []);

  return (
    <main className='container mx-auto w-11/12 my-4 sm:px-4'>
      <p className='flex items-center gap-2 mb-2 text-lg sm:text-xl font-semibold tracking-tight leading-loose dark:text-white'>
        <img src={coin.image} className='w-7' alt='logo' />
        {coin.name}
      </p>
    </main>
  );
};

export default Main;
