import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	url: string;
	user: User;
	data;


  constructor(private http: HttpClient) {
  	this.url = "https://app.fakejson.com/q/39qk0Byg?token=5Yhg2amZDinB9lmayECjhQ";

  	 }

  public setUrl(url){
  	this.url = url;
  }

  public getDataFromUrl() {
  	return this.http.get<any>(this.url);
  }

}
