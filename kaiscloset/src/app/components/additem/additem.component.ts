import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Items } from '../../models/items'


@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {
  itemForm: any;
  items: Items[] = [];

  itemId?: string;
  action: 'add' | 'edit' = 'add';
  get isEditing(): boolean {
    return this.action === 'edit';
  }
  constructor(private itemsService: ItemsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllItems();
  }


  initForm(): void {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      url: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  getAllItems() {
    this.itemsService.getAllItems().subscribe(data => {
      this.items = data.data!['items'];
    })
  }

  toggleEditForm(itemId: string) {
    this.itemId = itemId;

    this.itemsService.getItemById(this.itemId).subscribe((res) => {
      if (res.status === 'success') {
        this.itemForm.patchValue(res.data!['item']);
        // this.itemForm.get('password')?.disable();
        this.action = 'edit';
      }
    });
  }
  resetForm(): void {
    this.action = 'add';
    this.itemId = undefined;
    this.itemForm.reset();
  }

  createItem(): void {
    this.itemsService.createItem(this.itemForm.value).subscribe((res) => {
      if (res.status === 'success') {
        this.resetForm();
        this.getAllItems();
      }
    })
  }

  updateItem(): void {
    this.itemsService.updateItem(this.itemId!, this.itemForm.value).subscribe((res) => {
      if (res.status === 'success') {
        this.getAllItems();
        this.resetForm();
      }
    })
  }

  deleteItem(id: string) {
    if (window.confirm(`Are you sure you want to delete?`)) {
      this.itemsService.deleteItem(id).subscribe((res) => {
        if (res === null) {
          this.getAllItems();
          this.resetForm();
        }
      })
    }

  }
}
