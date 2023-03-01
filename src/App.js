import React from 'react';
import Home from './Home';
import Ratings from './Ratings';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/ratings",
    element: <Ratings />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
