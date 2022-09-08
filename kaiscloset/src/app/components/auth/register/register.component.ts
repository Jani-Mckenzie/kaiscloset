import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../../models/user'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: any;
  User: any = [];
  errors: any = [];
  showModal!: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) {

    this.userForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      role: ('user')
    })
  }


  ngOnInit(): void {

  }


  show() {
    this.router.navigateByUrl('home')
  }


  register() {

    this.authService.register(this.userForm.value).subscribe((data) => {
      this.User = data
      console.log(this.userForm.value, data)
      this.router.navigateByUrl('auth/login')
    })
  }
}

