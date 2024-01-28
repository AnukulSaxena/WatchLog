import React from 'react'
import { SignupForm } from '../components/index.js'
import { useEffect } from 'react';

function Signup() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className=' min-h-screen py-40 px-10  bg-neutral-700'>
            <SignupForm />

        </div>
    )
}

export default Signup