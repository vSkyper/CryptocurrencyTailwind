import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='p-4 md:flex md:items-center md:justify-between md:p-6'>
      <span className='text-sm text-secondaryDark sm:text-center dark:text-secondary'>
        © 2023{' '}
        <Link className='hover:underline' to='/'>
          Cryptocurrency
        </Link>
        . All Rights Reserved.
      </span>
      <div className='flex flex-wrap items-center mt-3 text-sm text-secondaryDark dark:text-secondary sm:mt-0'>
        <span>
          Powered by{' '}
          <a href='https://www.coingecko.com' className='hover:underline'>
            CoinGecko API
          </a>
        </span>
      </div>
    </footer>
  );
}
