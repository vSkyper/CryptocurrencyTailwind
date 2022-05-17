import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Main from './components/Main/Main';
import Nav from './components/Nav';
import { ThemeContext } from './Context';

const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<boolean>(
    localStorage.getItem('localTheme')
      ? JSON.parse(localStorage.getItem('localTheme') || '{}')
      : true
  );

  useEffect(() => {
    localStorage.setItem('localTheme', JSON.stringify(themeMode));
  }, [themeMode]);

  useEffect(() => {
    if (themeMode) {
      document.body.setAttribute('class', 'bg-gray-800');
    } else {
      document.body.setAttribute('class', 'bg-white');
    }
  }, [themeMode]);

  return (
    <div className={themeMode ? 'dark' : ''}>
      <Router basename={process.env.PUBLIC_URL}>
        <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
          <Nav />
        </ThemeContext.Provider>
        <Routes>
          <Route
            path='/'
            element={
              <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
                <Main />
              </ThemeContext.Provider>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
