import useFetch from 'hooks/useFetch';
import { ICoinsList } from 'interfaces';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SearchBar() {
  const [searchFocus, setSearchFocus] = useState(false);

  const [searchResult, setSearchResult] = useState<ICoinsList[]>([]);

  const { data, error } = useFetch<ICoinsList[]>(
    'https://api.coingecko.com/api/v3/coins/list?include_platform=false'
  );

  const autocompleteMatch = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (!e.currentTarget.value || error || !data) {
        return [];
      }

      const reg = new RegExp(`^${e.currentTarget.value}`, 'i');
      return data.filter((term: ICoinsList) => {
        if (reg.test(term.name) || reg.test(term.symbol)) {
          return term;
        }
        return false;
      });
    },
    [error, data]
  );

  const showResults = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setSearchResult(autocompleteMatch(e));
    },
    [autocompleteMatch]
  );

  const handleFocus = useCallback(() => {
    setSearchFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setSearchFocus(false);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className='w-full relative'>
      <div className='flex absolute inset-y-0 items-center pl-3 pointer-events-none'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 text-secondaryDark dark:text-secondary'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </div>
      <input
        type='text'
        className='focus:outline-none p-1.5 pl-10 pr-3.5 w-full text-primaryDark dark:text-primary bg-primary rounded-lg ring sm:text-sm focus:ring-tertiary dark:bg-primaryDark placeholder-secondaryDark dark:placeholder-secondary'
        placeholder='Search...'
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={showResults}
      />
      {searchResult.length !== 0 && searchFocus && (
        <div className='absolute inset-x-0 bg-primary mt-1 rounded shadow dark:bg-primaryDark'>
          <ul className='overflow-y-scroll overflow-x-hidden custom-scroll max-h-52 text-sm text-secondaryDark dark:text-secondary'>
            {searchResult.map((term: ICoinsList) => (
              <Link
                key={term.id}
                to={`/coins/${term.id}`}
                onMouseDown={handleMouseDown}
              >
                <li className='px-4 py-2 hover:bg-secondary dark:hover:bg-secondaryDark '>
                  {term.name} ({term.symbol.toUpperCase()})
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
