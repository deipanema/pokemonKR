import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import AllPokemons from './pages/AllPokemons';
import PokemonDetail from './pages/PokemonDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <AllPokemons /> },
      { path: 'pokemons', element: <AllPokemons /> },
      { path: 'pokemons/:id', element: <PokemonDetail /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
