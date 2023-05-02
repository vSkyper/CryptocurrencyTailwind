import { SearchBar, ThemeIcon, Title } from './components';

export default function Navbar() {
  return (
    <nav className='px-2 sm:px-4 py-2.5'>
      <div className='flex flex-nowrap justify-between items-center'>
        <Title />
        <div className='flex items-center grow sm:grow-0 sm:w-80'>
          <SearchBar />
          <ThemeIcon />
        </div>
      </div>
    </nav>
  );
};