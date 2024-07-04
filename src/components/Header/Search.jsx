import { FaSearch, FaFilter } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import { useState, useRef, useEffect } from "react";

const Search = () => {
  const { handleSearchChange, searchResults } = useSearch();
  let [searchWord, setSearchWord] = useState("");
  const searchResultsRef = useRef(null);

  const handleChange = (e) => {
    setSearchWord(e.target.value);

    handleSearchChange(searchWord);
  };
  const handleClickOutside = (event) => {
    if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
      searchResultsRef.current.style.display = "none";
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    }
  })


  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 " >
      <div className="relative">
        <div className="max-sm:hidden">
          <Link to="/filter">
            <button className="filter-btn absolute text-xs top-2 left-3 capitalize bg-zinc-900 rounded-2xl px-3 py-1.5">
              Filter <FaFilter className="inline-block" />
            </button>
          </Link>
          <input
            type="text"
            className={`bg-zinc-800 rounded-3xl h-11 border-0 outline-none w-full text-sm text-center py-1 px-4 sm:px-6 `}
            onChange={handleChange}
            autoFocus
            placeholder="Search movies ..."
          />
          <FaSearch className="inline-block absolute right-4 top-3.5 text-cyan-300" />
        </div>
      </div>


      <div ref={searchResultsRef}>
        <div className="grid grid-cols-1 rounded-xl" >
          {searchResults.slice(0, 5).map((movie, index) => {
            const movie_url = `/${movie.media_type}/${movie.name || movie.original_title}`;
            const releaseDate = movie.first_air_date || movie.release_date;
            if (movie.media_type === "person") {
              return null;
            }
            return (
              <Link
                to={movie_url}
                key={index}
                className="hover:bg-zinc-900 bg-slate-800 flex items-center first:rounded-t-lg last:rounded-b-lg last:border-b-0 border-b  border-zinc-300 h-20 overflow-hidden"
              >
                <img
                  src={`${import.meta.env.VITE_MOVIE_DB_BACK_PATH_IMAGE_URL}/${movie.backdrop_path || movie.poster_path}`}
                  alt={movie.name || movie.original_title}
                  className="w-16 h-full py-2 px-1 rounded-lg mr-2"
                />
                <div className="desc text-gray-200">
                  <p>{movie.name || movie.original_title}</p>
                  <p className="capitalize">{`${movie.media_type} . ${releaseDate?.toString().slice(0, 4)} . ${movie?.vote_average?.toString().slice(0, 3)} `}</p>
                </div>
              </Link>
            );
          })}
        </div>
        {searchResults.length > 8 && (
          <Link to={`/filter/?keyWord=${searchWord}`}>
            <button className="text-lg w-full bg-cyan-400 h-14 rounded-xl flex items-center hover:text-zinc-100 justify-center mt-1">
              <FaArrowUp className="text-zinc-900 rotate-45 inline-block mr-2 rounded-lg text-xs" />
              Show all results
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Search;
