import React, { useState } from 'react';

const DropdownMenu = ({ className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${className}`}>
            <button
                className=" text-white  h-14 w-10 "
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg className="w-5 h-5  rounded-md ml-5 mb-2 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>

            </button>
            {
                isOpen && (
                    <ul className=" z-10 absolute bottom-0 right-0 mb-12 mx-2 w-44 rounded-md shadow-lg bg-white dark:bg-neutral-700 dark:text-white ring-1 ring-black ring-opacity-5">
                        <li className="px-4 border-gray-200 border rounded-t dark:border-gray-600  py-2">Option 1</li>
                        <li className="px-4 border-gray-200 border-x  dark:border-gray-600 py-2">Option 2</li>
                        <li className="px-4 border-gray-200 border rounded-b dark:border-gray-600 py-2">Option 3</li>
                    </ul>
                )
            }
        </div >
    );
};

export default DropdownMenu;