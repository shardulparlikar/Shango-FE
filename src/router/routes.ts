import type { RouteRecordRaw } from 'vue-router'
import Login from '../components/Login.vue'
import RecruiterSignUp from '../recruiter/RecruiterSignUp.vue'
import TalentSignUp from '../talent/TalentSignUp.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  // Recruiter routes
  {
    path: '/recruiter',
    redirect: { name: 'recruiterSignUp' },
    children: [
      {
        path: 'sign-up', 
        name: 'recruiterSignUp',
        component: RecruiterSignUp,
      },
    ],
  },
  // Talent routes
  {
    path: '/talent',
    redirect: { name: 'talentSignUp' },
    children: [
      {
        path: 'sign-up',
        name: 'talentSignUp',
        component: TalentSignUp,
      },
    ],
  },
]

export default routes
