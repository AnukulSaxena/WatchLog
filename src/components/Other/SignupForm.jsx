import React, { useState } from 'react'
import { Input, Button } from '../index.js'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../express/authConfig.js'
import { useDispatch } from 'react-redux'
import { login } from '../../store/authSlice.js'

function SignupForm() {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const create = async (data) => {
        setError("")
        try {
            console.log(data)
            const response = await authService.createAccount(data)
            console.log(response);
            // const userData = await authService.createAccount(data);
            // if (userData) {
            //     const userData = await authService.getCurrentUser();
            //     dispatch(login(userData))
            //     navigate('/')
            // }
        } catch (error) {
            setError(error?.message)
        }
    }

    return (
        <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
            <div className=' w-full text-lg text-center mb-5'>
                Create New Account
            </div>
            {error && <div className=' w-full text-red-500 text-center'>{error}</div>}
            <div>
                <form onSubmit={handleSubmit(create)}>
                    <div className=' space-y-5 '>
                        <Input
                            label="Full Name"
                            placeholder="Enter Your Name : "
                            {
                            ...register("fullName", {
                                required: true,
                            })
                            }
                        />
                        <Input
                            label="Email"
                            placeholder="Enter Your Email : "
                            type="email"
                            {
                            ...register("email", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Username"
                            placeholder="Enter Your Username : "
                            type="text"
                            {
                            ...register("username", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter Your Password : "
                            type="password"
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
                            Create Account
                        </Button>
                    </div>
                </form>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an Account ?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignupForm