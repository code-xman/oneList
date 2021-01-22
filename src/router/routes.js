const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'home', component: () => import('pages/Index.vue') },
      { path: 'page1', component: () => import('pages/menu1/page1.vue') },
      { path: 'page2', component: () => import('pages/menu1/page2.vue') },
      { path: 'page3', component: () => import('pages/menu1/page3.vue') },
      { path: 'setting', component: () => import('pages/menu1/setting.vue') },
      {
        path: 'saveReadFile',
        component: () => import('pages/menu1/saveReadFile.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
