import Home from 'pages/home/index';
import Work from 'pages/work';
import Application from 'pages/application';

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
  {
    path: '/application',
    component: Application,
  },
];

export default routes;
