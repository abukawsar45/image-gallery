import { createBrowserRouter } from 'react-router-dom';
import Home from '../Home/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

export default router;
