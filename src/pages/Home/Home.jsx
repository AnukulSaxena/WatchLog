import React, { useEffect, useState } from 'react'
import { Filters, InfiniteScrollComponent } from '../../components'
import { fetchDataFromApi } from '../../utils/api.js'
import { useDispatch, useSelector } from 'react-redux'
import DemoLoadingScreen from './DemoLoadingScreen.jsx'
import authService from '../../express/authConfig.js'
import { login } from '../../store/authSlice.js'
import MovieCardSkeleton from '../../components/MovieCard/MovieCardSkeleton.jsx'
function Home() {
    const [isLoadingScreenOpen, setIsLoadingScreenOpen] = useState(false)
    const [data, setData] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(true)
    const { status } = useSelector(state => state.auth)
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


    async function handleDemoClick() {
        try {
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
        } catch (error) {
            console.error(error)
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
                !status &&
                <button
                    onClick={handleDemoClick}
                    className=' hover:w-32 hover:text-lg hover:font-semibold hover:bg-white hover:text-black transform ease-in-out duration-500 h-10 z-10 w-16 fixed top-22 rounded-r-md bg-neutral-800 border-neutral-950 border left-0 text-gray-300'>
                    Demo
                </button>
            }
            {
                !status && isLoadingScreenOpen &&
                <DemoLoadingScreen
                    toggleDemoPanel={toggleDemoPanel}
                />
            }

            <Filters />
            {loading ? (
                <div
                    className='py-4 flex flex-wrap justify-center gap-3'
                >
                    {
                        Array.from({ length: 20 }).map((_, index) => (
                            <MovieCardSkeleton key={index} />
                        ))
                    }
                </div>
            ) : (
                <InfiniteScrollComponent
                    data={data?.results}
                    fetchNextPageData={fetchNextPageData}
                    pageNum={pageNum}
                    total_pages={data?.total_pages}
                    initStatus={false}
                    crossCheck={true}
                    searchType={mediaType}
                />
            )}
        </div>
    )
}

export default Home