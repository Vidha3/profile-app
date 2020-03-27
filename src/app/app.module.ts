import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileInfo } from './profile-info'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './app-header/app-header.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MapComponent } from './map/map.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactFormComponent,
    UserProfileComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
    {
      path: 'profile',
      component:  UserProfileComponent
    },
    {
      path: 'map',
      component: MapComponent
    },
    {
      path: 'header',
      component: HeaderComponent
    },
    {
      path: '',
      component: ContactFormComponent
    },
    ]
    )
  ],
  providers: [{provide: ProfileInfo, useValue: window["profileInfoData"]}],
  bootstrap: [AppComponent]
})
export class AppModule { }
