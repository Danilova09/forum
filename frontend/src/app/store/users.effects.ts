import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import {
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess
} from './users.actions';
import { map, mergeMap, NEVER, tap, withLatestFrom } from 'rxjs';
import { HelpersService } from '../services/helpers.service';
import { AppState } from './types';
import { Store } from '@ngrx/store';

@Injectable()
export class UsersEffects {
  constructor(
    private actions: Actions,
    private usersService: UsersService,
    private router: Router,
    private helpers: HelpersService,
    private store: Store<AppState>
  ) {}

  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUserRequest),
    mergeMap(({userData}) => this.usersService.registerUser(userData).pipe(
      map(user => registerUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Register successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(registerUserFailure)
    ))
  ))
}
