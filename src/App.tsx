import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Coin from './pages/Coin/Coin';
import { ThemeContext } from './store';
import { Footer, Navbar } from './components';
import { Home } from './pages';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem('localTheme')
      ? JSON.parse(localStorage.getItem('localTheme') || '{}')
      : true
  );

  useEffect(() => {
    localStorage.setItem('localTheme', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    switch (darkMode) {
      case true:
        document.body.setAttribute('class', 'bg-gray-800');
        break;
      case false:
        document.body.setAttribute('class', 'bg-white');
        break;
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router basename={process.env.PUBLIC_URL}>
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
          <Navbar />
        </ThemeContext.Provider>
        <Routes>
          <Route
            path='/'
            element={
              <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
                <Home />
              </ThemeContext.Provider>
            }
          />
          <Route path='/coins/:id' element={<Coin />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};
