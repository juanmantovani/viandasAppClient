import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
import { LoginRequest } from 'src/app/shared/dto/Login/LoginRequest';
import { LoginResponse } from 'src/app/shared/dto/Login/LoginResponse';


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

  onLogin(request: LoginRequest) {
    this.loginService.loginByEmail(request).subscribe((data) => {
      let dataRsponse: LoginResponse = data;
      if (dataRsponse.status == null) {
        localStorage.setItem('token', dataRsponse.token);
        this.router.navigate(['administracion']);
      }
    }, err => {
      console.log(err.error);
    });
    //console.log(request);
  }

}
