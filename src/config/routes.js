import CreateRecord from '../pages/createRecord/CreateRecord';
import Home from '../pages/home/Home';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/create',
    element: <CreateRecord />,
  },
];

export default routes;
