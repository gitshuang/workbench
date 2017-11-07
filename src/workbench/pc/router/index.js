import Home from 'pages/home';
import Work from 'pages/work';

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
