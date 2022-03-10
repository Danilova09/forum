import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../services/posts.service';
import { fetchPostsFailure, fetchPostsRequest, fetchPostsSuccess } from './posts.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PostsEffects {
  constructor(
    private actions: Actions,
    private postsService: PostsService,
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


}
