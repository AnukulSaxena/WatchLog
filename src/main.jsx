import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './components/index.js'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import App from './App.jsx'
import { Detail, Home, Login, Playlist, Signup, Watched, MovieCredits, Search, Profile } from './pages'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AuthLayout authentication={false}>
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
          <AuthLayout authentication={false}>
            <Playlist />
          </AuthLayout>
        )
      },
      {
        path: "/watched/:playlistId",
        element: (
          <AuthLayout authentication>
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
          <AuthLayout authentication={false}>
            <Detail />
          </AuthLayout>
        )
      },
      {
        path: "/credits/:id/:knownFor",
        element: (
          <AuthLayout authentication={false}>
            <MovieCredits />
          </AuthLayout>
        )
      }, {
        path: "/search/:searchType/:query",
        element: (
          <AuthLayout authentication={false}>
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
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // {/* </React.StrictMode>, */}
)
