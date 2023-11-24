import MainLayout from '@layouts/MainLayout';
import Add from '@pages/Add';
import Edit from '@pages/Edit';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Profile from '@pages/Profile';
import Register from '@pages/Register';
import Rokok from '@pages/Rokok';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: true,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/rokok/:id',
    name: 'detailRokok',
    protected: true,
    component: Rokok,
    layout: MainLayout,
  },
  {
    path: '/profile',
    name: 'profile',
    protected: true,
    component: Profile,
    layout: MainLayout,
  },
  {
    path: '/edit/:id',
    name: 'edit',
    protected: true,
    component: Edit,
    layout: MainLayout,
  },
  {
    path: '/add',
    name: 'add',
    protected: true,
    component: Add,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'login',
    protected: false,
    component: Login,
    layout: MainLayout,
  },
  {
    path: '/register',
    name: 'register',
    protected: false,
    component: Register,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
