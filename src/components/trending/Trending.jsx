
import { FaArrowUp, FaChevronLeft, FaChevronRight, FaFire } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Trending = (props) => {
    const { movies } = props || [];
    const { genre } = props || [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [genres] = useState(genre);
    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === movies.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? movies.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const slideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => {
            clearInterval(slideInterval);
        };
    }, [currentIndex])

    return (
        <>
            <div className="relative w-full">
                <div className="max-sm:-mt-8 -mt-5 max-md:-mt-10 lg:-mt-12 xl:-mt-36 w-full h-64 z-30">
                    <div className="border-t-2 border-zinc-400 relative w-full">
                        <h4 className="capitalize text-zinc-300 font-semibold text-lg mb-5 text-center">
                            <FaFire className="inline-block mr-4" />trending
                            <FaFire className="inline-block ml-4" />
                        </h4>
                    </div>

                    {/* Slider container */}
                    <div className="relative w-full overflow-hidden ">
                        {/* Slider images */}
                        <div
                            className="flex transition-transform duration-500 ease-in-out mr-10"
                            style={{
                                transform: `translateX(-${currentIndex * (window.innerWidth < 760 ? 100 : 25)}%)`
                            }}
                        >
                            {movies.map((movie) => {
                                const Genres = movie.genre_ids.map(genreId =>
                                    genres.find(genre => genre.id === genreId)?.name || ""
                                );
                                const genre = Genres.length > 0 && Genres.filter(genre => genre !== "").slice(0, 3);
                                return (
                                    <div
                                        key={movie.id}
                                        className="w-full relative  flex-shrink-0 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-4   max-sm:w-full max-sm:mx-0 max-sm:mr-0"
                                    >
                                        <Link to={`/movie/${movie.name || movie.original_title}/${movie.id}`}
                                            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}
                                            className="trending max-sm:mx-3">
                                            <FaArrowUp className="transform rotate-45 rounded-full  absolute top-2 right-4 text-zinc-300 text-sm hover:shadow-none hover:border-0" />
                                            <div className="title text-white hover:border-0 hover:shadow-none text-xl mb-3 ml-2 font-semibold ">{movie.name || movie.original_title}</div>
                                            <div className="genre flex justify-start items-center hover:border-0 hover:shadow-none">
                                                {
                                                    genre.filter(g => g !== "").map((g, index) => {
                                                        return (
                                                            <span key={index} className="hover:border-0 hover:shadow-none text-cyan-300  inline font-semibold text-sm ml-3 ">{g}</span>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Link >
                                    </div>
                                )
                            })}
                        </div>

                        < button
                            className="absolute -top-2 right-0 px-3 py-3 bg-gray-600 bg-opacity-25 text-white rounded-md h-1/2 z-40"
                            onClick={nextSlide}
                            disabled={movies.length <= 1}
                        >
                            <FaChevronRight className="w-5 h-5" />
                        </button>
                        <button
                            className="absolute -bottom-1 right-0 px-3 py-3 bg-gray-600 bg-opacity-25 text-white rounded-md h-1/2 z-40"
                            onClick={prevSlide}
                            disabled={movies.length <= 1}
                        >
                            <FaChevronLeft className="w-5 h-5" />
                        </button>

                    </div>


                </div>

            </div>
            {/* Progress bar */}
            <div className="relative mt-3 h-1 bg-gray-300 rounded mb-6 max-sm:hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-blue-500 rounded"
                    style={{
                        width: `${((currentIndex + 1) / movies.length) * 100}%`,
                    }}
                ></div>
            </div>

        </>
    );
};

export default Trending;
