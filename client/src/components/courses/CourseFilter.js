import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterCourses, clearFilter } from '../../actions/courseActions';

const CourseFilter = ({
  course: { courses, filtered },
  filterCourses,
  clearFilter,
}) => {
  const text = useRef('');
  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterCourses(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form className='form'>
      <input
        className='bg-light'
        style={{
          borderRadius: '10px',
          border: 'none',
          width: '25%',
        }}
        ref={text}
        type='text'
        placeholder='Filter Courses...'
        onChange={onChange}
      />
    </form>
  );
};

CourseFilter.propTypes = {
  course: PropTypes.object.isRequired,
  filterCourses: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.courseReducer,
});

export default connect(mapStateToProps, { filterCourses, clearFilter })(
  CourseFilter,
);
