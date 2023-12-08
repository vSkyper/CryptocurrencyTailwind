import { createContext, useContext, useMemo, useState } from 'react';
import { IThemeContext, ThemeProviderProps } from './theme.types';

export const ThemeContext = createContext<IThemeContext>(undefined!);
const { Provider } = ThemeContext;

export function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props;
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem('localTheme')
      ? JSON.parse(localStorage.getItem('localTheme') || '{}')
      : true
  );

  useMemo(() => {
    localStorage.setItem('localTheme', JSON.stringify(darkMode));

    switch (darkMode) {
      case true:
        document.body.setAttribute('class', 'bg-primaryDark');
        break;
      default:
      case false:
        document.body.setAttribute('class', 'bg-primary');
        break;
    }
  }, [darkMode]);

  const value = useMemo(
    () => ({
      darkMode,
      setDarkMode,
    }),
    [darkMode]
  );

  return <Provider value={value}>{children}</Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be uset within an ThemeProvider!');
  }
  return context;
};
