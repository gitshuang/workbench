import Home from 'pages/home';
import Work from 'pages/work';
import Application from 'pages/application';
import Manage from 'pages/manage';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/:type/:code',
    component: Work,
  },
  {
    path: '/application',
    component: Application,
  },
  {
    path: '/manage',
    component: Manage,
  },
];

export default routes;
