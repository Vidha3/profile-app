import { Injectable } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form.component';

@Injectable({
  providedIn: 'root',
})

export class ProfileInfo {
 private profileFormData: object;

constructor(){
	console.log('constructor')
}

public setData(cfObject: object): void{
	this.profileFormData = cfObject;
}

public getData(): object{
	 return this.profileFormData;
}
	

}
