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
  address: string;
  
  user: User;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {   
    this.firstname = this.route.snapshot.paramMap.get('firstName');
    this.lastname = this.route.snapshot.paramMap.get('lastName');
    this.email = this.route.snapshot.paramMap.get('emailId');
    this.mobile = this.route.snapshot.paramMap.get('mobile');
    this.address = this.route.snapshot.paramMap.get('address');
    this.user = new User(this.firstname, this.lastname, this.email, this.mobile, this.address);
    
    this.getDetailsFromService();
  }
  
  getDetailsFromService() {
    this.userService.getDataFromUrl()
      .subscribe(data => 
        this.setDetails(data)
      );
  }

  setDetails(data) {
    this.user.setAvatarUrl(data.avatarUrl);
    this.user.setBio(data.bio);

    // uncomment to extract more data from the json service

    // this.user.setAddress(this.strAddress(this.data.address));
    // this.user.setFirstName(data.firstName);
    // this.user.setLastName(data.lastName);
    // this.user.setMobile(data.phone);
    // this.user.setEmail(data.email);
  }

  strAddress(address) {
  // converts address to string form from object
    return address.building + " " + address.street + ", " +
            address.city + ", " + address.state + ", " +
            address.zipcode;
  }
  

}
