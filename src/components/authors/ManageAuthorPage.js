import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAuthors, saveAuthor } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import AuthorForm from "./AuthorForm";
import { newAuthor } from "../../../tools/mockData";
import { getBySlug } from "../../redux/reducers/Selectors";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const ManageAuthorPage = ({ history, match }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => {
    const slug = match.params.slug;
    const author =
      slug && state.authors.length > 0
        ? getBySlug(state.authors, slug)
        : newAuthor;
    return {
      author,
      authors: state.authors,
      loading: state.apiCallsInProgress > 0
    };
  });
  const { authors } = redux;
  const [author, setAuthor] = useState({ ...redux.author });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (authors.length === 0) {
      dispatch(loadAuthors()).catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, [author]);

  function handleChange(event) {
    const { name, value } = event.target; //destructuring here
    setAuthor(prevAuthor => ({
      ...prevAuthor,
      [name]: value //this is equivalent to whatever part of course changed. I.E. course.title
    }));
  }

  const formIsValid = () => {
    const { firstName, lastName } = author;
    const errors = {};

    if (!firstName) errors.firstName = "A firstName is required.";
    if (!lastName) errors.lastName = "A lastName is required.";

    setErrors(errors);
    //Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  };

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    dispatch(saveAuthor(author))
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
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default ManageAuthorPage;
