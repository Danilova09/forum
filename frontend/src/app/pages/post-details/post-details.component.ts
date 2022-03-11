import { Component, OnInit, ViewChild } from '@angular/core';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getPostRequest } from '../../store/posts.actions';
import { User } from '../../models/user.model';
import { fetchCommentsRequest, postCommentRequest } from '../../store/comments.actions';
import { ApiCommentData } from '../../models/comment.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.sass']
})
export class PostDetailsComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  user!: Observable<null | User>;
  post!: Observable<null | Post>;
  posting!: Observable<boolean>;
  comments!: Observable<ApiCommentData[]>;
  userId!: string | undefined;
  postId!: string;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.post = this.store.select(state => state.posts.post);
    this.user = this.store.select(state => state.users.user);
    this.comments = this.store.select(state => state.comments.comments);
    this.posting = this.store.select(state => state.comments.postLoading);
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params['id'];
    this.store.dispatch(getPostRequest({postId: this.postId}));
    this.store.dispatch(fetchCommentsRequest({postId: this.postId}));
    this.store.select(state => state.users.user).subscribe(userData => {
      this.userId = userData?._id;
    });
  }

  onSubmit() {
    const commentData = {
      user: this.userId,
      post: this.postId,
      message: this.form.controls['message'].value,
    };
    this.store.dispatch(postCommentRequest({commentData}));
  }
}
