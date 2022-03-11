import { PostsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createPostFailure,
  createPostRequest,
  createPostSuccess,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess, getPostFailure, getPostRequest, getPostSuccess
} from './posts.actions';

const initialState: PostsState = {
  posts: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  post: null,
  postLoading: false,
  postError: null,
};

export const postsReducer = createReducer(
  initialState,
  on(fetchPostsRequest, state => ({...state, fetchLoading: true})),
  on(fetchPostsSuccess, (state, {posts}) => ({...state, fetchLoading: false, posts})),
  on(fetchPostsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(createPostRequest, (state, {postData}) => ({...state, createLoading: true})),
  on(createPostSuccess, (state) => ({...state, createLoading: false})),
  on(createPostFailure, (state, {error}) => ({...state, createLoading: false , createError: error})),

  on(getPostRequest, (state, {postId}) => ({...state, postLoading: true})),
  on(getPostSuccess, (state, {post}) => ({...state, postLoading: false, post})),
  on(getPostFailure, (state, {error}) => ({...state, postLoading: false , postError: error})),
);
