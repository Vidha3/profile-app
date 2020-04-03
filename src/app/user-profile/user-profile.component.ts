import { Component, OnInit } from '@angular/core';
import { ContactFormComponent } from './../contact-form/contact-form.component';
import { ActivatedRoute } from '@angular/router';
import { User } from './../models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  address: string;
  
  
  user: User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {   
    this.firstname = this.route.snapshot.paramMap.get('firstName');
    this.lastname = this.route.snapshot.paramMap.get('lastName');
    this.email = this.route.snapshot.paramMap.get('emailId');
    this.mobile = this.route.snapshot.paramMap.get('mobile');
    this.address = this.route.snapshot.paramMap.get('address');
    // console.log("user-profile " + this.address)
    this.user = new User(this.firstname, this.lastname, this.email, this.mobile, this.address);

  	
  }

}
