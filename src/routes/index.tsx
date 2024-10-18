import React from 'react';
import { createBrowserRouter } from "react-router-dom";

const Home = React.lazy(() => import('@/screens/Home'));
const Document = React.lazy(() => import('@/screens/Document'));
const Error = React.lazy(() => import('@/screens/Error'));

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
