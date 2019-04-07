import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Prediction } from '../model/prediction.model';
import * as moment from 'moment';

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

  //TODO
  getUserTodayPredictions(userId: string, date: Date) {
    return this.firestore.collection('predictions', ref => 
      ref.where('user','==',userId)
        .where('date','==',moment(date).startOf('day').format('YYYY-MM-DDTHH:mm:ss.sss') + 'Z')).snapshotChanges();
  }

  getPredictionsByMatch(matchId: number) {
    return this.firestore.collection('predictions', ref => ref.where('match_id', "==", matchId)).snapshotChanges();
  }

  createPrediction(prediction: Prediction) {
    return this.firestore.collection('predictions').add(prediction);
  }

  updatePrediction(prediction: Prediction) {
    var predId = prediction.id;
    delete prediction.id;
    this.firestore.doc('predictions/' + predId).update(prediction);
  }

  deletePrediction(predictionId: string) {
    this.firestore.doc('predictions/' + predictionId).delete();
  }
  
}
