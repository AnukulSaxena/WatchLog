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
        <>
            <label className=' shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1'>
                <input
                    type='checkbox'
                    className='sr-only'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <span
                    className={`flex items-center space-x-[6px] rounded py-1 px-[18px] text-sm font-medium ${!isChecked ? ' bg-neutral-400 ' : ''
                        }`}
                >

                    Add Mode
                </span>
                <span
                    className={`flex items-center space-x-[6px] rounded py-1  px-[18px] text-sm font-medium ${isChecked ? ' bg-neutral-400' : ''
                        }`}
                >
                    Delete Mode
                </span>
            </label>
        </>
    )
}

export default Switcher
