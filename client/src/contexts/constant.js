export const apiUrl =
  process.env.NODE_ENV !== 'production'
    ? 'https://fast-refuge-62315.herokuapp.com/api'
    : 'https://fast-refuge-62315.herokuapp.com/api';

export const LOCAL_STORAGE_TOKEN_NAME = 'project_learnit';
export const POST_LOADED_SUCCESS = 'POST_LOADED_SUCCESS';
export const POST_LOADED_FAILURE = 'POST_LOADED_FAILURE';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const FIND_POST = 'FIND_POST';
