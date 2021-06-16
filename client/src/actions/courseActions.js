import axios from 'axios';
import { setAlert } from './alertActions';

import {
  GET_USERS_COURSES,
  GET_COURSE,
  COURSE_ERROR,
  UPDATE_COURSE,
  SET_CURRENT_COURSE,
  GET_ALL_COURSES,
  CLEAR_COURSE,
  DELETE_COURSE,
  UPDATE_ENROLL,
  FILTER_COURSES,
  CLEAR_FILTER,
} from './types';

//Get the current users courses
export const getUsersCourses = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/courses/me');

    dispatch({
      type: GET_USERS_COURSES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { mgs: err.response.statusText, status: err.response.status },
    });
  }
};

//Get All Courses
export const getAllCourses = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/courses');

    dispatch({
      type: GET_ALL_COURSES,
      payload: res.data,
    });
    dispatch({ type: CLEAR_COURSE });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { mgs: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Course by id
export const getCourseById = (courseId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/courses/${courseId}`);

    dispatch({
      type: GET_COURSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { mgs: err.response.statusText, status: err.response.status },
    });
  }
};

//Create Course
export const createCourse = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/courses', formData, config);

    dispatch({
      type: GET_USERS_COURSES,
      payload: res.data,
    });

    dispatch(setAlert('Course Created', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: COURSE_ERROR,
      payload: { mgs: err.response.statusText, status: err.response.status },
    });
  }
};

//Set Current Course
export const setCurrentCourse = (course) => async (dispatch) => {
  try {
    dispatch({
      type: SET_CURRENT_COURSE,
      payload: course,
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { mgs: err.response.statusText, status: err.response.status },
    });
  }
};

//Edit Course
export const editCourse = (id, formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(`/api/courses/${id}`, formData, config);

    dispatch({
      type: UPDATE_COURSE,
      payload: res.data,
    });
    dispatch({ type: CLEAR_COURSE });

    dispatch(setAlert('Course Updated', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: COURSE_ERROR,
      payload: { mgs: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete course
export const deleteCourse = (id) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`/api/courses/${id}`);

      dispatch({ type: DELETE_COURSE, payload: id });
      dispatch({ type: CLEAR_COURSE });

      dispatch(setAlert('Your course has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: COURSE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Enroll
export const enroll = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/courses/enroll/${id}`);
    dispatch(setAlert('Enrolled', 'success'));

    dispatch({
      type: UPDATE_ENROLL,
      payload: { id, enrolledUsers: res.data },
    });
    //dispatch({ type: GET_COURSE });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));

    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Un-Enroll
export const unEnroll = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/courses/unenroll/${id}`);

    dispatch({
      type: UPDATE_ENROLL,
      payload: { id, enrolledUsers: res.data },
    });
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Filter Courses
export const filterCourses = (text) => async (dispatch) => {
  dispatch({ type: FILTER_COURSES, payload: text });
};

//Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: CLEAR_FILTER });
};
