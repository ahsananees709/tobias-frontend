import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import logo from '../assets/logo.png'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { authenticatedUser, logOutUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const getLinkClass = (path) => {
        return location.pathname === path
            ? 'bg-[#F8EDE3] text-black px-4 py-2 rounded-md'
            : 'text-nav-item-text-color hover:bg-nav-item-color-hover hover:text-nav-item-text-color-hover px-4 py-2 rounded-md';
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <nav className="bg-footer-header-color shadow-4xl p-3 lg:px-32">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-white text-2xl font-bold">
                    <Link to="/" onClick={handleLinkClick}>
                        {/* <FontAwesomeIcon icon={faHouse} size="2x" /> */}
                        <img src={logo} alt='logo'></img>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden font-semibold md:flex space-x-8">
                    <Link to="/" className={getLinkClass('/')}>
                        Home
                    </Link>
                    {authenticatedUser ? (
                        <>
                            <Link to="/property" className={getLinkClass('/property')}>
                                Dashboard
                            </Link>
                            <Link to="/profile" className={getLinkClass('/profile')}>
                                Profile
                            </Link>
                            <button
                                onClick={() => {
                                    logOutUser()
                                    navigate('/')
                                }}
                                className="text-white hover:bg-red-900 hover:text-white px-4 py-2 rounded-md"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={getLinkClass('/login')}>
                                Login
                            </Link>
                            <Link to="/signup" className={getLinkClass('/signup')}>
                                Signup
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-800 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-3 space-y-2">
                    <Link to="/" className={`block ${getLinkClass('/')}`} onClick={handleLinkClick}>
                        Home
                    </Link>
                    {authenticatedUser ? (
                        <>
                            <Link
                                to="/property"
                                className={`block ${getLinkClass('/property')}`}
                                onClick={handleLinkClick}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/profile"
                                className={`block ${getLinkClass('/profile')}`}
                                onClick={handleLinkClick}
                            >
                                Profile
                            </Link>
                            <button
                                onClick={() => {
                                    logOutUser()
                                    navigate('/')
                                }}
                                className="block w-full text-left text-lg text-gray-800 hover:text-red-500 px-4 py-2 rounded-md"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className={`block ${getLinkClass('/login')}`}
                                onClick={handleLinkClick}
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className={`block ${getLinkClass('/signup')}`}
                                onClick={handleLinkClick}
                            >
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
