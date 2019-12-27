
const routes = [
  {
    path: '/home',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Login.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/meusdados',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/meusDados.vue') }
    ]
  },
  {
    path: '/meuscupons',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/cupons.vue') }
    ]
  },
  {
    path: '/doe',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Doacao.vue') }
    ]
  },
  {
    path: '/doe/list',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HistoricoDoacao.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
