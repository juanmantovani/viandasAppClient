import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/shared/dto/register/RegisterRequest';
import { RegisterResponse } from 'src/app/shared/dto/register/RegisterResponse';
import { User } from 'src/app/shared/models/User';
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

  registerForm: FormGroup;

  viewSuccessRegister: boolean;
  viewRegisterForm: boolean; 
  viewErrorRegister: boolean;

  errorPostSubmit: String;

  

  constructor(private registerService: RegisterService, private router: Router) {

    this.registerForm = this.generateForm();
    this.viewRegisterForm = true;   
    this.viewSuccessRegister = false;
    this.viewErrorRegister = false;
  

  }
  
  
  ngOnInit(): void  
  {
    
  }

generateForm(): FormGroup {
  return this.registerForm = new FormGroup(
    {
  name: new FormControl ('', [Validators.required, Validators.pattern(/[a-zA-Z ]$/)]),
  lastName: new FormControl ('', [Validators.required, Validators.pattern(/[a-zA-Z ]$/)]),
  email: new FormControl ('', [Validators.required, Validators.email]),
  password: new FormControl ('', [Validators.required, Validators.minLength(6)]),//hay que agregar un pattern para filtrar la password
  passwordConfirm: new FormControl ('', [Validators.required, Validators.minLength(6)])
  });
}

onRegister() {
  const registerRequest: RegisterRequest = {
    user: this.registerForm.getRawValue()
  }
  this.registerService.registerByEmail(registerRequest).subscribe(() => 
  {
    this.viewRegisterForm = false;
    this.viewSuccessRegister = true;
    setTimeout(() => {
     this.router.navigate([ROUTES.INTERNAL_ROUTES.ADMINISTRATION])
      }, 5000);
  });

}

onPasswordInput() {
  if (this.registerForm.get('password')?.value !== this.registerForm.get('passwordConfirm')?.value)
    this.registerForm.get('passwordConfirm')?.setErrors({ passwordMismatch: true });
  else this.registerForm.get('passwordConfirm')?.setErrors(null);
  
}

passwordMatchValidator(formControl: any){
  if (formControl.get('password')?.value === formControl.get('passwordConfirm')?.value)
     return null;
   else return { passwordMismatch: true };

}

}
