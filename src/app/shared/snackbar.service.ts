import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  /*constructor(private _snackBar: MatSnackBar) {

  }*/


  openSnackBar(message: string) {
    /*this._snackBar.open(message, "", {
      duration: 2000,
      panelClass: ['mat-snack-bar-normal']
    });*/
  }

  openSnackBarSucess(message: string) {
    /*this._snackBar.open(message, "", {
      duration: 2000,
      panelClass: ['mat-snack-bar-success']
    });*/
  }

  openSnackBarError(message: string) {
    /*this._snackBar.open(message, "", {
      duration: 3000,
      panelClass: ['mat-snack-bar-error']
    });*/
  }

}
