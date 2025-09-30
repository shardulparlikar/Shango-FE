import type { RouteRecordRaw } from 'vue-router'
import Login from '../components/Login.vue'
import RecruiterHomePage from '../recruiter/RecruiterSignUp.vue'
import TalentHomePage from '../talent/TalentSignUp.vue'
import SignUp from '../components/SignUp.vue'


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUp,
  },
  // Recruiter routes
  {
    path: '/recruiter',
    redirect: { name: 'RecruiterHomePage' },
    children: [
      {
        path: 'homePage',
        name: 'RecruiterHomePage',
        component: RecruiterHomePage,
      },
    ],
  },
  // Talent routes
  {
    path: '/talent',
    redirect: { name: 'TalentHomePage' },
    children: [
      {
        path: 'homePage',
        name: 'TalentHomePage',
        component: TalentHomePage,
      },
    ],
  },
]

export default routes
