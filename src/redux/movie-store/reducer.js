import * as Types from "./types.js";

const movie_state = {
  loading: false,
  movies: [],
  movie: {},
  featured: [],
  error: null,
  page: 1,
  total_pages: 1,
};

export const movieReducer = (state = movie_state, action) => {
  switch (action.type) {
    case Types.FETCH_REQUEST:
      return { ...state, loading: true };

    case Types.GET_ALL_MOVIES:
      return {
        ...state,
        movies: action.payload.results,
        total_pages: action.payload.total_pages,
        page: action.payload.page,
        loading: false,
      };

    case Types.FETCH_REQUEST_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case Types.GET_SINGLE_MOVIE:
      return {
        ...state,
        movie: action.payload,
        page: action.payload.page,
        total_pages: action.payload.total_pages,
      };

    case Types.GET_FEATURED:
      return {
        ...state,
        featured: action.payload,
        loading: false,
      };

    
    default:
      return movie_state;
  }
};
