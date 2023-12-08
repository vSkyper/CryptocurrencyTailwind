import { useCallback } from 'react';
import { ButtonProps } from './interface';

export default function Button(props: ButtonProps) {
  const { days, daysFormatted, setDays, actualDays, mobileDisappear } = props;

  const isActualDaysColor = useCallback(() => {
    if (actualDays === days) return 'text-tertiary ';
    return 'text-primaryDark dark:text-primary ';
  }, [actualDays, days]);

  const isMobileDisappear = useCallback(() => {
    if (mobileDisappear) return 'hidden sm:block';
    return '';
  }, [mobileDisappear]);

  const handleClick = useCallback(() => {
    setDays(days);
  }, [days, setDays]);

  return (
    <button
      className={`hover:bg-secondary dark:hover:bg-secondaryDark font-bold py-2 px-4 ${isActualDaysColor()} ${isMobileDisappear()}`}
      onClick={handleClick}
    >
      {daysFormatted}
    </button>
  );
}
