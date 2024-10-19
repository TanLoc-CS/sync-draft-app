import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Home from '@/screens/Home';
import Document from '@/screens/Document';
import Error from '@/screens/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/:docId',
    element: <Document/>,
    errorElement: <Error/>
  }
]);

export default router;
