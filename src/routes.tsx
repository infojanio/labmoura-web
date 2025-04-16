import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout } from './pages/_layouts/auth'
import { NotFound } from './pages/404'

import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { LaudoView } from './pages/auth/laudo-view'
import { ReportListPage } from './pages/auth/list-reports'

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
        path: '/reports',
        element: <ReportListPage />,
      },

      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
])
