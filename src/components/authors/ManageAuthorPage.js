import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
//import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import {
  loadAuthors,
  saveAuthor,
  deleteAuthor
} from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import AuthorForm from "./AuthorForm";
import { newAuthor } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const ManageAuthorPage = ({
  // courses,
  authors,
  loadAuthors,
  // loadCourses,
  saveAuthor,
  history,
  ...props //Rest operator-this says "Assign any props I havent destructured above to a variable called props"
}) => {
  const [author, setAuthor] = useState({ ...props.author });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    } else {
      setAuthor({ ...props.author });
    }
  }, [props.author]);

  function handleChange(event) {
    const { name, value } = event.target; //destructuring here
    setAuthor(prevAuthor => ({
      ...prevAuthor,
      [name]: value //this is equivalent to whatever part of course changed. I.E. course.title
    }));
  }

  const formIsValid = () => {
    const { name } = author;
    const errors = {};

    if (!author.name) errors.name = "A name is required.";

    setErrors(errors);
    //Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  };

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveAuthor(author)
      .then(() => {
        toast.success("Author Saved");
        history.push("/authors");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 ? (
    <Spinner />
  ) : (
    <AuthorForm
      author={author}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
};

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  // course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  // courses: PropTypes.array.isRequired,
  // loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveAuthor: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export function getAuthorBySlug(authors, slug) {
  return authors.find(author => author.slug === slug) || null; //called a selector.  It selects data from the Redux store. Could also be placed in courseReducer for re-use. for performance, memoize with reselect.
}

function mapStateToProps(state, ownProps /*automatically populated by redux*/) {
  const slug = ownProps.match.params.slug;
  const author =
    slug && state.authors.length > 0
      ? getAuthorBySlug(state.authors, slug)
      : newAuthor;
  return {
    author, //removed newCourse as it's now defined above as const course depending on ternary operation
    //courses: state.courses,
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

const mapDispatchToProps = {
  //  loadCourses,
  loadAuthors,
  saveAuthor,
  deleteAuthor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAuthorPage);
