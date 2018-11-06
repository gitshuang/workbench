import LoginPage from 'pages/loginPage';
import Service from 'pages/loginPage/service';
import AboutUs from 'pages/loginPage/aboutus';
const loginRoutes = [
    {
      path: '/',
      component:LoginPage,
      exact: true,
    },
    {
      path:'/service/:lan',
      component:Service,
    },
    {
      path:'/aboutus',
      component:AboutUs,
    }
  ]

export default loginRoutes;