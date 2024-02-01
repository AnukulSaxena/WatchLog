import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import LogoutBtn from "./LogoutBtn";
import Search from "./Search.jsx";

const Header = () => {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState("up");
    const filterPanelRef = useRef(null);

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
            name: "Watched",
            slug: "/watched",
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

    function handleClickOutside(event) {

        if (filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
            setIsMenuOpen(false);

        }

    }
    function handleNavigateClick(event) {
        navigate(event.target.value)
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
        <header
            ref={filterPanelRef}
            className={`fixed top-0 z-50 w-full  border-gray-200 px-4 lg:px-6 py-4 bg-neutral-800 duration-300 transition-transform ${(scrollDirection === "down") ? "-translate-y-full" : "translate-y-0"
                }`} >
            <nav className="">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Search />
                    <div className="flex items-center">
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

                </div>
            </nav>
        </header>
    );
};



export default Header;


