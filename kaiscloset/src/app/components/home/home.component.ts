import * as AOS from "aos";
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user";

@Component({
  providers: [HeaderComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notify!: string;
  loggedInUser?: User;
  constructor(private header: HeaderComponent, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    AOS.init();
    this.authService.loggedInUser$.subscribe(res => {
      this.loggedInUser = res;
    });

    this.authService.autoLogin();

  }



}
