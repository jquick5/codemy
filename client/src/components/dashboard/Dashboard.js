import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsersCourses } from '../../actions/courseActions';
import Spinner from '../layout/Spinner';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({
  getUsersCourses,
  auth,
  usersCourses: { usersCourses, loading },
}) => {
  useEffect(() => {
    getUsersCourses();
    //eslint-disable-next-line
  }, []);

  return loading && usersCourses === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary text-center my-1'>Available Courses</h1>
      <section></section>
      <h1 className='large text-primary text-center my-1'>Enrolled Courses</h1>
      <section></section>
      <h1 className='large text-primary text-center my-1'>My Courses</h1>
      <section>
        {usersCourses.length > 0 ? (
          <Fragment>Has</Fragment>
        ) : (
          <Fragment>
            <Link to='/create-course' className='btn btn-primary my-1'>
              Create Course
            </Link>
            <h3 className='text-primary'>
              You have not created any courses. Please click the link to add a
              course
            </h3>
          </Fragment>
        )}
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
