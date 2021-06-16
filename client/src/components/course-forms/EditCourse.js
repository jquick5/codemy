import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  editCourse,
  setCurrentCourse,
  getUsersCourses,
  getCourseById,
} from '../../actions/courseActions';

const EditCourse = ({
  course: { usersCourses, course, loading },
  editCourse,
  setCurrentCourse,
  getUsersCourses,
  history,
  match,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    isPublic: false,
  });

  useEffect(() => {
    getCourseById(match.params.id);
    //setCurrentCourse(usersCourses._id);
    setFormData({
      title: loading || !course.title ? '' : course.title,
      description: loading || !course.description ? '' : course.description,
      imageUrl: loading || !course.imageUrl ? '' : course.imageUrl,
    });
    //eslint-disable-next-line
  }, [loading]);

  const { title, description, imageUrl, isPublic } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    editCourse(course._id, formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit This Course</h1>
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
            value={isPublic}
            name='isPublic'
            onChange={(e) => onChange(e)}
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

EditCourse.propTypes = {
  editCourse: PropTypes.func.isRequired,
  setCurrentCourse: PropTypes.func.isRequired,
  getUsersCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.courseReducer,
});

export default connect(mapStateToProps, {
  editCourse,
  getUsersCourses,
  setCurrentCourse,
})(withRouter(EditCourse));
