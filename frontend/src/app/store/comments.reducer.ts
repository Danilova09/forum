import { createReducer, on } from '@ngrx/store';
import {
  fetchCommentsFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess,
  postCommentFailure,
  postCommentRequest,
  postCommentSuccess
} from './comments.actions';
import { CommentsState } from './types';


const initialState: CommentsState = {
  comments: [],
  fetchLoading: false,
  fetchError: null,
  postLoading: false,
  postError: null,
};

export const commentsReducer = createReducer(
  initialState,
  on(fetchCommentsRequest, state => ({...state, fetchLoading: true})),
  on(fetchCommentsSuccess, (state, {comments}) => ({...state, fetchLoading: false, comments})),
  on(fetchCommentsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
  on(postCommentRequest, state => ({...state, postLoading: true})),
  on(postCommentSuccess, (state) => ({...state, postLoading: false})),
  on(postCommentFailure, (state, {error}) => ({...state, postLoading: false, postError: error})),
);
