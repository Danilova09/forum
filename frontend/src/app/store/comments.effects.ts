import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, mergeMap, NEVER, of, tap } from 'rxjs';
import {
  fetchCommentsFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess, postCommentFailure, postCommentRequest, postCommentSuccess,
} from './comments.actions';
import { CommentsService } from '../services/comments.service';
import { AppState } from './types';
import { Store } from '@ngrx/store';


@Injectable()
export class CommentsEffects {

  constructor(
    private actions: Actions,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private commentsService: CommentsService,
  ) {
  }

  fetchComments = createEffect(() => this.actions.pipe(
    ofType(fetchCommentsRequest),
    mergeMap(({postId}) => this.commentsService.getComments(postId).pipe(
      map(comments => fetchCommentsSuccess({comments})),
      catchError(() => of(fetchCommentsFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  postComment = createEffect(() => this.actions.pipe(
    ofType(postCommentRequest),
    mergeMap(({commentData}) => this.commentsService.addComment(commentData).pipe(
      tap(() => postCommentSuccess()),
      map(() => fetchCommentsRequest({postId: commentData.post})),
      catchError(() => of(postCommentFailure({error: 'Wrong data'})))
    ))
  ));
}
