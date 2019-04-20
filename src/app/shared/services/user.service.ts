import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/user.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getUsers(){
    return this.firestore.collection('users').snapshotChanges();
  }

  getUser(id: string) {
    return this.firestore.doc('users/'+ id).get();
  }

  getLeaderboard(){
    return this.firestore.collection('users', ref => ref.orderBy('points', 'desc')).snapshotChanges();
  }

  createUser(user: User) {
    return this.firestore.collection('users').add(user);
  }

  updateUser(user: User) {
    this.firestore.doc('users/' + user.uid).update(user);
  }

  updateUserPoints(uid: string, uPoints: number) {
    let userRef = this.firestore.doc('users/' + uid);
    return userRef.update({
      points: firebase.firestore.FieldValue.increment(uPoints)
    }).then(
      () => console.log("User updated successfully"))
    .catch(
      (ex) => console.log("User not updated with exception: "+ex));
  }

  deleteUser(userId: string) {
    this.firestore.doc('users/' + userId).delete();
  }
}
