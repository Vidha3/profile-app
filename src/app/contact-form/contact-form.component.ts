import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})

export class ContactFormComponent implements OnInit {

  profileForm: any;

  constructor(
  private router: Router, 
  private fb: FormBuilder,) { }

  ngOnInit(): void {
  // TODO: add validation
  
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      emailId: [''],
      website: [''],
      mobile: [''],
      gender: [''],
      address: ['']
  });
  }

  onSubmit(){
      if (this.profileForm.valid){
        this.router.navigate(["/profile", this.profileForm.value]); 
      }
  		else{
        alert(`Please make sure that your entries are valid`)
      }
   }

}


