import * as types from "../actions/actionTypes";
import { initialState } from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      //state.push(action.course); //don't do this.  Mutates state.
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      return state.map(course =>
        course.id === action.course.id ? action.course : course
      );
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.DELETE_COURSE_OPTIMISTIC:
      //returns a new array - no mutating state!!
      return state.filter(course => course.id !== action.course.id);
    default:
      return state;
  }
}
