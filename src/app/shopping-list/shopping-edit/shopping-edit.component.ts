import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  editMode =false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
    .subscribe(
      (index:number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.form.setValue({
          nameInput: this.editedItem.name,
          amountInput: this.editedItem.amount
        })
      }
    );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.nameInput, value.amountInput);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  clearForm(){
    this.form.reset();
    this.editMode = false;
  }

  delete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.clearForm();
  }

 ngOnDestroy(){
   this.subscription.unsubscribe();
 }

}
