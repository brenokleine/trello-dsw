import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import QuadrosView from '@/views/QuadrosView.vue'
import { supabase } from '@/clients/supabase'
import QuadroDetailView from '@/views/QuadroDetailView.vue'
import UpdatePasswordView from '@/views/UpdatePasswordView.vue'

let localUser;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/quadros',
      name: 'quadros',
      component: QuadrosView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/quadros/:id',
      name: 'quadroDetail',
      component: QuadroDetailView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/update-password',
      name: 'update-password',
      component: UpdatePasswordView,
      meta: {
        requiresAuth: true
      }
    }
  ]
})


//get user
async function getUser() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}



//* auth verification -> verifica o auth toda vez q usuario mudar para pagina que precisa de autenticacao e chama o getUser
// to -> para onde o usuario esta indo
// from -> de onde o usuario esta vindo
// next -> funcao que chama o proximo middleware

router.beforeEach(async (to, from, next) => {
  const session = await getUser();

  // Redirect logged-in users away from login page
  if (to.path === '/login' && session) {
    next('/quadros');
    return;
  }

  // Redirect unauthenticated users trying to access protected routes
  if (to.meta.requiresAuth && !session) {
    next('/login');
    return;
  }

  // Proceed as usual for other routes
  next();
});


export default router
