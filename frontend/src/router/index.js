import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/auth/Register'
import Login from "../views/auth/Login"
import PanelAdmin from '../views/admin/PanelAdmin'
import DetailUser from '../views/admin/DetailUser'
import EditUser from '../views/admin/EditUser'
import CreateUser from '../views/admin/CreateUser'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  //routes auth
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/panel_admin',
    name: 'PanelAdmin',
    component: PanelAdmin
  },
  {
    path: '/detail_user/:id',
    name: 'DetailUser',
    component: DetailUser
  },
  {
    path: '/edit_user/:id',
    name: 'EditUser',
    component: EditUser
  },
  {
    path: '/create_user',
    name: 'CreateUser',
    component: CreateUser
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
