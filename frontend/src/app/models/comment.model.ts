import { User } from './user.model';
import { ApiPostData } from './post.model';

export interface ApiCommentData {
  _id: string,
  user: User,
  post: ApiPostData,
  message: string,
}

export interface CommentData {
  user: string | undefined,
  post: string,
  message: string,
}
