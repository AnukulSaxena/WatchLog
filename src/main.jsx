import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './components/index.js'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import App from './App.jsx'
import { Detail, Home, Login, Playlist, Signup, Watched, MovieCredits, Search } from './pages'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
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
          <AuthLayout authentication>
            <Playlist />
          </AuthLayout>
        )
      },
      {
        path: "/watched",
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
          <AuthLayout authentication>
            <Detail />
          </AuthLayout>
        )
      },
      {
        path: "/credits/:id/:knownFor",
        element: (
          <AuthLayout authentication>
            <MovieCredits />
          </AuthLayout>
        )
      }, {
        path: "/search/:searchType/:query",
        element: (
          <AuthLayout authentication>
            <Search />
          </AuthLayout>
        )
      },

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
