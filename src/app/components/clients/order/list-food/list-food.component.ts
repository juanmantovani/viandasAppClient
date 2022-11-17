import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GetCategoryResponse } from 'src/app/shared/dto/category/GetCategoryResponse';
import { GetMenuResponse } from 'src/app/shared/dto/menu/GetMenuResponse';
import { Category } from 'src/app/shared/models/Category';
import { MenuViewer } from 'src/app/shared/models/MenuViewer';
import { TurnViewer } from 'src/app/shared/models/TurnViewer';
import { CategoryService } from 'src/app/shared/services/category.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { environment } from 'src/environments/environment';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GetMenuByCategoryResponse } from 'src/app/shared/dto/menu/GetMenuByCategoryResponse';
import { CategoryViewer } from 'src/app/shared/models/CategoryViewer';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.css']
})
export class ListFoodComponent implements OnInit {
  URLAPI = environment.urlApi;

  menuViewer : MenuViewer;
  turnViewer : TurnViewer;
  categories : Category[] = [];


  //chips autocomplete
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryCtrl = new FormControl('');
  filteredCategories: Observable<Category[]>;
  category : Category[] = [];

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;


  constructor(
    private menuService: MenuService,
    private categoryService: CategoryService
    ) 
    {

    }

  async ngOnInit() {
    await this.getCategories();
    this.searchFiltered();

  }

  async addMenuByCategory(category : Category){
    let inclu = this.category.includes(category);
    if (!inclu){
      this.category.push(category)
      await this.menuService.getMenuByCategory(category.id).subscribe((res: GetMenuByCategoryResponse) => {
        this.menuViewer = new MenuViewer (res.menuViewer);
        if (this.turnViewer == null){
          this.turnViewer = new TurnViewer(this.menuViewer.turnsViewer[0])
        } else {
        res != null ? this.turnViewer.categoryViewer.push(new CategoryViewer (res.menuViewer.turnsViewer[0].categoryViewer[0])) : null;
        }
      })
    }
  }

  async getCategories() {
    await this.categoryService.getCategories().subscribe((res: GetCategoryResponse) => {
      this.categories = res.categories;
      this.addMenuByCategory(this.categories[0]);

    })
  }

  //chips

  searchFiltered() {
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((cat : any) => {
        const name = typeof cat === 'string' ? cat : cat?.title;
        return name ? this._filter(name as string) : this.categories.slice();
      }
    ));
  }
  add(event: MatChipInputEvent): void {
    const value = new Category (event);

    // if (value) {
    //   this.category.push(value);
    // }

    // Clear the input value
    event.chipInput!.clear();
    this.categoryCtrl.setValue(null);
  }

  remove(category: Category): void {
    const indexCategory = this.category.indexOf(category);

    if (indexCategory >= 0) {
      this.category.splice(indexCategory, 1);
    }

    this.turnViewer.categoryViewer = this.turnViewer.categoryViewer.filter(categoryViewer => categoryViewer.category.id != category.id);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    //this.category.push(event.option.value);
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);

    this.addMenuByCategory(event.option.value)
  }

  private _filter(value: string): Category[] {
    const filterValue = value.toLowerCase();

    return this.categories.filter(cat => cat.title.toLowerCase().includes(filterValue));
  }
}
  //fin chips


