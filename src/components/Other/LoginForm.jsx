import React, { useState } from 'react'
import { Input, Button } from '../index.js'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../express/authConfig.js'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../../store/authSlice.js'

function SignupForm() {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const login = async (data) => {
        try {
            setError("");
            const session = await authService.loginAccount(data);
            if (session) {
                const userData = session.data.user
                console.log("userData", userData)
                dispatch(authLogin(userData))
                navigate("/")
            }
        } catch (error) {

            setError(error?.message)
        }
    }

    return (
        <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
            <div className=' w-full text-lg text-center mb-5'>
                Log in to Your Account
            </div>
            {error && <div className=' w-full text-red-500 text-center'>{error}</div>}
            <div>
                <form onSubmit={handleSubmit(login)}>
                    <div className=' space-y-5 '>
                        <Input
                            label="Email"
                            placeholder="Enter Your Email : "
                            type="email"
                            name="email"
                            id="r0"
                            autoComplete="email"
                            {
                            ...register("email", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter Your Password : "
                            type="password"
                            name="password"
                            id="r1"
                            autoComplete="current-password"
                            {
                            ...register("password", {
                                required: true,
                            })
                            }
                        />
                        <Button
                            type="submit"
                            className=' w-full'
                        >
                            Login
                        </Button>
                    </div>
                </form>
                <p className="mt-2 text-center text-base text-black/60">
                    Don't have an Account ?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignupForm