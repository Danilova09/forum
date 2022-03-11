import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { ApiCommentData, CommentData } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {}

  getComments(postId: string) {
    const params = new HttpParams().set('postId', postId);
    return this.http.get<ApiCommentData[]>(env.apiUrl + '/comments', {params});
  }

  addComment(commentData: CommentData) {
    return this.http.post(env.apiUrl + '/comments', commentData);
  }
}
