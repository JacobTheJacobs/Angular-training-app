import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../app.reducer';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>(); //  emitting like eventemiter the user when ever we are signed in or not
  private isAuthenticated = false;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private auth: AngularFireAuth, private uiService: UIService, private store: Store<{ui: fromApp.State}>) {}

  registerUser(authData: AuthData) {
    this.store.dispatch({type: 'START_LOADING'});
    //this.uiService.loadingStateChanged.next(true);
    this.auth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      this.store.dispatch({type: 'STOP_LOADING'});
      //this.store.dispatch({type: 'START_LOADING'});
      this.success();
 })
 .catch(error => {
  this.store.dispatch({type: 'STOP_LOADING'});
  //this.uiService.loadingStateChanged.next(false);
  this.uiService.showSnackBar(error.message, null, 3000);
 });

  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.auth.auth.signInWithEmailAndPassword(authData.email, authData.password)
 .then(result => {
  this.store.dispatch({type: 'START_LOADING'});
 // this.uiService.loadingStateChanged.next(false);
      this.success();

    })
    .catch(error => {
      this.store.dispatch({type: 'STOP_LOADING'});
     // this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackBar(error.message, null, 3000);
    });
  }

  logout() {
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
  }



  isAuth() {
    return this.isAuthenticated;
  }
  private success() {
    this.isAuthenticated = true;
    this.authChange.next(true); // you are logged in
    this.router.navigate(['/training']);
  }
}
