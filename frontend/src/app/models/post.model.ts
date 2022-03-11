import { User } from './user.model';

export class Post {
  constructor(
    public id: string,
    public user: User,
    public title: string,
    public description: string,
    public datetime: string,
    public image: string,
  ) {}
}

export interface ApiPostData {
  _id: string,
  user: User,
  title: string,
  description: string,
  datetime: string,
  image: string,
}

export interface PostData {
  [key: string]: any;
  user: string | undefined,
  title: string;
  description: string;
  image: File | null;
}
