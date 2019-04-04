import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Match } from '../model/match.model'
import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private firestore: AngularFirestore) { }

  getMatches () {
    return this.firestore.collection('matches').snapshotChanges().pipe(
      map(matches => matches.map(match => {
        const data = match.payload.doc.data() as Match;
        const id = match.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  getMatchesByDate (date: Date) {
    var enteredDate = moment(date).startOf('day');
    return this.firestore.collection('matches', ref => ref.where('date', '==', enteredDate)).snapshotChanges().pipe(
      map(matches => matches.map(match => {
        const data = match.payload.doc.data() as Match;
        const id = match.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  getTodayMatches () {
    debugger;
    var todayDate = moment().startOf('day');
    return this.firestore.collection('matches', ref => ref.where('date', '==', todayDate.toISOString())).snapshotChanges().pipe(
      map(matches => matches.map(match => {
        const data = match.payload.doc.data() as Match;
        const id = match.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  createMatch(match: Match){
    return this.firestore.collection('matches').add(match);
  }

  updateMatch(match: Match){
    delete match.unique_id;
    this.firestore.doc('matches/' + match.unique_id).update(match);
  }

  deleteMatch(matchId: string) {
    this.firestore.doc('matches/' + matchId).delete();
  }
  
}
