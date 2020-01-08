import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';

import { StopDialogComponent } from './stopDialog.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer: any; // for canceling

  constructor(
    private dialog: MatDialog,
    private trainingServie: TrainingService
  ) {}

  ngOnInit() {
    this.resumeTimer();
  }

  resumeTimer() {
    const step = this.trainingServie.getRunningExercises().duration / 100 * 1000; // getting the duration of steps divide by 100%
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingServie.completExercise();
        clearInterval(this.timer); // clearInterval
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogResponse = this.dialog.open(StopDialogComponent, {
      // passing progress form stop dialog component
      data: { progress: this.progress }
    });

    dialogResponse.afterClosed().subscribe(
      // getting the response back from user
      result => {
        if (result) {
          this.trainingServie.cancelExrcise(this.progress); // emiting it training html
        } else {
          this.resumeTimer();
        }
      }
    );
  }
}
