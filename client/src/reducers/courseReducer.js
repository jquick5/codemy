import {
  GET_USERS_COURSES,
  COURSE_ERROR,
  UPDATE_COURSE,
  GET_COURSE,
  SET_CURRENT_COURSE,
  GET_ALL_COURSES,
  CLEAR_COURSE,
  DELETE_COURSE,
  UPDATE_ENROLL,
  FILTER_COURSES,
  CLEAR_FILTER,
} from '../actions/types';

const initialState = {
  course: null,
  usersCourses: null,
  courses: [],
  loading: true,
  error: {},
  current: null,
  user: null,
  enrolledUsers: [],
  filtered: null,
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
    case CLEAR_COURSE:
      return {
        ...state,
        course: null,
        loading: false,
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter((course) => course._id !== payload),
        loading: false,
      };
    case GET_COURSE:
    case UPDATE_COURSE:
      return {
        ...state,
        course: payload,
        loading: false,
      };
    case GET_ALL_COURSES:
      return {
        ...state,
        courses: payload,
        loading: false,
      };
    case SET_CURRENT_COURSE:
      return {
        ...state,
        course: payload._id,
        current: payload._id,
        loading: false,
      };
    case COURSE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_ENROLL:
      return {
        ...state,
        courses: state.courses.map((course) =>
          course.id === payload.id
            ? { ...course, enrolledUsers: payload.enrolledUsers }
            : course,
        ),
        loading: false,
      };
    case FILTER_COURSES:
      return {
        ...state,
        filtered: state.courses.filter((course) => {
          const regex = new RegExp(`${payload}`, 'gi');
          return course.title.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    default:
      return state;
  }
};

export default exp;
