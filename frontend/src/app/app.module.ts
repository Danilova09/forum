import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { PostsComponent } from './pages/posts/posts.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ValidateEqualModule } from 'ng-validate-equal';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { usersReducer } from './store/users.reducer';
import { UsersEffects } from './store/users.effects';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { localStorageSync } from 'ngrx-store-localstorage';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PostsComponent,
    RegisterComponent,
    LoginComponent,
    CenteredCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    ValidateEqualModule,
    MatSnackBarModule,
    StoreModule.forRoot({
      users: usersReducer
    }, {metaReducers}),
    EffectsModule.forRoot([UsersEffects]),
    MatIconModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
