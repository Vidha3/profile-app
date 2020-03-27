import { Component, OnInit } from '@angular/core';
import { ContactFormComponent } from './../contact-form/contact-form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name: string;
  email: string;
  mobile: string;
  address: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  	// console.log(window["profileInfoData"].getData())
  	this.name = this.route.snapshot.paramMap.get('firstName') + " " + this.route.snapshot.paramMap.get('lastName');
  	this.email = this.route.snapshot.paramMap.get('emailId');
  	this.mobile = this.route.snapshot.paramMap.get('mobile');
  	this.address = this.route.snapshot.paramMap.get('address');
  }

}
