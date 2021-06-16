import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createCourse } from '../../actions/courseActions';

const CreateCourse = ({ createCourse, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    isPublic: false,
  });

  const { title, description, imageUrl, isPublic } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createCourse(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Course</h1>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Title'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Add a title for your course</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* ImageURL'
            name='imageUrl'
            value={imageUrl}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Add a link to your course image</small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='* A short description of your course'
            name='description'
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className='form-text'>
            Tell us a little about your Course
          </small>
        </div>
        <div>
          <input
            type='checkbox'
            name='isPublic'
            checked={isPublic}
            value={isPublic}
            onChange={() => setFormData({ ...formData, isPublic: !isPublic })}
          />{' '}
          <label htmlFor='isPublic'>Public</label>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateCourse.propTypes = {
  createCourse: PropTypes.func.isRequired,
};

export default connect(null, { createCourse })(withRouter(CreateCourse));
