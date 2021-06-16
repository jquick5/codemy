import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserCourseItem = ({ course }) => {
  return (
    <div className='card'>
      <div className='bg-light'>
        <div>
          <img src={course.imageUrl} alt='title' className='round-img' />
          <h3 className='text-center my-2'>{course.title}</h3>
          <Link
            to={`/${course._id}`}
            className='btn btn-primary my-2 text-center'
            style={{ display: 'inline-block' }}
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

UserCourseItem.propTypes = {
  course: PropTypes.object.isRequired,
};

export default UserCourseItem;
