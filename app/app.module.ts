import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SigninComponent } from './auth/signin/signin.component';
import { CurrentTrainingComponent } from './train/current-training/current-training.component';
import { PastTrainingComponent } from './train/past-training/past-training.component';
import { TrainingComponent } from './train/training/training.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './nv/header/header.component';
import { SidenavComponent } from './nv/sidenav/sidenav.component';
import { NewTrainingComponent } from './train/new-training/new-training.component';

import { StopDialogComponent } from './train/current-training/stopDialog.component';
import { AuthService } from './auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TrainingService } from './train/training.service';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UIService } from './shared/ui.service';

import { StoreModule } from '@ngrx/store';
import {appReducer} from './app.reducer'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    CurrentTrainingComponent,
    PastTrainingComponent,
    TrainingComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavComponent,
    NewTrainingComponent,
    StopDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot({ui:appReducer })

  ],
  providers: [AuthService,TrainingService,UIService], // for use all over the app
  bootstrap: [AppComponent],
  entryComponents: [StopDialogComponent]// to auto fetch component
})
export class AppModule {}
