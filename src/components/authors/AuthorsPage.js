import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import AuthorList from "./AuthorList";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class AuthorsPage extends Component {
  state = {
    redirectToAddAuthorPage: false
  };

  componentDidMount() {
    const { authors, actions } = this.props;
    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("loading authors failed" + error);
      });
    }
  }

  handleDeleteAuthor = author => {
    if (this.props.courses.find(a => a.authorId === author.id)) {
      alert("This author still works here. Cannot delete employed authors.");
    } else {
      toast.success("Author Deleted"); //optimistic!!
      this.props.actions.deleteAuthor(author).catch(error => {
        toast.error("Delete Failed!" + error.message, { autoClose: false });
      });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddAuthorPage && (
          <Redirect to="/author" />
        ) /*this only works if left side is true, click button below to change true*/}
        <h2>Authors</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddAuthorPage: true })}
            >
              Add Author
            </button>

            <AuthorList
              onDeleteClick={this.handleDeleteAuthor}
              authors={this.props.authors}
            />

            {this.props.authors.map(author => (
              <div key={author.id}>{author.name}</div>
            ))}
          </>
        )}
      </>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    authors:
      state.authors.length === 0
        ? []
        : state.authors.map(author => {
            return {
              ...author,
              name: author.firstName.concat(" ", author.lastName)
            };
          }),
    courses: state.courses.length === 0 ? [] : state.courses,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteAuthor: bindActionCreators(authorActions.deleteAuthor, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorsPage); //two function calls here in series
