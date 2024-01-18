import React from 'react'
import { SignupForm } from '../components/index.js'

function Signup() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className=' min-h-screen py-40 px-10  dark:bg-neutral-700'>
            <SignupForm />

        </div>
    )
}

export default Signup