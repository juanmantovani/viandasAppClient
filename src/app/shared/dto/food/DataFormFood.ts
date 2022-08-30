import { Category } from '../../models/Category';
import { Food } from '../../models/Food';

export class DataFormFood {

  food: Food = new Food(null);
  actionForm: string;
  listCategories : Category[];

}