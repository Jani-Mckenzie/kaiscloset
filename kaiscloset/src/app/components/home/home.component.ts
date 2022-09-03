import { Component, OnInit } from '@angular/core';
import * as AOS from "aos";
// declare let AOS: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }



}