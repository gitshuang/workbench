import LoginPage from 'pages/loginPage/loginPageEn';
import Service from 'pages/loginPage/loginPageEn/service';
import AboutUs from 'pages/loginPage/loginPageEn/aboutus'; //这里还用中文版本的英文翻译
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
