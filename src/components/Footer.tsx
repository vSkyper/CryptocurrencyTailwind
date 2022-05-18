import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className='p-4 md:flex md:items-center md:justify-between md:p-6'>
      <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
        © 2022{' '}
        <Link className='hover:underline' to='/'>
          Cryptocurrency
        </Link>
        . All Rights Reserved.
      </span>
      <div className='flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0'>
        <span>
          Powered by{' '}
          <a href='https://www.coingecko.com' className='hover:underline'>
            CoinGecko API
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
