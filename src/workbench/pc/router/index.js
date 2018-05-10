import Home from 'pages/home';
import asyncComponent from './lazyload';

// import Work from 'pages/work';
// import Application from 'pages/application';
// import Manage from 'pages/manage';
// import Page404 from 'pages/404';
// import Search from 'pages/search';
// import SearchResult from 'containers/searchResult';
// import SearchOther from 'containers/searchOther';
// import Establish from 'pages/establish';
// import EstablishUserCenter from 'pages/establishusercenter';
// import CreateTeam from 'pages/createteam';
// import CreateEnter from 'pages/createenter';
// import EnterSetting from 'pages/entersetting';
// import Invitation from 'pages/invitation';
// import Account from 'pages/account';
// import Teamconfig from 'pages/teamconfig';
// import UpdateEnter from 'pages/updateenter';
// import Market from 'pages/market';
// import Renew from 'pages/renew';
// import UserInfo from 'pages/userinfo';

const Work = asyncComponent(() => import(/* webpackChunkName: "Work" */'pages/work'));
const Application = asyncComponent(() => import(/* webpackChunkName: "Application" */'pages/application'));
const Manage = asyncComponent(() => import(/* webpackChunkName: "Manage" */'pages/manage'));
const Page404 = asyncComponent(() => import(/* webpackChunkName: "Page404" */'pages/404'));
const Search = asyncComponent(() => import(/* webpackChunkName: "Search" */'pages/search'));
const SearchResult = asyncComponent(() => import(/* webpackChunkName: "SearchResult" */'containers/searchResult'));
const SearchOther = asyncComponent(() => import(/* webpackChunkName: "SearchOther" */'containers/searchOther'));
const Establish = asyncComponent(() => import(/* webpackChunkName: "Establish" */'pages/establish'));
const EstablishUserCenter = asyncComponent(() => import(/* webpackChunkName: "EstablishUserCenter" */'pages/establishusercenter'));
const CreateTeam = asyncComponent(() => import(/* webpackChunkName: "CreateTeam" */'pages/createteam'));
const CreateEnter = asyncComponent(() => import(/* webpackChunkName: "CreateEnter" */'pages/createenter'));
const EnterSetting = asyncComponent(() => import(/* webpackChunkName: "EnterSetting" */'pages/entersetting'));
const Invitation = asyncComponent(() => import(/* webpackChunkName: "Invitation" */'pages/invitation'));
const Account = asyncComponent(() => import(/* webpackChunkName: "Account" */'pages/account'));
const Teamconfig = asyncComponent(() => import(/* webpackChunkName: "Teamconfig" */'pages/teamconfig'));
const UpdateEnter = asyncComponent(() => import(/* webpackChunkName: "UpdateEnter" */'pages/updateenter'));
const Market = asyncComponent(() => import(/* webpackChunkName: "Market" */'pages/market'));
const Renew = asyncComponent(() => import(/* webpackChunkName: "Renew" */'pages/renew'));
const UserInfo = asyncComponent(() => import(/* webpackChunkName: "UserInfo" */'pages/userinfo'));

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/establish',
    component: Establish,
  },
  {
    path: '/establishusercenter',
    component: EstablishUserCenter,
  },
  {
    path: '/createteam/:data',
    component: CreateTeam,
  },
  {
    path: '/teamconfig',
    component: Teamconfig,
  },
  {
    path: '/updateenter',
    component: UpdateEnter,
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
    routes: [
      {
        path: '/search/searchValue/:value',
        component: SearchResult,
        exact: true,
      },
      {
        path: '/search/searchValue/',
        component: SearchResult,
        exact: true,
      },
      {
        path: '/search/searchlist/:value',
        component: SearchOther,
        exact: true,
      },
      {
        path: '/search/searchlist/',
        component: SearchOther,
        exact: true,
      },
    ],
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
    component: Page404,
  },
  {
    path: '/market',
    component: Market,
  },
  {
    path: '/renew/:id',
    component: Renew,
  },
];

export default routes;
