import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';

import { compareValidator, strongPassword } from '../../../../common/validator/validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.pug',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private service: LoginService) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, compareValidator('email')]],
      password: ['', [
        Validators.required,
        strongPassword()
        ]
      ],
      confirmPassword: ['', [Validators.required, compareValidator('password')]]
    });
  }

  ngOnInit() { }

  public register(): void {
    // TODO: register the user and login
    if (this.registerForm.invalid) {
      return;
    }
  }

}
