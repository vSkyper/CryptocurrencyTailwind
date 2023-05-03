interface Props {
  setDays: React.Dispatch<React.SetStateAction<string>>;
  actualDays: string;
  days: string;
  daysFormatted: string;
}

export default function Button({ setDays, actualDays, days, daysFormatted }: Props) {
  return (
    <button
      className={'hover:bg-gray-300 dark:hover:bg-gray-700 font-bold py-2 px-4 ' + (actualDays === days ? 'text-blue-500' : 'dark:text-white')}
      onClick={() => setDays(days)}
    >
      {daysFormatted}
    </button>
  )
}