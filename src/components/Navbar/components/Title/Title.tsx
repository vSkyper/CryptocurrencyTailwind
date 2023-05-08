import { Link } from 'react-router-dom';

export default function Title() {
  return (
    <Link className='flex items-center mr-4 grow-0' to='/'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-8 w-8 mr-3 text-primaryDark dark:text-primary'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 3h6m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
      <span className='hidden text-xl font-semibold sm:block text-primaryDark dark:text-primary'>
        Cryptocurrency
      </span>
    </Link>
  )
}