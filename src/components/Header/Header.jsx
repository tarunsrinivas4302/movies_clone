
import { FaArrowRight, FaBarsStaggered } from "react-icons/fa6"

import Search from "./Search";
import { useEffect, useRef, useState } from "react";
import logo from './../../assets/logo.png';
import { Link } from "react-router-dom";
import makeRequest from "../../utils/axios";

function Header() {
    const [isOpen, setOpen] = useState(false);
    const [isGenreModal, setGenreModal] = useState(false);
    const dropdownRef = useRef(null);
    const genreRef = useRef(null);
    const [genreData, setGenreData] = useState([]);




    useEffect(() => {
        if (genreData.length == 0) {
            getGenreData();
        }
    }, [])

    const getGenreData = async () => {
        try {
            const data = await makeRequest(
                { endpoint: '/genre/list', method: 'GET' }
            )
            setGenreData(data.genres);
        } catch (e) {
            console.log(e);
        }
    }

    const handleMenu = () => {
        setOpen(!isOpen);
    };

    const handleGenreModal = () => {
        setGenreModal(!isGenreModal);
    };



    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
        }
        if (genreRef.current && !genreRef.current.contains(event.target)) {
            setGenreModal(false);
        }

    };

    const handleModalOpen = () => {

    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className="absolute z-20 mt-3 text-white flex justify-between cursor-pointer bg-transparent w-full">
            <div className="logo menu w-fit ">
                <FaBarsStaggered className="text-3xl font-extralight mx-5 inline-block hover:text-cyan-300" onClick={handleMenu} />
                <Link to="/home">
                    <img src={logo} alt="Logo" className="w-36 inline-block max-sm:w-28" />
                </Link>
                {isOpen &&
                    <div className="dropdown flex flex-col bg-cyan-500 w-fit  ml-5 mt-2 rounded-lg" ref={dropdownRef}>
                        <ul className="px-4 py-2 relative cursor-default">
                            <li className="rounded-md pl-2 text-black font-semibold text-lg capitalize hover:bg-black hover:bg-opacity-80 hover:text-cyan-500">
                                <Link to="/home">Home</Link>
                            </li>
                            <li className="rounded-lg pl-2 text-black font-semibold text-lg capitalize hover:bg-black hover:bg-opacity-80 hover:text-cyan-500" onClick={handleGenreModal}>
                                Genre
                                {isGenreModal &&
                                    <div className="absolute top-0 w-80 max-sm:max-w-46 ml-32 flex justify-between items-center  flex-wrap  px-4 py-3 z-40 bg-slate-800" ref={genreRef}>
                                        {
                                            genreData.map((genre) => {
                                                return (
                                                    <div key={genre.id} className="text-xs hover:text-zinc-800 hover:rounded-sm text-slate-200 hover:bg-cyan-400 w-1/3 mx-2 px-1 py-1 ">
                                                        {genre.name}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </li>
                            <Link to="/movie-list/">
                                <li className="rounded-md pl-2 text-black font-semibold text-lg capitalize hover:bg-black hover:bg-opacity-80 hover:text-cyan-500">
                                    Movies</li>
                            </Link>

                            <Link to="/tv-list">
                                <li className="rounded-md pl-2 text-black font-semibold text-lg capitalize hover:bg-black hover:bg-opacity-80 hover:text-cyan-500">TvShows</li>
                            </Link>
                            <Link to="/trending">
                                <li className="rounded-md pl-2 text-black font-semibold text-lg capitalize hover:bg-black hover:bg-opacity-80 hover:text-cyan-500">Trending</li>
                            </Link>
                            <Link to="/top-imdb">
                                <li className="rounded-md pl-2 pr-7 text-black font-semibold text-lg capitalize hover:bg-black hover:bg-opacity-80 hover:text-cyan-500">Top IMDb</li>
                            </Link>

                        </ul>
                    </div>
                }
            </div>
            <div className="search w-2/5  relative">
                <Search />
            </div>
            <div className="login-btn text-lg capitalize mr-4 " onClick={handleModalOpen} >
                <button className="px-6 py-1 rounded-full hover:bg-cyan-500 font-semibold bg-transparent border-2 border-slate-400 text-white max-sm:text-xs max-sm:block max-sm:w-max">Login <FaArrowRight className="inline-block ml-2 text-zinc-400" /></button>
            </div>
        </div>
    );
}

export default Header;
