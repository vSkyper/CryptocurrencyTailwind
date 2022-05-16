import { createContext, useContext } from 'react';

export type NavContent = {
  themeMode: boolean;
  setThemeMode: (themeMode: boolean) => void;
};

export const NavContext = createContext<NavContent>({
  themeMode: true,
  setThemeMode: () => {},
});

export const useNavContext = () => useContext(NavContext);
