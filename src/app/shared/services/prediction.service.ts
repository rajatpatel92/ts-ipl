import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Prediction } from '../model/prediction.model';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  constructor(private firestore: AngularFirestore) { }

  getPredictions(){
    return this.firestore.collection('predictions').snapshotChanges();
  }

  getUserPredictions(userId: string){
    return this.firestore.collection('predictions', ref => ref.where('user','==',userId)).snapshotChanges();
  }

  createPrediction(prediction: Prediction) {
    return this.firestore.collection('predictions').add(prediction);
  }

  updatePrediction(prediction: Prediction) {
    delete prediction.id;
    this.firestore.doc('predictions/' + prediction.id).update(prediction);
  }

  deletePrediction(predictionId: string) {
    this.firestore.doc('predictions/' + predictionId).delete();
  }
  
}
