import React, { useRef, useEffect } from 'react'

function DemoLoadingScreen({ toggleDemoPanel }) {

    const demoPanelRef = useRef()
    function handleClickOutside(event) {
        if (demoPanelRef.current && !demoPanelRef.current.contains(event.target)) {
            console.log("SOmegin")
            toggleDemoPanel()
        }
    }
    useEffect(() => {

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div
            className='flex justify-center items-center fixed bg-neutral-800 backdrop-blur-lg bg-opacity-30 inset-0 z-10'
        >
            <div
                ref={demoPanelRef}

                className='h-72 w-96 text-gray-200 rounded-md bg-neutral-800 p-5 '>
                <h1 className=' text-3xl'>
                    Since we're using the free tier of Render,
                    our server gets paused due to inactivity.

                </h1>
                <p className='text-2xl'>Don't worry; it'll take only 10-20 seconds, I guess.
                </p>
                <p className=' mt-5 text-lg'>You can check other features till then.</p>

            </div>
        </div>
    )
}

export default DemoLoadingScreen