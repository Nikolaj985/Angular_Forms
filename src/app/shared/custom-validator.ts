import { HttpClient } from '@angular/common/http';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export const customValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  let arraySW: String[] = ['aaa', 'aaaaa'];
  return arraySW.some((word) => control.value === word)
    ? { customError: true }
    : null;
};

export const customTitleValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const name = control.get('postAuthor');
  const title = control.get('postTitle');

  if (title?.value.includes(name?.value)) {
    console.log(title?.value.includes(name?.value));
  }

  return title?.value.includes(name?.value) ? { titleError: true } : null;
};
export const customEmtyValueValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.trim() === '' ? { EmtyValueError: true } : null;
};

interface BackendResponse {
  valid: boolean;
}
export function asynchronousValidator(httpClient: HttpClient) {
  return (ctrl: AbstractControl): Observable<ValidationErrors | null> => {
    return httpClient
      .get<BackendResponse>(
        `https://empty-poetry-bf01.akademija.workers.dev/${ctrl.value}`
      )
      .pipe(
        map((_response) => null),
        catchError((er) => {
          console.log(er);
          return of({ asyncError: true });
        })
      );
  };
}
