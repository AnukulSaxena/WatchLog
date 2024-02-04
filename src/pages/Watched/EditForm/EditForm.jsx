import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ConfirmationForm from '../../../components/Other/ConfirmationForm';
import playlistService from '../../../express/playlistConfig';
import { useNavigate, useParams } from 'react-router-dom';
function EditForm({ handleClose, oldName }) {
    const navigate = useNavigate()
    const { playlistId } = useParams()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("");
    const [isConfOpen, setIsConfOpen] = useState(false)
    const [mode, setMode] = useState('')
    async function handleUpdate(data) {
        console.log(data)
        await playlistService.updatePlaylist(data, playlistId)
        navigate(`/playlist`)
    }
    function handleDelete() {
        setMode("delete")
        setIsConfOpen(prev => !prev)
    }
    function handleResponse() {
        setIsConfOpen(prev => !prev)

    }

    return (
        <div className=' z-10 fixed inset-0 flex justify-center items-center bg-neutral-800 backdrop-blur-sm bg-opacity-30   '>


            <div className="flex flex-col h-96 w-72 p-5 rounded-md bg-neutral-800 relative">


                {
                    (oldName !== "Watched") &&
                    <button
                        onClick={handleDelete}
                        className="absolute bottom-16 right-8 bg-red-700 gap-1 hover:bg-gray-400 text-black font-bold py-1 px-4 rounded inline-flex items-center">
                        <img className='h-5' src="/svg/delete.svg" alt="delete SVG" />
                        <span>Delete</span>
                    </button>
                }

                {
                    isConfOpen &&
                    <div
                        className=' absolute flex justify-center items-center inset-0 bg-neutral-900 bg-opacity-30 backdrop-blur-sm'
                    >
                        <ConfirmationForm
                            mode={mode}
                            closeConfMenu={handleResponse}
                        />
                    </div>
                }
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-gray-600">
                    <h3 className="text-lg font-semibold text-white">
                        Edit
                    </h3>
                    <button
                        onClick={handleClose}
                        type="button"
                        className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                        data-modal-toggle="updateProductModal"
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className='flex-grow w-full p-3 bg-neutral-700 items-center flex justify-center  rounded-md'>

                    <form onSubmit={handleSubmit(handleUpdate)}>
                        <div className=' space-y-5'>
                            {
                                (oldName !== "Watched") &&
                                <div className='h-fit space-y-5 w-fit'>
                                    <input
                                        className='w-full text-sm h-8 px-3 rounded-md bg-neutral-700 text-gray-300 border border-neutral-500'
                                        {...register("name")}
                                        placeholder="New Name"
                                        required
                                    />

                                    <textarea
                                        className='w-full rounded-md px-3 h-20  bg-neutral-700 text-gray-300 border border-neutral-500'
                                        {...register("description")}
                                        placeholder="New Description.. "
                                        required
                                    />
                                </div>
                            }
                            <div className='flex justify-between'>
                                <button
                                    className={` text-white bg-neutral-800 rounded-md px-4 py-1`}>
                                    Update
                                </button>


                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >

    )
}


export default EditForm