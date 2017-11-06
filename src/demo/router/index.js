import Home from 'containers/home';
import Work from 'containers/work';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/work/:productId',
    component: Work,
  },
];

export default routes;
