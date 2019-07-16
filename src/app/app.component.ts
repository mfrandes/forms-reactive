import { Component, OnInit } from '@angular/core';

import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
   this.signuoForm = new FormGroup({
     'username': new FormControl(null),
     'email': new FormControl(null),
     'gender': new FormControl('male')
   })
  }
  genders = ['male', 'female'];
  signuoForm: FormGroup;
}
