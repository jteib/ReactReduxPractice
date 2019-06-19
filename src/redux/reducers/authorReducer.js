import * as types from "../actions/actionTypes"; //I think this is redundant, but Cory recommends it over hardcoded strings.
import { initialState } from "./initialState";

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default:
      return state;
  }
}
