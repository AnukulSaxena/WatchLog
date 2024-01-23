import React, { useState } from 'react';

const GenreMenu = ({ className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);

    const options = Array.from({ length: 10 }, (_, index) => `Option ${index + 1}`);

    return (
        <div className={`text-left md:w-56 bg-white max-h-9 p-1 ${className}`}>

            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex dark:bg-neutral-500 text-white justify-center w-full text-lg rounded-md border border-gray-300 px-4 bg-white font-medium  hover:bg-neutral-500"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
            >
                Genre
                <svg
                    className="-mr-1 ml-2 my-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 12a1 1 0 01-0.7-0.29l-4-4a1 1 0 111.4-1.42L10 9.58l3.3-3.3a1 1 0 111.4 1.42l-4 4a1 1 0 01-0.7 0.3z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>


            {isOpen && (
                <div className="  absolute bottom-10 right-0 mt-2 w-fit rounded-md shadow-lg bg-white  overflow-y-auto max-h-60">
                    <div
                        className="py-1 no-scrollbar"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {options.map((option, index) => (
                            <button
                                key={index}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenreMenu;
