import { Component } from '@angular/core';

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
}
