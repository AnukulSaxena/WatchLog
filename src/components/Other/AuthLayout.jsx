import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import movieServicex from '../../express/movieConfig'
import { setMovieData } from '../../store/movieSlice'
export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    const userData = useSelector(state => state.auth.userData)
    const { mediaType } = useSelector(state => state.home)
    const dispatch = useDispatch()
    useEffect(() => {

        movieServicex.getSingleWatched(userData?.user?.username + " Watched", userData?.accessToken)
            .then((res) => {
                console.log("AuthLayout :: useEffect :: Response", res)
                if (res) dispatch(setMovieData(res))
                else dispatch(setMovieData({
                    movieId: [],
                    tvId: []
                }))
            })
            .catch(error => {
                console.error("Authlayout :: useEffect :: Error", error)

            })

        if (authentication && authStatus !== authentication) {
            navigate("/login")
            // } else if (!authentication && authStatus !== authentication) {
            //     navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication, mediaType])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}
