import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { Items } from '../../models/items';
import { ActivatedRoute, Router } from '@angular/router';
import * as AOS from "aos";


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  items: Items[] = [];

  filterType?: string;
  get filteredList(): Items[] {
    switch (this.filterType) {
      case 'boy':
      case 'girl':
      case 'women':
      case 'men':
        return this.items.filter(item => item.type?.toLowerCase() === this.filterType);
      default:
        return this.items;
    };
  }

  constructor(private itemsService: ItemsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    AOS.init();
    this.filterType = this.route.snapshot.queryParams['type'];
    this.getItems();

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }

  getItems() {
    this.itemsService.getAllItems().subscribe(results => {
      this.items = results.data!['items'];
    });
  }
}
