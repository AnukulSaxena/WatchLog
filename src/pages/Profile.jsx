import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
    const { userData } = useSelector(state => state.auth)
    const { movieData } = useSelector(state => state.movie)
    return (
        <div
            className='min-h-screen bg-neutral-700 text-center pt-20'
        ><div>
                Username: {userData.username}
            </div>
            <div>
                Full Name: {userData.fullName}
            </div>
            <div>
                <span>MovieCount: {movieData.movieId.length}</span>
                <span> TvCount: {movieData.tvId.length}</span>
            </div>


        </div>
    )
}

export default Profile