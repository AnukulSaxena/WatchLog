import React, { useState } from 'react';

const SearchBar = () => {
    const [selectedOption, setSelectedOption] = useState('Option 1');

    return (
        <div className="flex  items-center md:max-w-full max-w-64">
            <select
                className=" h-10 bg-neutral-700 text-gray-300 py-2 px-2 md:px-4 md:pr-8 rounded-l-lg"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
            >
                <option value="movie" className="text-gray-300">
                    Movie
                </option>
                <option value="Tv" className="text-gray-300">
                    TV
                </option>
                <option value="Person" className="text-gray-300">
                    Person
                </option>
            </select>

            <input
                type="text"
                placeholder="Search..."
                className="md:w-full w-1/3 text-white py-2 md:pl-4 md:pr-2 bg-neutral-700 "
            />

            <button
                className="bg-white text-gray-800 font-semibold py-2 md:px-4  px-4 rounded-r-lg"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;