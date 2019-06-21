import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers"; //calling just the folder here.  index.js is implied.
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
