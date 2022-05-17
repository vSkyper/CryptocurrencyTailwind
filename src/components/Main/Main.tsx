import React from 'react';
import MainCryptoInfo from './MainInfo';
import MainCryptoTable from './MainTable';

const Main: React.FC = () => {
  return (
    <main className='m-4 sm:container sm:mx-auto'>
      <MainCryptoInfo />
      <MainCryptoTable />
    </main>
  );
};

export default Main;
