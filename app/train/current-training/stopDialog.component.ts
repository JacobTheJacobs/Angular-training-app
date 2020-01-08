import { Component, Inject } from '@angular/core';

import {MAT_DIALOG_DATA} from '@angular/material'; // const to store the progress number

@Component({
  selector: 'app-stop-training',
  // tslint:disable-next-line: max-line-length
  template: `<h1 mat-dialog-title>Are you Sure?</h1>
  <mat-dialog-content>
<p>You want to quit on {{ passedData.progress }}%  </p>
  </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>`
})
export class StopDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) private passedData: any) {}// enjecting the data from the current training component
}
