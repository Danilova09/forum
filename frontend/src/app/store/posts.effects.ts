import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../services/posts.service';
import {
  createPostFailure,
  createPostRequest,
  createPostSuccess,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess
} from './posts.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class PostsEffects {
  constructor(
    private actions: Actions,
    private postsService: PostsService,
    private router: Router,
  ) {}

  fetchPosts = createEffect(() => this.actions.pipe(
    ofType(fetchPostsRequest),
    mergeMap(() => this.postsService.getPosts().pipe(
      tap(posts => console.log(posts)),
      map(posts => fetchPostsSuccess({posts})),
      catchError(() => of(fetchPostsFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createPost = createEffect(() => this.actions.pipe(
    ofType(createPostRequest),
    mergeMap(({postData}) => this.postsService.createPost(postData).pipe(
      tap(postData => console.log(postData)),
      map(() => createPostSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createPostFailure({error: 'Wrong data'})))
    ))
  ));
}
