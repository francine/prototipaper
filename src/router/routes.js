
const routes = [
  {
    path: '/:path(.*)*',
    component: () => import('layouts/PaperLayout.vue'),
    children: [
      {
        path: '/demo/:routeName',
        props: { demonstrationMode: true },
        component: () => import('pages/Page.vue')
      },
      { path: '', component: () => import('pages/Page.vue') }
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
