import { useEffect, useState } from "react";
import Grid from "../components/Grid/Grid"
import CarouselTwo from "../components/carousel/Carousel2"
import { getRecomendedMovies, getRecomendedSeries } from "../redux/movie-store/actions";
import { useDispatch, useSelector } from "react-redux";
import makeRequest from "../utils/axios";
// import Suggestion from "../components/Suggestion/Suggestion";    
import SuggestionCall from "../components/Suggestion/SuggestionCall";

const Home = () => {
    const [active, setActive] = useState("movies");
    const [suggestionValue, setSuggestionValue] = useState("day");
    const [latestMovies, setLatestMovies] = useState([]);
    const [latestSeries, setLatestSeries] = useState([]);
    const Movies = useSelector(state => state.movies.movies) || [];
    const Series = useSelector(state => state.movies.serieslist) || [];

    const isLoading = useSelector(state => state.movies.loading);
    const dispatch = useDispatch();


    const date = new Date();
    const previousMonth = date.getFullYear() + "-" + (date.getMonth() - 1) + "-" + date.getDate();
    const currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    const latestSeriesEndPoint = `/tv/on_the_air?language=en-US&page=2&release_date.gte=${previousMonth}&release_date.lte=${currentDate}`;
    const latestMoviesEndpoint = `discover/movie?language=en-US&page=3&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${previousMonth}&release_date.lte=${currentDate}`;
    // var top9endpoint = "trending/all/";

    const getData = async (type) => {
        try {
            if (type.toLowerCase() === "movies") {
                const payload1 = {
                    endpoint: 'discover/movie?language=en-US&page=1&sort_by=popularity.desc',
                };
                const payload2 = {
                    endpoint: 'discover/movie?language=en-US&page=2&sort_by=popularity.desc',
                };
                const response1 = await makeRequest(payload1,);
                const response2 = await makeRequest(payload2);
                const combinedResults = [
                    ...response1.results,
                    ...response2.results,
                ];
                dispatch(getRecomendedMovies(combinedResults));
            } else if (type.toLowerCase() === "tv shows") {
                const payload1 = {
                    endpoint: 'discover/tv?language=en-US&page=1&sort_by=popularity.desc',
                };
                const payload2 = {
                    endpoint: 'discover/tv?language=en-US&page=2&sort_by=popularity.desc',
                };

                const response1 = await makeRequest(payload1,);
                const response2 = await makeRequest(payload2);
                const combinedResults = [
                    ...response1.results,
                    ...response2.results,
                ];
                dispatch(getRecomendedSeries(combinedResults));
            }


        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const buttonPayload = [
        {
            label: "movies",
            active: active,
            handleClick: () => {
                setActive("movies");
                handleCallback("movies");
            }
        },
        {
            label: "Tv Shows",
            active: active,
            handleClick: () => {
                setActive("Tv Shows");
                handleCallback("Tv Shows");
            }
        }
    ];

    const handleCallback = (type) => {
        console.log(type);
        setActive(type)
    }

    const getLatestData = async () => {
        try {
            const moviesResponse = await makeRequest({
                endpoint: latestMoviesEndpoint,
                method: 'GET'
            })

            const seriesResponse = await makeRequest({
                endpoint: latestSeriesEndPoint,
                method: 'GET'
            })
            setLatestMovies(moviesResponse.results)
            setLatestSeries(seriesResponse.results);

        } catch (e) {
            console.error("Error fetching latest data:", e);
        }
    }
    useEffect(() => {
        getLatestData();

    }, []);

    useEffect(() => {
        handleClick(suggestionValue);
    } , [suggestionValue])
    useEffect(() => {
        if (Movies.length == 0 || Series.length == 0) {
            getData(active);
        }
    }, [active]);


    const handleClick = (value = "day") => {
        setSuggestionValue(value);
    }

    const top9endpoint = `trending/all/${suggestionValue}`;
    console.log(top9endpoint);
    const modifieddata = active == "movies" ? Movies : Series;
    const modifiedType = active == "movies" ? "movie" : "tv";
    return (
        <>
            <CarouselTwo />

            <div className="w-full lg:flex">
                <div className="w-2/3 lg:w-4/5 md:w-full sm:w-full max-sm:w-full overflow-hidden">
                    <Grid heading="Recomended Movies" data={modifieddata} limit="28" params={
                        {
                            showButton: true, buttons: buttonPayload, isLoading: isLoading, type: modifiedType
                        }
                    } />
                    <Grid heading="Latest Movies " data={latestMovies.filter(item => item.release_date.slice(0, 4) == "2024")} limit="14" params={{
                        isLoading: isLoading, type: "movies"
                    }} />
                    <Grid heading="Latest Tv Shows" data={latestSeries.filter(item => item.first_air_date.slice(0, 4) == "2024")}
                        limit="14"
                        params={{
                            isLoading: isLoading, type: "tv"
                        }} />
                </div>
                <div className="lg:w-1/3 md:w-full max-sm:w-full lg:mt-20 ml-6">
                    <SuggestionCall title="top 9" endpoint={top9endpoint} showButtons="true" showNumbers="true" handleClick={handleClick} />
                    <SuggestionCall title="Recently Updated" endpoint={latestMoviesEndpoint} />

                </div>
            </div>
        </>

    )
}

export default Home