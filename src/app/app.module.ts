import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { UploadComponent } from './component/upload/upload.component';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { DownloadComponent } from './component/download/download.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { FileSaverModule } from 'ngx-filesaver';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MaterialModule } from './material.module';
import { ImgListComponent } from './component/img-list/img-list.component';
import { AddLinkComponent } from './add-link/add-link.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    DownloadComponent,
    ImgListComponent,
    AddLinkComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,

    HttpClientModule,
    FileSaverModule,
    FormsModule,
    ReactiveFormsModule,


    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,



  ],
  providers: [
    { provide: BUCKET, useValue: 'gs://practice-7953d.appspot.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
