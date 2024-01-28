import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice.js'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth.js'
import { setMovieData } from '../../store/movieSlice.js'


function LogoutBtn({ isMenuOpen }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        authService.logoutAccount()
            .then((response) => {
                console.log("session deleted with ", response);
                dispatch(logout())
                dispatch(setMovieData(null))

            })
            .then(() => navigate("/"))
            .catch(error => {
                console.error("LogoutBtn :: handleLogout :: Error", error)
            })
    }

    return (
        <button
            className={`block ${isMenuOpen ? " w-full" : ""} py-2 pr-4 pl-3  border-b  lg:border-0 lg:hover:text-primary-700 lg:p-0  text-gray-400 lg:hover:text-white hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700`}
            onClick={handleLogout}
        >
            Logout
        </button>
    )
}

export default LogoutBtn