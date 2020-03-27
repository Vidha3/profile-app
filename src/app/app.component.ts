import { Component } from '@angular/core';

import { ProfileInfo } from './profile-info'

declare global {
    interface Window { MyNamespace: any; }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'profile-app';
  ngOnInit() {
    console.log('Hello world!');
    window["profileInfoData"] = new ProfileInfo();
  }

}
