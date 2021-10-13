import {
  POST_LOADED_SUCCESS,
  POST_LOADED_FAILURE,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  FIND_POST,
} from '../contexts/constant';

export const postReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case POST_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postLoading: false,
      };
    case POST_LOADED_FAILURE:
      return {
        ...state,
        posts: [],
        postLoading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
      };

    case FIND_POST:
      return { ...state, post: payload };
    case UPDATE_POST:
      const newPost = state.posts.map((post) =>
        post._id === payload._id ? payload : post
      );

      return {
        ...state,
        posts: newPost,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    default:
      return state;
  }
};
