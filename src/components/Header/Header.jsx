import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import LogoutBtn from "./LogoutBtn";

import SeachBar from "./SeachBar";

const Header = () => {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState("up");
    const filterPanelRef = useRef(null);
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)
    let prevScrollY = 0;

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Playlist",
            slug: "/playlist",
            active: authStatus
        },

        {
            name: "Profile",
            slug: "/profile",
            active: authStatus
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        }
    ]

    const toggleMenu = () => {

        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > prevScrollY) {
            setScrollDirection("down");

        } else {
            setScrollDirection("up");

        }
        prevScrollY = currentScrollY;

    };

    function handleClick() {
        window.scrollTo(0, 0);
        navigate('/')
    }

    function handleClickOutside(event) {

        if (filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
            setIsMenuOpen(false);

        }

    }
    function handleNavigateClick(event) {
        navigate(event.target.value)
    }
    function toggleSearchBar() {
        setIsSearchBarOpen(prev => !prev)
    }
    useEffect(() => {
        console.log("UseEffect Header.");
        const handleResize = () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        };
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>{
            isSearchBarOpen && <div
                className="z-10 will-change-scroll absolute flex pt-40 md:px-40 justify-center inset-0 bg-neutral800 backdrop-blur-sm bg-opacity-30"
            >
                <SeachBar
                    toggleSearchBar={toggleSearchBar}
                />
            </div>

        }

            <header
                ref={filterPanelRef}
                className={`fixed top-0 z-50 w-full  border-gray-200 px-2 lg:px-6 py-4 bg-neutral-800 duration-300 transition-transform ${(scrollDirection === "down") ? "-translate-y-full" : "translate-y-0"
                    }`} >

                <nav className="">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">


                        <div className="flex gap-5">



                            <button
                                onClick={handleClick}
                                className="self-center text-xl font-semibold whitespace-nowrap text-white"
                            >WatchLog</button>

                            <div
                                className="h-10 cursor-pointer flex items-center "
                                onClick={toggleSearchBar}
                            >
                                {
                                    !isSearchBarOpen &&
                                    <img

                                        className="h-7"
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADtklEQVR4nO2aX2iPURjHTwwXhNpuFLZERFktWhQT5d+GVpJYrBZxh5gLxZR24U+UG4YLIiJRZDcSRbiQEtuF1PyNyDJ/Nv/20bHnzeNts99++52zM3s/N7+b3/t+n/Oc857znOd5jElISEhISEhIcASQBUwByoAqYD9wGDgI7ALWAEXAEPO/AAwFVgNXgI+kxnfgNrAZGGl6I8AIYA/woYNB/gDeA0/lt+Uf/zsN5JveADAAqASaYgN5Lct9JTAeGBh7rh+QC5QAu4G62PM/gRogx4QKMAa4GzP8GlAM9E/jfQXAceCbet8rYI4JDdo2r0Zl6ENgdobePRa4HFsNG0woAIuAZjGuFdgXX+IZ0ikHPilHVGdaI92Zjwb/FVjuWG8y8FI5YatLvVS++UY1+PnGA0Ae8EytuFIfuu3t9neVEU5nPg4wUY5P5DfXeDagUi3DvV7F/9hQLM631PoOcprUbp/xDa8LthxRE7HQl+geJZqRo64btuSoT+GOr9i+KQpyTAAAO9SEzHAtVq7Eik0AANnqKD7mWqxWxfZZJhCA82JXYzphd1eOvigSqzEBIZesiEJXIlOVyAoTEDZvoGzb6EpklRKZYAIDeCO2HXUlUKWSFD129ncEcFPsu+pK4EAUepoAAS6KffddCdSIwAsTIMApsa/elcBBEXhrAkQdhQ9cCVSrq28/ExiSfrPccCWwVp0Cfq+fKQA0iG0nXQnMUg4oMQEBDJdcoWWbK5EhUrSw7DYBIen0iLkuhe443WnTBDgkdtlL0WCXQluUpwtMANigzJ5MYtNl12KjJBK0nDABAFSoSVnqQ/CMiNmKzTjngp3P/mOx57m9sfoQzVc7rtsl17Xk7DqfwjVKuNyb8N82TAI+iw11XmY/loy0hUqk7j/ZeAQYBjwSfbsap/nU/42t0qpPwZar8owHgEEq7LVU+dBtF1ulVYbYctVE437m9eCv9/i9hD+XJCRHv8ThNx8t+4iWILLTtO3GUZmqVSo2ORk86uz7v6iB31BtNcE4oVRVaaLVYIsW2d0YeIU655EgbKe01BSH6ITRwKXYMm2WZEVZZ11fcqsrkdj+Xew99cD02P/Dc4IFWNBOv1CEzd7eAi4AZ4Fzspk1qFNFYyO89R2d88E6wQLMtOWqWP9QKrRIX9CyVAKcoJ2gukQLgU2yQdoZvwc8sTk8WRE2qbkdmJdOt2jwTvCBbdOJ9SwtNn0NEieY9j6HItPHnbDf9EVo62M80Gu7zhMSEhISEhKMD34BTiRIeBg5cMgAAAAASUVORK5CYII=" />

                                }
                            </div>



                        </div>



                        <div
                            className={`${isMenuOpen ? "flex" : "hidden"
                                } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
                            id="mobile-menu-2"
                        >
                            <ul className="flex flex-col mt-4 w-full font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                {navItems.map((item) =>
                                    item.active ? (
                                        <li key={item.name} className={`${isMenuOpen ? " w-full" : ""} text-center`}>
                                            <button
                                                value={item.slug}
                                                onClick={handleNavigateClick}
                                                className={`block ${isMenuOpen ? " w-full" : ""} py-2 pr-4 pl-3  border-b    lg:border-0 lg:hover:text-primary-700 lg:p-0 text-gray-400 lg:hover:text-white hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700`}>{item.name}
                                            </button>
                                        </li>
                                    ) : null
                                )}

                                {
                                    authStatus && <LogoutBtn
                                        isMenuOpen={isMenuOpen}
                                    />
                                }
                            </ul>
                        </div>
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm  rounded-lg lg:hidden  focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`w-6 h-6 ${isMenuOpen ? "hidden" : ""}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                            <svg
                                className={`w-6 h-6 ${isMenuOpen ? "" : "hidden"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>
        </>
    );
};



export default Header;


