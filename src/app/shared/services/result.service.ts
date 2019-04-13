import { Injectable } from '@angular/core';
import { Result } from 'src/app/shared/model/result.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private firestore: AngularFirestore) { }

  getResults(){
    return this.firestore.collection('results').snapshotChanges().pipe(
      map(results => results.map(result => {
        return {
          id: result.payload.doc.id,
          ...result.payload.doc.data()
        } as Result;
      }))
    );
  }

  getResultOfMatch(matchId: number) {
    return this.firestore.collection('results', ref => ref.where("match_id", "==", matchId)).snapshotChanges().pipe(
      map(results => results.map(result => {
        return {
          id: result.payload.doc.id,
          ...result.payload.doc.data()
        } as Result;
      }))
    );
  }

  createResult(result: Result){
    return this.firestore.collection('matches').add(result);
  }

  updateResult(result: Result){
    var id: string = result.id;
    delete result.id;
    this.firestore.doc('matches/' + id).update(result);
  }

  deleteResult(resultId: string) {
    this.firestore.doc('matches/' + resultId).delete();
  }
  
}
