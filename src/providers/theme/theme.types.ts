import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface ThemeProviderProps {
  children: ReactNode;
}

export interface IThemeContext {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}
