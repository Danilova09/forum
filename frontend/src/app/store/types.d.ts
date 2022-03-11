import { LoginError, RegisterError, User } from '../models/user.model';
import { Post } from '../models/post.model';

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type PostsState ={
  posts: Post[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  post: null | Post,
  postLoading: boolean,
  postError: null | string,
}

export type AppState = {
  posts: PostsState,
  users: UsersState,
}
