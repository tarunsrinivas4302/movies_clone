import { useState, useEffect } from 'react';
import './carousel.css';
import { useDispatch, useSelector } from 'react-redux';
import { featured } from '../../redux/movie-store/actions';
import { FaPlayCircle, FaRegBookmark, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Trending from '../trending/Trending';
import makeRequest from '../../utils/axios';

const CarouselTwo = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [genreData, setGenreData] = useState([]);
    const trendingMovie = useSelector(state => state.movies.featured);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const payload = {
                    endpoint: '/trending/all/day?language=en-US&adult=true',
                    method: 'GET',
                };
                await dispatch(featured(payload));
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching trending movies:', error);
                setIsLoading(false);
            }
        };

        fetchTrendingMovies();
    }, [dispatch]);


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

    useEffect(() => {
        const slideInterval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => {
            clearInterval(slideInterval);
        };
    }, [currentSlide]);

    const nextSlide = () => {
        setCurrentSlide(prev => (prev === trendingMovie.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? trendingMovie.length - 1 : prev - 1));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div id="default-carousel" className="relative h-full w-full" data-carousel="slide">
            <div className="w-full">
                <div className="relative h-full overflow-hidden rounded-lg">
                    <div className="flex" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {trendingMovie.map((movie) => {
                            const rating = movie.adult === true ? "TV-MA" : "R";
                            const genres = movie.genre_ids.map(genreId =>
                                genreData.find(genre => genre.id === genreId)?.name || ""
                            );
                            const genre = genres.length > 0 && genres.filter(genre => genre !== "").slice(0, 1);
                            const date = movie.release_date || movie.first_air_date;
                            return (
                                <div key={movie.id} className="w-full h-full flex-shrink-0">
                                    <figure className='relative'>
                                        <Link to={`/movie/${movie.name || movie.original_title}/${movie.id}`} key={movie.id} className='z-30 bg-custom relative max-sm:h-4/5'>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                                                className="block w-full h-full object-fill max-sm:h-96"
                                                alt={movie.title}
                                            />
                                            <div className='absolute mb-11 inset-x-0 bottom-0 lg:bottom-30 xl:bottom-40 left-10 z-30'>
                                                <p className='font-bold text-3xl title text-white max-sm:text-center max-sm:font-medium'>{movie.name || movie.original_title}</p>
                                                <div className="max-sm:flex max-sm:justify-center max-sm:flex-wrap">
                                                    <div className="meta flex mt-3 items-center max-sm:text-center">
                                                        <span className="quality text-white text-lg font-semibold mr-3 max-sm:font-medium max-sm:text-xs max-sm:pl-5">HD</span>
                                                        <span className="text-white mr-1 max-sm:font-medium max-sm:text-xs max-sm:pl-3">
                                                            <FaStar />
                                                        </span>
                                                        <span className='text-white mr-3 max-sm:font-medium max-sm:text-xs max-sm:text-zinc-50 max-sm:items-center'>{parseFloat(Number(movie.vote_average.toString().slice(0, -2)))}</span>
                                                        <span className="rating text-white text-sm bg-cyan-600 px-3 rounded-md max-sm:font-medium max-sm:text-xs max-sm:pl-3">{rating}</span>
                                                        <span className="year text-zinc-400 ml-3 font-semibold">{date.toString().slice(0, 4)}</span>
                                                        <span className="type text-white text-md bg-cyan-600 px-2 rounded-sm font-semibold ml-2 capitalize max-sm:font-medium max-sm:text-xs max-sm:pl-3">{movie.media_type}</span>
                                                        <br className='max-sm:visible hidden'></br>
                                                        {genre.filter(g => g !== "").map((g, index) => {
                                                            return (
                                                                <span key={index} className="text-zinc-400 hover:border-0 hover:shadow-none inline font-bold text-sm ml-3">{g}</span>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                                <p className="overview text-zinc-400 max-w-2xl line-clamp-2 max-sm:hidden mt-3">{movie.overview}</p>
                                                <div className='flex mt-7 items-center w-100 max-sm:justify-around'>
                                                    <button className="text-black px-4 pt-3 items-center pb-3 rounded-full w-1/4 max-sm:w-1/2 max-sm:text-xs text-lg cursor-pointer font-semibold bg-cyan-400 max-sm:font-semibold">
                                                        <FaPlayCircle className='inline-block text-md' /> Watch now
                                                    </button>
                                                    <button className="text-white px-4 font-semibold text-lg cursor-pointer max-sm:w-auto max-sm:font-semibold max-sm:text-sm  hover:text-cyan-500">
                                                        <FaRegBookmark className='inline-block text-md' /> Bookmark
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="actions mb-4 lg:bottom-40 max-sm:hidden max-md:hidden">
                                            <button
                                                type="button"
                                                className="absolute bg-cyan-400 bottom-2 right-12 lg:bottom-40 end-0 z-30 flex items-center justify-center mx-4 cursor-pointer group focus:outline-none"
                                                data-carousel-prev
                                                onClick={prevSlide}
                                            >
                                                <span className="inline-flex items-center justify-center w-10 h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                                    <svg
                                                        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 6 10"
                                                    >
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                                    </svg>
                                                    <span className="sr-only">Previous</span>
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                className="absolute bg-cyan-400 bottom-2 end-0 lg:bottom-40 z-30 flex items-center justify-center mx-4 cursor-pointer group focus:outline-none"
                                                data-carousel-next
                                                onClick={nextSlide}
                                            >
                                                <span className="inline-flex items-center justify-center w-10 h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                                    <svg
                                                        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 6 10"
                                                    >
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                                    </svg>
                                                    <span className="sr-only">Next</span>
                                                </span>
                                            </button>
                                        </div>
                                    </figure>
                                </div>
                            )
                        })}
                    </div>
                    <Trending movies={trendingMovie} genre={genreData} />
                </div>
            </div>
        </div>
    );
};

export default CarouselTwo;




