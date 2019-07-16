import { Component, OnInit } from '@angular/core';

import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbidenUsernames = ['Chriss', 'Anna']

  
  ngOnInit(): void {
   this.signupForm = new FormGroup({
     'userData': new FormGroup({
      'username': new FormControl(null, [Validators.required, this.forbidenNames.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbidenEmail)
     }),
     'gender': new FormControl('male'),
     'hobbies': new FormArray([])
   })
   /*
   this.signupForm.valueChanges.subscribe(
     (value) => {
      console.log(value);
      
     }
   )
*/
this.signupForm.statusChanges.subscribe(
  (status) => {
   console.log(status);
   
  }
)
  }
  onSubmit(){
    console.log(this.signupForm);
    
  }
  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control)
  }
  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }
  forbidenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbidenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForbiden': true}
    }
    return null;
  }
  forbidenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, regect)=>{
      setTimeout(() => {
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbiden': true});
        } else {
          resolve (null);
        }
      }, 1500)
    })
    return promise;
  }
}
