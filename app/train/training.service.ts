import { Exercise } from './exercise.module';
import { Subject } from 'rxjs/subject';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';


@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>(); // for suscribe on change
  availableExercises: Exercise[] = [];
  finishedExercisesChanged = new Subject<Exercise[]>();
  private runningExercises: Exercise;
  exercisesChanged = new Subject<Exercise[]>();
  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            {
              const data = doc.payload.doc.data() as Exercise;
              const id = doc.payload.doc.id;
              return { id, ...data };
            }
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        console.log(exercises);
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      },error => { ///perfect crime lol
        //console.log(error);
      });
  }

  startExercise(selectedId: string) {
    this.runningExercises = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercises });
  }

  getRunningExercises() {
    return { ...this.runningExercises }; // return copy of obj
  }

  completExercise() {
    this.addDataToDataBase({
      ...this.runningExercises,
      date: new Date(),
      state: 'completed'
    }); // pushing the obj with custom added properties
    this.runningExercises = null;
    this.exerciseChanged.next(null);
  }

  cancelExrcise(progress: number) {
    this.addDataToDataBase({
      ...this.runningExercises,
      duration: this.runningExercises.duration * (progress / 100),
      calories: this.runningExercises.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercises = null;
    this.exerciseChanged.next(null);
  }

  getCompletedorCanceledExercies() {
   this.db.collection("finnishedExercises").valueChanges().subscribe((exercises: Exercise[]) => {
     this.finishedExercisesChanged.next(exercises);
   },error => {
    //console.log(error);
  });
  }


  addDataToDataBase(exercise: Exercise) {
    this.db.collection('finnishedExercises').add(exercise);

  }
}
