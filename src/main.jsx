import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx';
import Playlist from './pages/Playlist.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Watched from './pages/Watched.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "playlist",
        element: <Playlist />
      },
      {
        path: "watched",
        element: <Watched />
      },
      {
        path: "signup",
        element: <Signup />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
