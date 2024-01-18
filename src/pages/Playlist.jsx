import React from 'react'
import { Spinner } from '../components'

function Playlist() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className=' min-h-screen dark:bg-neutral-700 w-full text-center'>
            <Spinner height='h-96' />
            Coming Soon</div>
    )
}

export default Playlist