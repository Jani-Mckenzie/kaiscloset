import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { Items } from '../../../models/items'

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  item: any
  id?: any;

  constructor(private itemsService: ItemsService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.getItem();
  }

  getItem() {
    this.id = this.route.snapshot.params['id'];
    this.itemsService.getItemById(this.id).subscribe(data => {
      this.item = data.data!['item']
    })
    console.log(this.item)
  }


}
