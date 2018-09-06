import LoginPage from 'pages/loginPageEn';
import Service from 'pages/loginPageEn/service';
import AboutUs from 'pages/loginPageEn/aboutus';
const loginRoutes = [
    {
      path: '/',
      component:LoginPage,
      exact: true,
    },
    {
      path:'/service',
      component:Service,
    },
    {
      path:'/aboutus',
      component:AboutUs,
    }
  ]

export default loginRoutes;
