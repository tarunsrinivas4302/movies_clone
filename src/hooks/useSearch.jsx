import { useState, useCallback } from "react";
import makeRequest from "../utils/axios";

const useSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  console.log(query);
  const DEFAULT_SEARCH_API_URL = "/search";

  // Debounce function
  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      if (searchQuery.trim() === "" || searchQuery.length <= 2) {
        setSearchResults([]);
        return;
      }

      defaultSearch(searchQuery); // Adjust this to call advancedSearch if needed
    }, 1000),
    []
  );

  // Default search function
  const defaultSearch = async (searchQuery) => {
    try {
      const req = {
        endpoint: `${DEFAULT_SEARCH_API_URL}/multi?query=${searchQuery}&include_adult=true&language=en-US&page=1`,
        method: "GET",
      };

      const data = await makeRequest(req);
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error fetching default search data:", error);
      setSearchResults([]);
    }
  };

  // Advanced search function
  const advancedSearch = async (payload) => {
    try {
      let { query, genre, year, country, type, rating } = payload;

      let url = `${DEFAULT_SEARCH_API_URL}/`;
      if (!type) type = "multi";
      url += `${type}?`;
      if (query) {
        url += `query=${query}&`;
      }
      if (genre) {
        url += `genre=${genre}&`;
      }
      if (year) {
        url += `year=${year}&`;
      }
      if (country) {
        url += `country=${country}&`;
      }
      if (rating) {
        url += `rating=${rating}&`;
      }

      url += `include_adult=true&language=en-US&page=1`;

      const req = {
        endpoint: url,
        method: "GET",
      };

      const data = await makeRequest(req);
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error fetching advanced search data:", error);
      setSearchResults([]);
    }
  };

  // Debounce function definition
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  // Handler for search query change
  const handleSearchChange = (searchQuery) => {
    setQuery(searchQuery);
    debouncedSearch(searchQuery);
  };

  return { handleSearchChange, searchResults ,advancedSearch };
};

export default useSearch;
