import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const ManageCoursePage = ({ history, match }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => {
    const slug = match.params.slug;

    function getCourseBySlug(courses, slug) {
      return courses.find(course => course.slug === slug) || null; //called a selector.  It selects data from the Redux store. Could also be placed in courseReducer for re-use. for performance, memoize with reselect.
    }

    const course =
      slug && state.courses.length > 0
        ? getCourseBySlug(state.courses, slug)
        : newCourse;
    return {
      course, //removed newCourse as it's now defined above as const course depending on ternary operation
      courses: state.courses,
      authors: state.authors,
      loading: state.apiCallsInProgress > 0
    };
  });

  const { authors, courses } = redux;
  const [course, setCourse] = useState({ ...redux.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(loadCourses()).catch(error => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ course });
    }

    if (authors.length === 0) {
      dispatch(loadAuthors()).catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, [course]);

  function handleChange(event) {
    const { name, value } = event.target; //destructuring here
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value //this is equivalent to whatever part of course changed. I.E. course.title
    }));
  }

  const formIsValid = () => {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required.";
    if (!category) errors.category = "Category is required.";

    setErrors(errors);
    //Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  };

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    dispatch(saveCourse(course))
      .then(() => {
        toast.success("Course Saved");
        history.push("/courses");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 && courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
};

ManageCoursePage.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default ManageCoursePage;
