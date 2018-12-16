import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAuthenticationDetailsData } from 'amazon-cognito-identity-js';

import { MatchValidator } from 'src/common/validator/match-validator';
import { StrongPasswordValidator } from 'src/common/validator/strong-password-validator';
import { AccountService } from '../account.service';
import { PrivacyPolicy } from '../model/privacy-policy';
import { UserInfo } from '../model/user-info';
import { PrivacyComponent } from '../privacy/privacy.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.pug',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {

  public error: string = null;
  public privacyPolicy: PrivacyPolicy;
  public registerForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private service: AccountService,
      private modalService: NgbModal) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, new MatchValidator('email')]],
      password: ['', [new StrongPasswordValidator()]],
      confirmPassword: ['', [Validators.required, new MatchValidator('password')]],
      privacyAgree: [true, Validators.requiredTrue],
      subscribeAgree: [true]
    });
  }

  public getPrivacyPolicy() {
    this.service.getPrivacyPolicy().subscribe(
      (policy: PrivacyPolicy) => {
        this.privacyPolicy = policy;
        console.log(policy);
      },
      (error: Error): void => {
        this.error = error.message;
      }
    );
  }

  public ngOnInit(): void {
    this.getPrivacyPolicy();
  }

  public openPrivacyModal() {
    const modalRef = this.modalService.open(PrivacyComponent);
    modalRef.componentInstance.privacyPolicy = this.privacyPolicy;
  }

  public register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const credentials: IAuthenticationDetailsData = {
      Username: this.registerForm.get('email').value,
      Password: this.registerForm.get('password').value,
    };

    const userInfo: UserInfo = new UserInfo({
        name: `${this.registerForm.get('firstName').value} ${this.registerForm.get('lastName').value}`  ,
        email: this.registerForm.get('email').value,
        privacyAgreement: this.privacyPolicy.getVersionString()
    });

    if (this.registerForm.get('subscribeAgree').value) {
      // TODO: implement subscribe
    }

    this.service.register(credentials, userInfo).subscribe(
      (): void => { this.router.navigate(['/account/confirm']); },
      (error: Error): void => {
        this.error = error.message;
      }
    );
  }
}
