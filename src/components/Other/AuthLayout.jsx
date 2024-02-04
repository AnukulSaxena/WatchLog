import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import playlistService from '../../express/playlistConfig'
import { setMovieData } from '../../store/movieSlice'
export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    const { mediaType } = useSelector(state => state.home)
    const dispatch = useDispatch()
    useEffect(() => {
        if (authStatus) {
            playlistService.getUserPlaylists()
                .then((res) => {
                    dispatch(setMovieData(res))
                })
        }

        if (authentication && authStatus !== authentication) {
            navigate("/login")
            // } else if (!authentication && authStatus !== authentication) {
            //     navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication, mediaType])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}
