import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { NotFound } from './pages/404'

import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { LaudoView } from './pages/auth/laudo-view'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },

      {
        path: '/reports/:id',
        element: <LaudoView />,
      },

      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
])
