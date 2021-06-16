import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import {
  getCourseById,
  setCurrentCourse,
  deleteCourse,
} from '../../actions/courseActions';
import { Link } from 'react-router-dom';
import CourseTop from './CourseTop';

const Course = ({
  setCurrentCourse,
  getCourseById,
  deleteCourse,
  history,
  course: { courses, current, course, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getCourseById(match.params.courseId);
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {course === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='profile-grid my-1'>
            <CourseTop course={course} />
          </div>
          <Link to='/dashboard' className='btn btn-light'>
            Back to Courses
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Course.propTypes = {
  getCourseById: PropTypes.func.isRequired,
  setCurrentCourse: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.courseReducer,
  auth: state.authReducer,
});

export default connect(mapStateToProps, {
  setCurrentCourse,
  getCourseById,
  deleteCourse,
})(Course);
