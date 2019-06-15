import { combineReducers } from 'redux';
import courses from "./courseReducer";
import authors from "./authorReducer";

const rootReducer = combineReducers({
    courses, // can omit the right side (shorthand)
    authors
});

export default rootReducer;