import axios from 'axios';
import { setAlert } from './alertActions';

import { GET_USERS_COURSES, COURSE_ERROR } from './types';

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
