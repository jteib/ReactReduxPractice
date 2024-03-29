import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;
    //debugger;
    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("loading courses failed" + error);
      });
    }
    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("loading authors failed" + error);
      });
    }
  }

  handleDeleteCourse = course => {
    console.log(this.sortedCourses);
    toast.success("Course Deleted"); //optimistic!!
    this.props.actions.deleteCourse(course).catch(error => {
      toast.error("Delete Failed!" + error.message, { autoClose: false });
    });
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && (
          <Redirect to="/course" />
        ) /*this only works if left side is true, click button below to change true*/}
        {this.props.courses.length === 1 ? (
          <h2>{this.props.courses.length} Course</h2>
        ) : (
          <h2>{this.props.courses.length} Courses</h2>
        )}

        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            {this.props.courses.length === 0 ? (
              <h2>No Courses! Maybe try adding one?</h2>
            ) : (
              <CourseList
                onDeleteClick={this.handleDeleteCourse}
                courses={this.props.courses}
              />
            )}

            {this.props.courses.map(course => (
              <div key={course.title}>{course.title}</div>
            ))}
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const courses =
    state.authors.length === 0
      ? []
      : state.courses.map(course => {
          return {
            ...course,
            authorName: state.authors
              .find(a => a.id === course.authorId)
              .firstName.concat(
                " ",
                state.authors.find(a => a.id === course.authorId).lastName
              )
          };
        });
  return {
    courses,
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage); //two function calls here in series
