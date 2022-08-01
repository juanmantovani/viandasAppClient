import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';


import { LoginI } from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';

import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loginForm: FormGroup;
  
  constructor(private router: Router, private loginService: LoginService) { 
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),      
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  
  }

  ngOnInit(): void {
  }

  onLogin(form: LoginI) {
    /*this.loginService.loginByEmail(form).subscribe((data) => {
      console.log(data);
      let dataRsponse: ResponseI = data;
      if (dataRsponse.status == null) {
        localStorage.setItem('token', dataRsponse.result);
        this.router.navigate(['dashboard']);
      }
    });*/
    console.log(form);
  }

}
