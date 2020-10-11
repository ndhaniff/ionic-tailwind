import { StorageService } from './storage.service'
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore'
import { User } from './../interfaces/user'
import { Injectable, NgZone } from '@angular/core'
import { AngularFireAuth } from "@angular/fire/auth"
import { Router } from "@angular/router"

import { Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { UtilService } from './util.service'
import * as moment from 'moment'

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    public user$: Observable<User>

    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router, // Inject Route Service
        public ngZone: NgZone, // NgZone service to remove outside scope warning
        private storage: StorageService,
        private util: UtilService
    ) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
                } else {
                    return of(null)
                }
            })
        )
    }

    // Sign up with email/password
    SignUp(email, password, extra) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                this.util.presentToast('Signing up...', {
                    position: 'top',
                    color: 'success'
                }).then(async _ => {
                    this.SignIn(email, password)
                })
                return this.SetUserData(result.user, extra)
            }).catch((error) => {
                this.util.presentToast(error.message, {
                    position: 'top'
                })
            })
    }

    getSeller(uid) {
        const sellerRef: AngularFirestoreDocument<User> = this.afs.doc(`sellers/${uid}`)
        return sellerRef.valueChanges()
    }

    SetUserData(user, extra) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`)
        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.name,
            ...extra,
            created_at: moment().format('DD/MM/YYYY')
        }
        return userRef.set(userData, { merge: true })
    }


    // Sign in with email/password
    SignIn(email, password) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.util.presentToast('logging in...', {
                    position: 'top',
                    color: 'success'
                }).then(async _ => {
                    localStorage['isLoggedin'] = true
                    await this.util.delay()
                    this.router.navigate(['/tabs/more'])
                    this.util.presentToast(`Welcome back! `, {
                        position: 'top',
                        color: 'success'
                    })
                })
                this.UpdateUserData(result.user)
            }).catch((error) => {
                let errorMsg = {
                    'auth/user-not-found': 'User does not exist on our database!',
                    'auth/wrong-password': 'Invalid password!',
                }
                console.log(error)
                this.util.presentToast(errorMsg[error.code] ?? 'Server error', {
                    position: 'top',
                    color: 'danger'
                })
            })
    }

    UpdateUserData(user) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`)
        const userData = {
            uid: user.uid,
            email: user.email
        }
        return userRef.set(userData, { merge: true })
    }

    UpdateUserDataById(uid, data) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`)
        return userRef.set(data, { merge: true })
    }

    // Sign out
    SignOut() {
        return this.afAuth.signOut().then(async () => {
            localStorage['isLoggedin'] = false
            localStorage.removeItem('user')
            localStorage.removeItem('seller')
            this.util.presentToast('sign out successfully', {
                position: 'top',
                color: 'danger'
            })
            this.router.navigate(['/tabs/more'])
        })
    }
}