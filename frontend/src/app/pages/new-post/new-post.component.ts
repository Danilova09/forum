import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { createPostRequest } from '../../store/posts.actions';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.sass']
})
export class NewPostComponent  {
  @ViewChild('f') form!: NgForm;
  loading!: Observable<boolean>;
  error!: Observable<null | string>;
  userId!: string | undefined;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.posts.createLoading);
    this.error = store.select(state => state.posts.createError);
    store.select(state => state.users.user).subscribe(user => {
      this.userId = user?._id;
    })
  }


  onSubmit() {
    const postData = {
      user: this.userId,
      title: this.form.controls['title'].value,
      description: this.form.controls['description'].value,
      image: this.form.controls['image'].value,
    }
    this.store.dispatch(createPostRequest({postData}));
  }
}

