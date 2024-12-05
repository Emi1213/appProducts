import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { User } from '../models/user.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  getFirestore,
  setDoc,
  getDoc,
  doc,
  addDoc,
  collection,
  collectionData,
  query,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(AngularFireAuth);

  getAuth() {
    return getAuth();
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(
      this.getAuth(),
      user.email,
      user.password
    );
  }

  signUp(user: User) {
    return createUserWithEmailAndPassword(
      this.getAuth(),
      user.email,
      user.password
    );
  }

  updateUser(displayName:string){
    return updateProfile(getAuth().currentUser, {displayName});
  }


  sendResetPasswordEmail(email:string){
    return sendPasswordResetEmail(getAuth(), email);
  }

  //obtener docs

  getCollectionData(path:string, collectionQuery?:any){
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, ...collectionQuery), {idField: 'id'});

  }

  //setear documento

  setDocumet(path:string, data:any){
    return setDoc(doc(getFirestore(), path), data);
  }

  //actualizar documento
  updateDocument(path:string, data:any){
    return updateDoc(doc(getFirestore(), path), data);
  }

  //borrar documento
  deleteDocument(path:string){
    return deleteDoc(doc(getFirestore(), path));
  }

  async getDocumet(path:string){
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  addDocument(path:string, data:any){
    return addDoc(collection(getFirestore(), path), data);
  }

}
