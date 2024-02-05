import React, { useEffect, useState } from 'react'
import { Filters, InfiniteScrollComponent } from '../../components'
import { fetchDataFromApi } from '../../utils/api.js'
import { useDispatch, useSelector } from 'react-redux'
import DemoLoadingScreen from './DemoLoadingScreen.jsx'
import authService from '../../express/authConfig.js'
import { login } from '../../store/authSlice.js'
import { setMovieDataIndex } from '../../store/movieSlice.js'

function Home() {
    const [isLoadingScreenOpen, setIsLoadingScreenOpen] = useState(false)
    const [data, setData] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(true)
    const { userData, status } = useSelector(state => state.auth)
    const { movieData } = useSelector(state => state.movie)
    const { mediaType, paramFilters } = useSelector(state => state.home)
    const dispatch = useDispatch()

    const fetchNextPageData = () => {
        fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, paramFilters)
            .then((res) => {
                if (data) {
                    setData((prevData) => ({
                        ...res, results: [...prevData?.results, ...res?.results],
                    }));
                } else {
                    setData(res)
                }
                setPageNum(pageNum + 1);
            })
            .catch((error) => {
                console.error("Home :: fetchNextPageData :: Error", error)
            })
    };

    async function handleUseEffect() {
        try {
            const response = await fetchDataFromApi(`/discover/${mediaType}?page=${1}`, paramFilters);
            setData(response);
            setPageNum(2);
            setLoading(false);

        } catch (error) {
            console.error("Home :: HandleUseffect :: error", error)
        }
    }
    function toggleDemoPanel() {
        setIsLoadingScreenOpen(prev => !prev);
    }

    function handlePlaylistChange(item, index) {
        dispatch(setMovieDataIndex(index))
        console.log(index)
    }

    async function handleDemoClick() {
        if (!status) {
            toggleDemoPanel()
            const response = await authService.loginAccount({
                email: "bladerunner2049@email.com",
                password: "12121212"
            })

            if (response) {
                const userData = response.data.user
                console.log("userData", userData)
                dispatch(login(userData))
                setIsLoadingScreenOpen(false)
            }
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        handleUseEffect();
        return () => {
            console.log("MovieCard :: UseEffect :: return")
            setLoading(true)
        }

    }, [status, mediaType, paramFilters])
    return (
        <div className='bg-neutral-700 min-h-screen pt-20'>
            {
                !status ?
                    <button
                        onClick={handleDemoClick}
                        className=' hover:w-32 hover:text-lg hover:font-semibold hover:bg-white hover:text-black transform ease-in-out duration-500 h-10 z-10 w-16 fixed top-22 rounded-r-md bg-neutral-800 border-neutral-950 border left-0 text-gray-300'>
                        Demo
                    </button>
                    :

                    movieData && <div
                        className=' inline-flex gap-2 justify-center  fixed top-22 hover:left-0 transform ease-in-out duration-1000 -left-[150px] h-10 w-fit z-10'
                    >
                        <ul className='h-20 w-36 flex-col items-center ' >
                            {
                                movieData?.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => { handlePlaylistChange(item, index) }}
                                        className='bg-neutral-800 text-center hover:bg-white text-white hover:text-black'>{item.name}</li>
                                ))
                            }
                        </ul>
                        <img
                            className='h-full'
                            src="/svg/movies-icon.svg" alt="moviesIcon"
                        />
                    </div>
            }
            {
                !status && isLoadingScreenOpen &&
                <DemoLoadingScreen
                    toggleDemoPanel={toggleDemoPanel}
                />
            }

            <Filters />
            {
                !loading &&
                <InfiniteScrollComponent
                    data={data?.results}
                    fetchNextPageData={fetchNextPageData}
                    pageNum={pageNum}
                    total_pages={data?.total_pages}
                    initStatus={false}
                    crossCheck={true}
                    searchType={mediaType}
                />

            }
        </div>
    )
}

export default Home