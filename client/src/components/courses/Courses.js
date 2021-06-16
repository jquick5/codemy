import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import CourseItem from './CourseItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllCourses } from '../../actions/courseActions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Courses = ({ getAllCourses, course: { courses, loading, filtered } }) => {
  useEffect(() => {
    getAllCourses();
    //eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='card'>
            {courses.length > 0 ? (
              <TransitionGroup className='grid-2'>
                {filtered !== null
                  ? filtered.map((course) => (
                      <CSSTransition
                        key={course._id}
                        timeout={500}
                        classNames='item'
                      >
                        <CourseItem key={course._id} course={course} />
                      </CSSTransition>
                    ))
                  : courses.map((course) => (
                      <CSSTransition
                        key={course._id}
                        timeout={500}
                        classNames='item'
                      >
                        <CourseItem key={course._id} course={course} />
                      </CSSTransition>
                    ))}
              </TransitionGroup>
            ) : (
              <h4>No Courses Available</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Courses.propTypes = {
  getAllCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.courseReducer,
});

export default connect(mapStateToProps, { getAllCourses })(Courses);
