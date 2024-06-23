import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
// import logger from "redux-logger";
import { combineReducers } from "redux";
import { movie } from ".";

const rootReducer = combineReducers({
  movies: movie,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
