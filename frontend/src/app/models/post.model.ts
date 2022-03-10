import { User } from './user.model';

export class Post {
  constructor(
    public id: string,
    public user: User,
    public title: string,
    public description: string,
    public image: string,
  ) {}
}

export interface ApiPostData {
     _id: string,
     user: User,
     title: string,
     description: string,
     image: string,
}


export interface PostData {
  [key: string]: any;
  title: string;
  description: string;
  image: File | null;
}
