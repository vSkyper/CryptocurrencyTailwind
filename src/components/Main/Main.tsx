import React from 'react';
import MainCryptoInfo from './MainInfo';
import MainCryptoTable from './MainTable';

const Main: React.FC = () => {
  return (
    <main className='container mx-auto px-4'>
      <MainCryptoInfo />
      <MainCryptoTable />
    </main>
  );
};

export default Main;
