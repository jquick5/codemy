import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const CourseItem = ({
  course: {
    user: { name, id },
    title,
    imageUrl,
    description,
    createdOn,
    isPublic,
    _id,
  },
}) => {
  return (
    <div className='card profile bg-light'>
      <div>
        {isPublic && <span className='badge badge-primary'>Public</span>}
        <img src={imageUrl} alt='title' className='round-img' />
      </div>

      <div>
        <h3 className='text-center my-2'>{title}</h3>
        <p className='text-center'>{description}</p>
      </div>
      <div>
        <p>
          Created on <Moment format='MM/DD/YYYY'>{createdOn}</Moment>{' '}
        </p>
      </div>
      <Link
        to={`/${_id}`}
        className='btn btn-primary my-2 text-center'
        style={{ display: 'inline-block' }}
      >
        View Course
      </Link>
    </div>
  );
};

CourseItem.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseItem;
