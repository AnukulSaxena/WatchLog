import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setMode } from '../../../store/movieSlice.js'

const Switcher = ({ className = '' }) => {
    const [isChecked, setIsChecked] = useState(false)
    const dispatch = useDispatch()

    const handleCheckboxChange = () => {
        console.log(isChecked)
        dispatch(setMode(!isChecked))
        setIsChecked(!isChecked)
    }

    return (
        <div className={className}>
            <label className=' flex cursor-pointer rounded-md bg-white p-1'>
                <input
                    type='checkbox'
                    name='Switcher'
                    className='sr-only'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <div
                    className={`  w-8 rounded text-center md:w-16 text-lg ${!isChecked ? ' bg-neutral-500 text-white' : ''
                        }`}
                >
                    +
                </div>
                <div
                    className={`text-center  w-8 rounded md:w-16 text-lg  ${isChecked ? ' bg-neutral-500 text-white' : ''
                        }`}
                >-</div>
            </label>
        </div>
    )
}

export default Switcher
