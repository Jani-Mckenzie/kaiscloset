import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { Items } from '../../models/items';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  items: Items[] = [];

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.itemsService.getAllItems().subscribe(results => {
      this.items = results.data!['items'];
    });

  }
}
