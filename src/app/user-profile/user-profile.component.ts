import { Component, OnInit } from '@angular/core';
import { ContactFormComponent } from './../contact-form/contact-form.component';
import { ActivatedRoute } from '@angular/router';
import { User } from './../models/user';
import { UserService } from './../services/user-service.service';

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
  address;
  
  user: User;
  data;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {   
    this.firstname = this.route.snapshot.paramMap.get('firstName');
    this.lastname = this.route.snapshot.paramMap.get('lastName');
    this.email = this.route.snapshot.paramMap.get('emailId');
    this.mobile = this.route.snapshot.paramMap.get('mobile');
    this.address = this.route.snapshot.paramMap.get('address');
    this.user = new User(this.firstname, this.lastname, this.email, this.mobile, this.address);
    
    this.getOtherDetails();


  }
  
  getOtherDetails() {
    this.userService.getDataFromUrl()
      .subscribe(data => 
        this.setDetails(data)
      );
  }

  setDetails(data) {
    this.data = data;
    console.log(this.data);
    this.user.setAvatarUrl(this.data.avatarUrl);
    this.user.setBio(this.data.bio);
  }
  

}
