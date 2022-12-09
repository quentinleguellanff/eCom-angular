import { Component } from '@angular/core';

@Component({
  selector: 'app-myshop',
  templateUrl: './myshop.component.html',
  styleUrls: [
    './myshop.component.css'
  ]
})
export class MyshopComponent {

  title = 'Welcome to my shop!';
  overValue = false;

  buttonOvered(overValue: boolean) {
    this.overValue = overValue
    this.title = overValue ? 'Lot of surprises are waiting for you' : 'Welcome to my shop!';
  }
}
