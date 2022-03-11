import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getPostRequest } from '../../store/posts.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.sass']
})
export class PostDetailsComponent implements OnInit {
  user!: Observable<null | User>;
  post!: Observable<null | Post>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    ) {
    this.post = this.store.select(state => state.posts.post);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    const postId = this.route.snapshot.params['id'];
    this.store.dispatch(getPostRequest({postId}));
  }
}
