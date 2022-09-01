import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginRequest } from 'src/app/shared/dto/Login/LoginRequest';
import  * as ROUTES  from '../../shared/routes/index.routes'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loginForm: FormGroup;
  REGISTER = ROUTES.INTERNAL_ROUTES.REGISTER;

  
  constructor(private router: Router, private loginService: AuthService) { 
    
    //declaro el form del login
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  
  }

  ngOnInit(): void {

  }

  //al hacer click en el boton login
  onLogin(request: LoginRequest) {
    this.loginService.loginByEmail(request).subscribe(() => {
        this.router.navigate([ROUTES.INTERNAL_ROUTES.ADMINISTRATION]);
      }
   );
  }

}
