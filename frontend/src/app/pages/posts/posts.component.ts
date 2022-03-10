import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { AppState } from '../../store/types';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { fetchPostsRequest } from '../../store/posts.actions';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {
  posts!: Observable<Post[]>;
  loading!: Observable<boolean>;
  error!: Observable<null | string>

  constructor(private store: Store<AppState>) {
    this.posts = this.store.select(state => state.posts.posts);
    this.loading = this.store.select(state => state.posts.fetchLoading);
    this.error= this.store.select(state => state.posts.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPostsRequest());
  }
}
