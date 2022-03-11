import { createAction, props } from '@ngrx/store';
import { ApiCommentData, CommentData } from '../models/comment.model';

export const fetchCommentsRequest = createAction('[Comments] Fetch Request', props<{postId: string}>());
export const fetchCommentsSuccess = createAction('[Comments] Fetch Success', props<{comments: ApiCommentData[]}>());
export const fetchCommentsFailure = createAction('[Comments] Fetch Failure', props<{error: string}>());

export const postCommentRequest = createAction('[Comments] Post Request', props<{commentData: CommentData}>());
export const postCommentSuccess = createAction('[Comments] Post Success');
export const postCommentFailure = createAction('[Comments] Post Failure', props<{error: string}>());
