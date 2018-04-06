import Home from 'pages/home';
import Work from 'pages/work';
import Application from 'pages/application';
import Manage from 'pages/manage';
import Page404 from 'pages/404';
import Search from 'pages/search';
import SearchResult from 'containers/searchResult';
import SearchOther from 'containers/searchOther';
import Establish from 'pages/establish';
import EstablishUserCenter from 'pages/establishusercenter';
import CreateTeam from 'pages/createteam';
import CreateEnter from 'pages/createenter';
import EnterSetting from 'pages/entersetting';
import Invitation from 'pages/invitation';
import Account from 'pages/account';
import Teamconfig from 'pages/teamconfig';
import UpdateEnter from 'pages/updateenter';
import Market from 'pages/market';
import Renew from 'pages/renew';
import UserInfo from 'pages/userinfo';

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
    path: '/establishusercenter',
    component: EstablishUserCenter
  },
  {
    path: '/createteam/:data',
    component: CreateTeam
  },
  {
    path: '/teamconfig',
    component: Teamconfig
  },
  {
    path: '/updateenter',
    component: UpdateEnter
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
    path: '/entersetting/:data',
    component: EnterSetting,
  },
  {
    path: '/search',
    component: Search,
    routes:[
      {
        path:'/search/searchValue/:value',
        component:SearchResult,
        exact: true,
      },
      {
        path:'/search/searchValue/',
        component:SearchResult,
        exact: true,
      },
      {
        path:'/search/searchlist/:value',
        component:SearchOther,
        exact: true,
      },
      {
        path:'/search/searchlist/',
        component:SearchOther,
        exact: true,
      }
      
    ]
  },
  {
    path: '/:type(app|service)/:code/:subcode?',
    component: Work,
  },
  {
    path: '/account',
    component: Account,
  },
  {
    path: '/userinfo',
    component: UserInfo,
  },
  {
    path: '/404',
    component:Page404
  },
  {
    path: '/market',
    component: Market,
  },
  {
    path: '/renew/:id',
    component: Renew
  }
];

export default routes;
