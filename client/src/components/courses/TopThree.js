import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllCourses } from '../../actions/courseActions';
import TopThreeItem from './TopThreeItem';

const TopThree = ({
  getAllCourses,
  course: { courses, loading, enrolledUsers },
}) => {
  useEffect(() => {
    getAllCourses();
    //eslint-disable-next-line
  }, []);

  const topThree = courses
    .sort((a, b) => a.enrolledUsers.length - b.enrolledUsers.length)
    .slice(0, 3);
  return (
    <Fragment>
      {topThree.length === 0 ? (
        <h4>No Courses Available</h4>
      ) : (
        <Fragment>
          <div className='grid-3'>
            {topThree.map((course) => (
              <TopThreeItem key={course._id} course={course} />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

TopThree.propTypes = {
  course: PropTypes.object.isRequired,
  getAllCourses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.courseReducer,
});

export default connect(mapStateToProps, { getAllCourses })(TopThree);
