import { GET_USERS_COURSES, COURSE_ERROR } from '../actions/types';

const initialState = {
  usersCourses: null,
  courses: [],
  loading: true,
  error: {},
};

const exp = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS_COURSES:
      return {
        ...state,
        usersCourses: payload,
        loading: false,
      };
    case COURSE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default exp;
