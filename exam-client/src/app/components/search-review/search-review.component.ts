import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-search-review',
  templateUrl: './search-review.component.html',
  styleUrls: ['./search-review.component.css'],
})
export class SearchReviewComponent {

  // Controls the search input box
  query = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    noBlankSpaces
  ]);

  // To help display error message
  checkSpaces(){
    return this.query.hasError('noBlankSpaces');
  }
}

// Custom validation to check for trailing and leading white spaces
export const noBlankSpaces = (ctrl: AbstractControl) => {
  const input = ctrl.value as string;
  if (input.trim() === input) return null;

  return { noBlankSpaces: true } as ValidationErrors;
};
