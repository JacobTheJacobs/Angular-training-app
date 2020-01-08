import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.module';
import { NgForm } from '@angular/forms';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable ,Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exerciseSubscription: Subscription;
  exercises: Exercise[];

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.exerciseSubscription=this.trainingService.exercisesChanged.subscribe(exercises => (this.exercises = exercises),
    error => {
      //console.log(error);
    });
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
    // pass the id of the exercise
  }
}
