import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const GenreSwitcher = ({ item, handleClick }) => {
    const { mediaType } = useSelector(state => state.home)
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = () => {
        console.log(isChecked)
        setIsChecked(!isChecked)
        handleClick(item.id)
    }
    useEffect(() => {

        return () => {
            setIsChecked(false)
        }
    }, [mediaType])

    return (
        <div className='flex p-2'>
            <label className=' flex cursor-pointer rounded-md bg-white p-0.5'>
                <input
                    type='checkbox'
                    name='Switcher'
                    className='sr-only'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <div
                    className={`  w-4 rounded py-2 text-center md:w-16 text-lg ${!isChecked ? ' bg-neutral-500 text-white' : ''
                        }`}
                >

                </div>
                <div
                    className={`text-center  w-4  py-2 rounded md:w-16 text-lg  ${isChecked ? ' bg-neutral-500 text-white' : ''
                        }`}
                ></div>
            </label>
            <button
                onClick={handleCheckboxChange}
                className='block w-full truncate px-2 text-center md:px-4 max-w-full text-white  text-sm text-whitehover:text-gray-90'
            >
                {item.name}

            </button>

        </div>
    )
}

export default GenreSwitcher
