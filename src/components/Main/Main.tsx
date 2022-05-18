import React from 'react';
import MainCryptoInfo from './MainInfo';
import MainCryptoTable from './MainTable';

const Main: React.FC = () => {
  return (
    <main className='container mx-auto w-11/12 my-4 sm:px-4'>
      <MainCryptoInfo />
      <MainCryptoTable />
    </main>
  );
};

export default Main;
