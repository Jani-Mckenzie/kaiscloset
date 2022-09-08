import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  userForm: any;
  notify!: string;
  errors: any = [];
  showModal!: boolean;
  user!: any;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      role: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  createUser(): void {
    this.errors = [];
    this.userService.createUser(this.userForm.value).subscribe();

  }


  isValidInput(fieldName: any): boolean {
    return this.userForm.controls[fieldName].invalid &&
      (this.userForm.controls[fieldName].dirty || this.userForm.controls[fieldName].touched);
  }
}