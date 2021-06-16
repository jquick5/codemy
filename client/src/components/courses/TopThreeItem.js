import React from 'react';

import PropTypes from 'prop-types';

const TopThreeItem = ({ course }) => {
  return (
    <div className='card'>
      <div className='bg-light'>
        <div>
          <img src={course.imageUrl} alt='title' className='round-img' />
          <h3 className='text-center my-2'>{course.title}</h3>
        </div>
      </div>
    </div>
  );
};

TopThreeItem.propTypes = {
  course: PropTypes.object.isRequired,
};

export default TopThreeItem;
