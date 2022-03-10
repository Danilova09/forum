import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPostData, Post, PostData } from '../models/post.model';
import { environment as env } from '../../environments/environment';
import { map, tap } from 'rxjs';

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
            postData.datetime,
            postData.image,
          );
        });
      })
    );
  }

  createPost(postData: PostData) {
    const formData = new FormData();
    Object.keys(postData).forEach(key => {
      if (postData[key] !== null) formData.append(key, postData[key]);
    });

    return this.http.post(env.apiUrl + '/posts', formData);
  }
}
