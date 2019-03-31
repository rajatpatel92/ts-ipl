import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Match } from '../model/match.model'

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private firestore: AngularFirestore) { }

  getMatches () {
    return this.firestore.collection('matches').snapshotChanges();
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
