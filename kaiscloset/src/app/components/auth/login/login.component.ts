import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../../models/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: any;
  notify!: string;
  errors: any = [];
  showModal!: boolean;
  user!: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      const key1 = 'registered';
      const key2 = 'loggedOut';
      if (params[key1] === 'success') {
        this.notify = 'You have been successfully registered. Please Log in';
      }
      if (params[key2] === 'success') {
        this.notify = 'You have been loggedout successfully';
      }
    });
  }

  show() {
    this.router.navigateByUrl('home')
  }

  loginUser(): void {
    this.errors = [];
    this.authService.login(this.userForm.value)
      .subscribe((data) => {
        this.user = data.data.user;
        localStorage.setItem('role', this.user.role);
        this.authService.updateMenu.next();
        this.router.navigate(['/home'], { queryParams: { loggedin: 'success' } });
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
  }
  initForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    });
  }

  isValidInput(fieldName: any): boolean {
    return this.userForm.controls[fieldName].invalid &&
      (this.userForm.controls[fieldName].dirty || this.userForm.controls[fieldName].touched);
  }



}
