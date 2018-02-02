import Home from 'pages/home';
import Work from 'pages/work';
import Application from 'pages/application';
import Manage from 'pages/manage';
import Page404 from 'pages/404';
import Search from 'pages/search';
import SearchResult from 'containers/searchResult';
import SearchOther from 'containers/searchOther';
import Establish from 'pages/establish';
import CreateTeam from 'pages/createteam';
import CreateEnter from 'pages/createenter';
import Invitation from 'pages/invitation';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/establish',
    component: Establish
  },
  {
    path: '/createteam/:data',
    component: CreateTeam
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
    path: '/invitation',
    component: Invitation,
  },
  {
    path: '/createenter/:data',
    component: CreateEnter,
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

];

export default routes;
