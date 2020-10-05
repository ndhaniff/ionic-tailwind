import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore'
import { User } from './../interfaces/user'
import { Injectable, NgZone } from '@angular/core'
import { AngularFireAuth } from "@angular/fire/auth"
import { Router } from "@angular/router"

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router, // Inject Route Service
        public ngZone: NgZone // NgZone service to remove outside scope warning
    ) {

    }

    // Sign up with email/password
    SignUp(email, password) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {

            }).catch((error) => {
                window.alert(error.message)
            })
    }


    // Sign in with email/password
    SignIn(email, password) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate([''])
                })
                this.SetUserData(result.user)
            }).catch((error) => {
                window.alert(error.message)
            })
    }

    /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    SetUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`)
        // const userData: User = {
        //     //
        // }
        // return userRef.set(userData, {
        //     merge: true
        // })
    }

    // Sign out
    SignOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user')
            this.router.navigate(['sign-in'])
        })
    }
}