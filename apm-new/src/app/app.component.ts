import { Component } from '@angular/core';

//this is Metadata to add by decorator
//To know by Prefixed with an @
@Component({
  selector: 'pm-root', //this (pm-root) is directive name
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
}) //why here don't have semicolon (there is no semicolon here)
export class AppComponent {
  title = 'Hello world';
}

