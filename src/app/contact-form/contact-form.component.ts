import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { ProfileInfo } from './../profile-info'

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})

export class ContactFormComponent implements OnInit {
/** profileForm = new FormGroup({
*  firstName: new FormControl(''),
*  lastName: new FormControl(''),
*  emailId: new FormControl(''),
*  website: new FormControl(''),
*  mobile: new FormControl(''),
*  gender: new FormControl(''),
*  address: new FormControl('')
* });
*/

profileForm = this.fb.group({
	firstName: [''],
	lastName: [''],
	emailId: [''],
	website: [''],
	mobile: [''],
	gender: [''],
	address: ['']
});

  constructor(
  private router: Router, 
  private fb: FormBuilder,) { }

  ngOnInit(): void {
  }

  onSubmit(){
  		this.router.navigateByUrl("/profile");
  		// console.log(this.profileForm.value);
  		window["profileInfoObj"].setData(this.profileForm.value);
  		
   }

}
