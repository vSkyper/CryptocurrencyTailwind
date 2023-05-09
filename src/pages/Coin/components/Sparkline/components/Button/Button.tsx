interface Props {
  setDays: React.Dispatch<React.SetStateAction<string>>;
  actualDays: string;
  days: string;
  daysFormatted: string;
  mobileDisappear: boolean;
}

export default function Button({
  setDays,
  actualDays,
  days,
  daysFormatted,
  mobileDisappear,
}: Props) {
  return (
    <button
      className={
        'hover:bg-secondary dark:hover:bg-secondaryDark font-bold py-2 px-4 ' +
        (actualDays === days
          ? 'text-tertiary '
          : 'text-primaryDark dark:text-primary ') +
        (mobileDisappear ? 'hidden sm:block' : '')
      }
      onClick={() => setDays(days)}
    >
      {daysFormatted}
    </button>
  );
}
