import Home from 'pages/home';
import Work from 'pages/work';
import Application from 'pages/application';
import Manage from 'pages/manage';
import Page404 from 'pages/404';

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
  {
    path: '/404',
    component:Page404
  }
];

export default routes;
