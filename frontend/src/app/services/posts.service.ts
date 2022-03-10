import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPostData, Post } from '../models/post.model';
import { environment as env } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient,
  ) { }

  getPosts() {
    return this.http.get<ApiPostData[]>(env.apiUrl + '/posts').pipe(
      map(response => {
        return response.map(postData => {
          return new Post(
            postData._id,
            postData.user,
            postData.title,
            postData.description,
            postData.image,
          );
        });
      })
    );
  }
}
