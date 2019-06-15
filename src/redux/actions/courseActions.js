import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';

export function createCourse(course) {
//    debugger;
    return {type: types.CREATE_COURSE, course}; //object shorthand syntax!!
}

export function loadCoursesSuccess(courses) {
    return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function loadCourses() {
    return function(dispatch) {
        return courseApi.getCourses()
        .then(courses => {
            dispatch(loadCoursesSuccess(courses));
        })
        .catch(error => {
            throw error;
        });
    };
}
