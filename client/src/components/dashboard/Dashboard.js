import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Courses from '../courses/Courses';
import CourseFilter from '../courses/CourseFilter';
import { connect } from 'react-redux';
import { getUsersCourses } from '../../actions/courseActions';
import Spinner from '../layout/Spinner';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({
  getUsersCourses,
  auth,
  usersCourses: { courses, usersCourses, loading },
}) => {
  useEffect(() => {
    getUsersCourses();
    //eslint-disable-next-line
  }, []);

  return loading && usersCourses === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary text-center my-1'>
        Courses <CourseFilter />
      </h1>{' '}
      <section>
        <Link to='/create-course' className='btn btn-primary my-1'>
          Create Course
        </Link>
        {courses.length === 0 && (
          <Fragment>
            <h4>No Courses Available</h4>
          </Fragment>
        )}
      </section>
      <section>
        <Courses />
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getUsersCourses: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  usersCourses: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  usersCourses: state.courseReducer,
});

export default connect(mapStateToProps, { getUsersCourses })(Dashboard);
