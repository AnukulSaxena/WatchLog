import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setMode } from '../store/movieSlice.js'

const Switcher = () => {
    const [isChecked, setIsChecked] = useState(false)
    const dispatch = useDispatch()

    const handleCheckboxChange = () => {
        console.log(isChecked)
        dispatch(setMode(!isChecked))
        setIsChecked(!isChecked)
    }

    return (
        <div>
            <label className=' inline-flex cursor-pointer items-center justify-center rounded-md bg-white p-1'>
                <input
                    type='checkbox'
                    name='Switcher'
                    className='sr-only'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <span
                    className={`flex items-center space-x-[6px] w-8 rounded py-1 px-3 text-sm font-medium ${!isChecked ? ' bg-neutral-500 ' : ''
                        }`}
                >
                    +
                </span>
                <span
                    className={`flex text-center space-x-[6px] w-8 rounded py-1  px-3 text-sm font-medium ${isChecked ? ' bg-neutral-500' : ''
                        }`}
                >-</span>
            </label>
        </div>
    )
}

export default Switcher
