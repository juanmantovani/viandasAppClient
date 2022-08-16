import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginRequest } from 'src/app/shared/dto/Login/LoginRequest';
import { LoginResponse } from 'src/app/shared/dto/Login/LoginResponse';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loginForm: FormGroup;
  
  constructor(private router: Router, private loginService: AuthService) { 
    
    //declaro el form del login
    this.loginForm = new FormGroup({
      email: new FormControl('test@viandasintegral.com', [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),      
      ]),
      password: new FormControl('123456789', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  
  }

  ngOnInit(): void {
    if (this.loginService.isAutenticated()) {
      this.router.navigate(['inicio']);
    }
  }

  //al hacer click en el boton login
  onLogin(request: LoginRequest) {
    this.loginService.loginByEmail(request).subscribe(() => {
        this.router.navigate(['administracion']);
      }
   );
  }

}
