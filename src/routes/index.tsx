import { createBrowserRouter } from "react-router-dom";

import Home from '@/screens/Home';
import Document from '@/screens/Document';
import Error from '@/screens/Error';
import OnBoarding from "@/screens/OnBoarding";
import { RequiredAuth } from '@/components/hoc/protected-route';

const router = createBrowserRouter([
  {
    path: '/',
    element: <OnBoarding/>,
  },
  {
    path: '/document',
    element: <RequiredAuth children={Home}/>,
  },
  {
    path: '/document/:docId',
    element: <RequiredAuth children={Document}/>,
    errorElement: <Error/>
  }
]);

export default router;
