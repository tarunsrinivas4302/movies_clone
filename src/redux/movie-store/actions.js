import makeRequest from "../../utils/axios";
import * as Types from "./types.js";

export const getMovies = (payload) => {
  return {
    type: Types.GET_ALL_MOVIES,
    payload: payload,
  };
};

export const getSingleMovie = (payload) => {
  return {
    type: Types.GET_SINGLE_MOVIE,
    payload: payload,
  };
};

export const getCountryList = (payload) => {
  return {
    type: Types.GET_COUNTRY_LIST_MOVIES,
    payload: payload,
  };
};

export const getCertificateList = (payload) => {
  return {
    type: Types.GET_CERTIFICATE_BASED_LIST,
    payload: payload,
  };
};

export const getFilterData = (payload) => {
  return {
    type: Types.GET_FILTER_DATA,
    payload: payload,
  };
};

export const getTrending = (payload) => {
  return {
    type: Types.GET_TRENDING,
    payload: payload,
  };
};

export const getRecomendedMovies = (payload) => {
  return {
    type: Types.GET_RECOMMENDED_MOVIES_LIST,
    payload: payload,
  };
};

export const getRecomendedSeries = (payload) => {
  return {
    type: Types.GET_RECOMMENDED_SERIES_LIST,
    payload: payload,
  };
};

export const GET_LATEST_MOVIES = (payload) => {
  return {
    type: Types.GET_LATEST_MOVIES_LIST,
    payload: payload,
  };
};

export const fetch_request = (payload) => {
  return {
    type: Types.FETCH_REQUEST,
    payload: payload,
  };
};

export const fetch_request_failure = (payload) => {
  return {
    type: Types.FETCH_REQUEST_FAILURE,
    payload: payload,
  };
};

export const getFeatured = (payload) => {
  return {
    type: Types.GET_FEATURED,
    payload: payload,
  };
};

// Async Actions
export const getMoviesList = (payload) => {
  return async (dispatch) => {
    dispatch(fetch_request());
    try {
      const data = await makeRequest({
        endpoint: payload.endpoint,
        method: payload.method,
        data: payload.data,
      });
      dispatch(getMovies(data));
    } catch (e) {
      console.log(e);
      dispatch(fetch_request_failure(e.message));
    }
  };
};

export const getSingleMovieList = (payload) => {
  return async (dispatch) => {
    dispatch(fetch_request());
    try {
      const data = await makeRequest({
        endpoint: payload.endpoint,
        method: payload.method,
        data: payload.data,
      });
      dispatch(getSingleMovie(data));
    } catch (e) {
      console.log(e);
      dispatch(fetch_request_failure(e.message));
    }
  };
};

export const featured = (payload) => {
  return async (dispatch) => {
    dispatch(fetch_request());
    try {
      const data = await makeRequest({
        endpoint: payload.endpoint,
        method: "GET",
        params: payload.data,
      });
      console.log(data);
      dispatch(getFeatured(data.results));
    } catch (e) {
      console.log(e);
      dispatch(fetch_request_failure(e.message));
    }
  };
};

export const getSeriesList = (payload) => {
  return async (dispatch) => {
    dispatch(fetch_request());
    try {
      const data = await makeRequest({
        endpoint: payload.endpoint,
        method: payload.method,
        data: payload.data,
      });
      dispatch(getRecomendedSeries(data.results));
    } catch (e) {
      console.log(e);
      dispatch(fetch_request_failure(e.message));
    }
  };
};
