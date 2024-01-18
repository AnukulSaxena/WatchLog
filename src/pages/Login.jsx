import React, { useEffect } from 'react'
import { LoginForm } from '../components/index.js'

function Login() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className=' min-h-screen py-40 px-10 dark:bg-neutral-700'>
            <LoginForm />

        </div>
    )
}

export default Login