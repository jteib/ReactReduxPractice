import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
courses, // can omit the right side (shorthand)
authors,
apiCallsInProgress
});

export default rootReducer;
