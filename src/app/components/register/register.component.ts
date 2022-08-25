import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/shared/dto/Register/RegisterRequest';
import { RegisterService } from 'src/app/shared/services/register.service';
import  * as ROUTES  from '../../shared/routes/index.routes'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  LOGIN = ROUTES.INTERNAL_ROUTES.LOGIN;
  INICIO = ROUTES.INTERNAL_ROUTES.INICIO;

  loginForm: FormGroup;

  constructor( private router: Router, private registerService: RegisterService ) {

  this.loginForm = new FormGroup({
    nombre: new FormControl(
      '', 
      [Validators.required,
      Validators.pattern(/[a-zA-Z ]{2,254}/)]
      ),
    apellido: new FormControl('', 
    [Validators.required,
    Validators.pattern(/[a-zA-Z ]{2,254}/)]
    ),
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

  onLogin(request: RegisterRequest) {
  //   this.registerService.loginByEmail(request).subscribe(() => {
  //       this.router.navigate([ROUTES.INTERNAL_ROUTES.ADMINISTRATION]);
  //     }
  //  );
  }
}
