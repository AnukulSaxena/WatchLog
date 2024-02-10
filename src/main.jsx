import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './components/index.js'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import App from './App.jsx'
import {
  Detail,
  Error,
  Home, Login, Playlist, Signup, Watched, MovieCredits, Search, Profile
} from './pages'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <AuthLayout check={false}>
          <Home />
        </AuthLayout>
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/playlist",
        element: (
          <AuthLayout >
            <Playlist />
          </AuthLayout>
        )
      },
      {
        path: "/watched/:playlistId/:name",
        element: (
          <AuthLayout >
            <Watched />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: "/:mediaType/:id",
        element: (
          <AuthLayout check={false} >
            <Detail />
          </AuthLayout>
        )
      },
      {
        path: "/credits/:id/:knownFor",
        element: (
          <AuthLayout check={false}>
            <MovieCredits />
          </AuthLayout>
        )
      }, {
        path: "/search/:searchType/:query",
        element: (
          <AuthLayout check={false}>
            <Search />
          </AuthLayout>
        )
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        )
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)


