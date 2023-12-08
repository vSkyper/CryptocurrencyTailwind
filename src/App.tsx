import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Coin, Home } from 'pages';
import { Layout } from 'components';
import { useThemeContext } from 'providers';

export default function App() {
  const { darkMode } = useThemeContext();

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/coins/:id',
          element: <Coin />,
        },
      ],
    },
  ]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <RouterProvider router={router} />
    </div>
  );
}
