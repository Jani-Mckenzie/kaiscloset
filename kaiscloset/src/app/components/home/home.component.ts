import * as AOS from "aos";
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  providers: [HeaderComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notify!: string;
  constructor(private header: HeaderComponent, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    AOS.init();
    this.route.queryParams.subscribe((params) => {
      const key1 = 'loggedin';
      if (params[key1] === 'success') {
        this.notify = 'You have been successfully loggedin. Welcome home';
      }
    });

  }



}
