import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class geocodeService {
	constructor(private httpclient: HttpClient) { 
	}
	address: string;
	url= "https://us1.locationiq.com/v1/search.php";
	key = "2b00d33bd871f0";
	// this.address = "Rochester,NY";

	getResults(): Observable<any> {
		let params1 = new HttpParams().set('key', this.key)
									.set('q', this.address);
		return this.httpclient.get(this.url, {responseType: 'text', params: params1});
	}

	setAddress(address: string): void{
		this.address = address;
	} 
}