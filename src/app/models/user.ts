export class User {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	// address: object;
	address: string;
	avatarUrl: string;
	bio: string;

	constructor(firstName, lastName, email, mobile, address){
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phone = mobile;
		this.address = address;
		this.avatarUrl = "./../../assets/static/placeholder.png";
		this.bio = "Hi, my name is " + this.firstName + " " + this.lastName + ". Welcome to my profile!";
	}

	// get functions

	public getFirstName() {
		return this.firstName;
	}
	public getLastName() {
		return this.lastName;
	}
	public getEmail() {
		return this.email;
	}
	public getMobile() {
		return this.phone;
	}
	public getAddress() {
		return this.address;
	}
	public getAvatarUrl() {
		return this.avatarUrl;
	}
	public getBio() {
		return this.bio;
	}

	// set functions

	public setFirstName(firstName) {
		this.firstName = firstName;
	}
	public setLastName(lastName) {
		this.lastName = lastName;
	}
	public setEmail(email) {
		this.email =  email;
	}
	public setMobile(mobile) {
		this.phone = mobile;
	}
	public setAddress(address) {
		this.address = address;                             
	}
	public setAvatarUrl(avatarUrl) {
		this.avatarUrl = avatarUrl;
	}
	public setBio(bio) {
		this.bio = bio;
	}

}