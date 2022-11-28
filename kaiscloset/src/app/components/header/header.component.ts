import * as AOS from "aos";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "src/app/services/user.service";
import { User } from '../../models/user'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  displayadduser = false;
  displayadditem = false;
  currentRole: any;
  currentUser: any;
  user: User[] = [];
  loggedInUser?: User;
  constructor(public authService: AuthService, private router: Router, private route: ActivatedRoute, private userService: UserService) {

  }



  ngOnInit(): void {
    this.getCurrentUser();
    this.addUserDisplay((localStorage.getItem('role')));

    this.authService.loggedInUser$.subscribe(res => {
      this.loggedInUser = res;
      this.addUserDisplay(localStorage.getItem('role'));
    });

    this.authService.autoLogin();
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login'], { queryParams: { loggedOut: 'success' } });
  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem('auth_meta')
    this.currentUser = JSON.parse(this.currentUser)
    const id = this.currentUser.id;
    console.log(id);
    this.userService.getUserById(this.currentUser.id).subscribe(data => {
      this.currentUser = data.data!['user'];
      console.log(this.currentUser, 'worked again')
      this.addUserDisplay(this.currentUser.role)
    })
  }

  addUserDisplay(role: any) {
    this.displayadditem = role == 'admin'
    this.displayadduser = role == 'admin'
  }

  cart() {
    window.alert('Coming Soon')
  }

}
