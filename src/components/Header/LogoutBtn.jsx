import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice.js'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth.js'


function LogoutBtn({ isMenuOpen }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        authService.logoutAccount();
        dispatch(logout())
        navigate("/")
    }

    return (
        <button
            className={`block ${isMenuOpen ? " w-full" : ""} py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0  dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
            onClick={handleLogout}
        >
            Logout
        </button>
    )
}

export default LogoutBtn