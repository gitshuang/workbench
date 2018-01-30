import Home from 'pages/home';
import Work from 'pages/work';
import Application from 'pages/application';
import Manage from 'pages/manage';
import Page404 from 'pages/404';
import Search from 'pages/search';
import SearchResult from 'containers/searchResult';
import SearchOther from 'containers/searchOther';
import Establish from 'pages/establish';
import CreareTeam from 'pages/createteam';

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
  },
  {
    path: '/search',
    component: Search,
    routes:[
      {
        path:'/search/:value',
        component:SearchResult,
        exact: true,
      },
      {
        path:'/search/searchlist',
        component:SearchOther,
      }
    ]
  },
  {
    path: '/:type(app|service)/:code/:subcode?',
    component: Work,
  },
  {
    path: '/404',
    component:Page404
  },
  {
    path: '/establish',
    component: Establish
  },
  {
    path: '/creareteam',
    component: CreareTeam
  },
  {
    component:Page404
  },
];

export default routes;
