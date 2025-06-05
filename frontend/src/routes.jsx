// import { Blog } from './pages/Blog.js'
// import { Signup } from './pages/Signup.js'
// import { Login } from './pages/Login.js'

export const routes = [
  {
    path: '/',
    lazy: async () =>
      import('./pages/Blog.js').then((mod) => ({
        Component: mod.Signup,
      })),
  },
  {
    path: '/signup',
    lazy: () =>
      import('./pages/Signup.js').then((mod) => ({
        Component: mod.Signup,
      })),
  },
  {
    path: '/login',
    lazy: () =>
      import('./pages/Login.js').then((mod) => ({
        Component: mod.Login,
      })),
  },
]
