import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import UserLogin from './components/UserLogin/UserLogin.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx';
import Playlist from './components/Playlist/Playlist.jsx'

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
        element: <UserLogin />

      },
      {
        path: "playlist",
        element: <Playlist />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

)
