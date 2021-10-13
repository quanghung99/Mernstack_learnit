import React from 'react';
import { postReducer } from '../reducers/postReducer';
import { createContext, useReducer, useState } from 'react';
import {
  apiUrl,
  POST_LOADED_SUCCESS,
  POST_LOADED_FAILURE,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  FIND_POST,
} from './constant';
import axios from 'axios';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    postLoading: true,
    posts: [],
    post: null,
  });
  const [ShowModal, SetShowModal] = useState(false);
  const [ShowModalUpdate, SetShowModalUpdate] = useState(false);

  //getPost
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/post`);
      if (response.data.success) {
        dispatch({ type: POST_LOADED_SUCCESS, payload: response.data.posts });
      }
    } catch (error) {
      dispatch({ type: POST_LOADED_FAILURE });
    }
  };

  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/post`, newPost);
      if (response.data.success) {
        dispatch({ type: ADD_POST, payload: response.data.post });
      }
      return response.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'server error' };
    }
  };

  // find post when user updating posts
  const findPost = (postId) => {
    const post = postState.posts.find((post) => post._id === postId);
    dispatch({ type: FIND_POST, payload: post });
  };

  // update post
  const updatedPost = async (updatePost) => {
    try {
      const response = await axios.put(
        `${apiUrl}/post/${updatePost._id}`,
        updatePost
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_POST, payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error.response.data
        ? error.response.data
        : { success: false, message: 'server error' };
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/post/${postId}`);
      if (response.data.success) {
        dispatch({ type: DELETE_POST, payload: postId });
      }
    } catch (error) {
      console.log(error);
      return error.response.data
        ? error.response.data
        : { success: false, message: 'server error' };
    }
  };

  const postData = {
    getPosts,
    postState,
    addPost,
    ShowModal,
    SetShowModal,
    deletePost,
    ShowModalUpdate,
    SetShowModalUpdate,
    updatedPost,
    findPost,
  };
  return (
    <PostContext.Provider value={postData}>{children}</PostContext.Provider>
  );
};

export default PostContextProvider;
