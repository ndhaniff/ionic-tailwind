import { AngularFirestore } from '@angular/fire/firestore'
import { UtilService } from './../../../services/util.service'
import { NavController } from '@ionic/angular'
import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { parse } from 'path'

@Component({
    selector: 'app-review',
    templateUrl: './review.page.html',
    styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
    rate = 5
    message = ""
    allreviewsByThisUser

    constructor(
        private router: ActivatedRoute,
        private navCtrl: NavController,
        private util: UtilService,
        private afs: AngularFirestore
    ) { }

    ngOnInit() {
        this.afs.collection('reviews')
            .ref.where('userId', '==', JSON.parse(localStorage['user']).uid)
            .where('productId', '==', this.router.snapshot.params.id)
            .get()
            .then(q => {
                this.allreviewsByThisUser = q.docs.map(val => val.data())
            })
    }

    onRatingChange(ev) {
        this.rate = ev
    }

    calculateRate() {
        if (this.allreviewsByThisUser && this.allreviewsByThisUser.length > 0) {
            let prevRate = this.allreviewsByThisUser.map(r => parseInt(r.rate))
            let sumPrevRate = prevRate.reduce((acc, cur) => acc + cur, 0)
            let rate = (this.rate + sumPrevRate) / prevRate.length + 1
            return rate.toFixed(2)
        } else {
            return this.rate
        }
    }

    submit() {
        let productId = this.router.snapshot.params.id
        let reviewRef = this.afs.collection('reviews')
        let orderRef = this.afs.doc('orders/' + this.router.snapshot.queryParams.orderId)
        let productRef = this.afs.doc('products/' + productId)

        if (this.message == '') {
            this.util.presentToast('Please say something', {
                position: 'top',
                color: 'warning'
            })
        } else {
            reviewRef.add({
                message: this.message,
                productId: productId,
                rate: this.rate,
                time: new Date(),
                userId: JSON.parse(localStorage['user']).uid
            }).then(_ => {
                productRef.set({ review_rate: this.calculateRate() }, { merge: true })
                orderRef.set({ status: 'done' }, { merge: true })
                this.util.presentToast('Thank you for your feedback!', {
                    position: 'top',
                    color: 'success'
                }).then(_ => {
                    this.navCtrl.navigateRoot('/tabs/more')
                })
            })
        }
    }
}
