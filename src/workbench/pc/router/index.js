import Home from 'pages/home';
import Work from 'pages/work';
import Application from 'pages/application';
import Manage from 'pages/manage';
import Page404 from 'pages/404';
import Search from 'pages/search';
import SearchResult from 'containers/searchResult';
import SearchOther from 'containers/searchOther';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/application',
    component: Application,
  },
  {
    path: '/manage',
    component: Manage,
    exact: true
  },
  {
    path: '/404',
    component:Page404
  },
  {
    path: '/search',
    component: Search,
    routes:[
      {
        path:'/search',
        component:SearchResult,
        exact: true
      },
      {
        path:'/search/searchlist/:type',
        component:SearchOther,
        exact: true
      }
    ]
  },
  {
    path: '/:type(app|service)/:code/:subcode?',
    component: Work,
    exact: true,
  },
];

export default routes;
