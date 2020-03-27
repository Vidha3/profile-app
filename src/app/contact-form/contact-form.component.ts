import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'

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
      console.log(this.profileForm.value);
  		this.router.navigate(["/profile", this.profileForm.value]); 		
   }

}


