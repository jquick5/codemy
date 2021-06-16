import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import UserCourseItem from './UserCourseItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsersCourses } from '../../actions/courseActions';

const UsersCourses = ({
  getUsersCourses,
  usersCourses: { usersCourses, loading },
}) => {
  useEffect(() => {
    getUsersCourses();
    //eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='grid-3'>
            <div>
              {usersCourses.length > 0 ? (
                usersCourses.map((course) => (
                  <UserCourseItem key={course._id} course={course} />
                ))
              ) : (
                <h4>No Courses Available</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

UsersCourses.propTypes = {
  getUsersCourses: PropTypes.func.isRequired,
  usersCourses: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  usersCourses: state.courseReducer,
});

export default connect(mapStateToProps, { getUsersCourses })(UsersCourses);
