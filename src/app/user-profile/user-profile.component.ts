import { Component, OnInit } from '@angular/core';
import { ContactFormComponent } from './../contact-form/contact-form.component';
import { ProfileInfo } from './../profile-info'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  	console.log(window["profileInfoData"].getData())
  }

}
