import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user'

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  userForm: any;
  users: User[] = [];


  action: 'add' | 'edit' = 'add';
  userId?: string;
  get isEditing(): boolean {
    return this.action === 'edit';
  }

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllUsers();

  }
  initForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z]')]],
      role: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  toggleEditForm(userId: string) {
    this.userId = userId;

    this.userService.getUserById(this.userId).subscribe((res) => {
      if (res.status === 'success') {
        this.userForm.patchValue(res.data!['user']);
        this.userForm.get('password')?.disable();
        this.action = 'edit';
      }
    });
  }

  resetForm(): void {
    this.action = 'add';
    this.userId = undefined;
    this.userForm.reset();
    this.userForm.get('password')?.enable();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(results => {
      this.users = results.data!['users']
    })
  }

  createUser(): void {

    this.userService.createUser(this.userForm.value).subscribe((res) => {
      if (res.status === 'success') {
        this.resetForm();
        this.getAllUsers();
      }
    });

  }

  updateUser(): void {
    this.userService.updateUser(this.userId!, this.userForm.value).subscribe((res) => {
      if (res.status === 'success') {
        this.getAllUsers();
        this.resetForm();
      }
    });
  }

  isValidInput(fieldName: any): boolean {
    return this.userForm.controls[fieldName].invalid &&
      (this.userForm.controls[fieldName].dirty || this.userForm.controls[fieldName].touched);
  }

  deleteUser(id: string) {
    if (window.confirm(`Are you sure you want to delete?`)) {
      this.userService.deleteUser(id).subscribe((res) => {
        if (res === null) {
          this.getAllUsers();
          this.resetForm();
        }
      });
    }
  }
}