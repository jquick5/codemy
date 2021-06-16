import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { enroll, deleteCourse } from '../../actions/courseActions';
import { Link, withRouter } from 'react-router-dom';

const CourseTop = ({
  enroll,
  deleteCourse,
  auth,
  history,
  course: {
    title,
    imageUrl,
    description,
    createdOn,
    course,
    user,
    enrolledUsers,
  },
}) => {
  const onClick = (e) => {
    deleteCourse(course._id);
    history.push('/dashboard');
  };
  return (
    <div className='container'>
      <div className='card bg-primary p-2 text-center'>
        <div>
          <img className='round-img my-1' src={course.imageUrl} alt='' />
          <h1 className='large'>{course.title}</h1>
          <p className='lead'>{course.description}</p>
          <p>
            Created on <Moment format='MM/DD/YYYY'>{createdOn}</Moment>
          </p>
        </div>
        {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === course.user ? (
          <Fragment>
            <Link to='edit-course' className='btn btn-dark'>
              Edit Course
            </Link>
            <button className='btn btn-danger' onClick={(e) => onClick(e)}>
              Delete
            </button>
          </Fragment>
        ) : course.enrolledUsers.filter((u) => u.user === auth.user._id) < 1 ? (
          <Fragment>
            <button
              onClick={(e) => enroll(course._id)}
              className='btn btn-dark my-2'
            >
              Enroll
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <button
              //onClick={(e) => enroll(course._id)}
              className='btn btn-dark my-2'
              disabled
            >
              You are enrolled in this course
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

CourseTop.propTypes = {
  enroll: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  course: state.courseReducer,
  auth: state.authReducer,
});

export default connect(mapStateToProps, { enroll, deleteCourse })(
  withRouter(CourseTop),
);
