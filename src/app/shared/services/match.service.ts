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
        return {
          id: match.payload.doc.id,
          ...match.payload.doc.data()
        } as Match;
      }))
    );
  }

  getMatchesByDate (date: Date) {
    var enteredDate = moment(date).startOf('day');
    return this.firestore.collection('matches', ref => ref.where('date', '==', enteredDate)).snapshotChanges().pipe(
      map(matches => matches.map(match => {
        return {
          id: match.payload.doc.id,
          ...match.payload.doc.data()
        } as Match;
      }))
    );
  }

  getTodayMatches () {
    var todayDate = moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss.sss') + 'Z';
    return this.firestore.collection('matches', ref => ref.where('date', '==', todayDate)).snapshotChanges().pipe(
      map(matches => matches.map(match => {
        return {
          id: match.payload.doc.id,
          ...match.payload.doc.data()
        } as Match;
      }))
    );
  }

  getYesterdayMatches() {
    var yesterdayDate = moment().subtract(1, 'days').startOf('day').format('YYYY-MM-DDTHH:mm:ss.sss') + 'Z';
    return this.firestore.collection('matches', ref => ref.where('date', '==', yesterdayDate)).snapshotChanges().pipe(
      map(matches => matches.map(match => {
        return {
          id: match.payload.doc.id,
          ...match.payload.doc.data()
        } as Match;
      }))
    );
  }

  getMatchesById(id: number) {
    debugger;
    return this.firestore.collection('matches', ref => ref.where('unique_id', '==', id)).snapshotChanges().pipe(
      map(matches => matches.map(match => {
        return {
          id: match.payload.doc.id,
          ...match.payload.doc.data()
        } as Match;
      }))
    );
  }

  createMatch(match: Match){
    return this.firestore.collection('matches').add(match);
  }

  updateMatch(match: Match){
    var id: string = match.id;
    delete match.id;
    this.firestore.doc('matches/' + id).update(match);
  }

  deleteMatch(matchId: string) {
    this.firestore.doc('matches/' + matchId).delete();
  }
  
}
