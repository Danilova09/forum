import { createAction, props } from '@ngrx/store';
import { Post } from '../models/post.model';

export const fetchPostsRequest = createAction('[Posts] Fetch Request');
export const fetchPostsSuccess = createAction('[Posts] Fetch Success', props<{posts: Post[]}>());
export const fetchPostsFailure = createAction('[Posts] Fetch Failure', props<{error: string}>());
