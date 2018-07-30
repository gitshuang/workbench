import LoginPage from 'pages/loginPage';
import Service from 'pages/loginPage/service';

const loginRoutes = [
    {
      path: '/',
      component:LoginPage,
      exact: true,
    },
    {
      path:'/service',
      component:Service,
    }
  ]

export default loginRoutes;