import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import QuadrosView from '@/views/QuadrosView.vue'
import { supabase } from '@/clients/supabase'
import QuadroDetailView from '@/views/QuadroDetailView.vue'

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
    }

  ]
})


//get user
async function getUser(next){
  localUser = await supabase.auth.getSession();

  //se usuario tentar entrar em pagina que precisa de autenticacao e nao estiver logado, redireciona para login
  if(localUser.data.session == null){
   next('/login'); 
  } else {
    next();
  }
}


//* auth verification -> verifica o auth toda vez q usuario mudar para pagina que precisa de autenticacao e chama o getUser
// to -> para onde o usuario esta indo
// from -> de onde o usuario esta vindo
// next -> funcao que chama o proximo middleware

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    getUser(next);
  } else {
    next();
  }
})

export default router
