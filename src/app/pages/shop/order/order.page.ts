import { NavController } from '@ionic/angular'
import { ActivatedRoute } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore'
import { UtilService } from './../../../services/util.service'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-order',
    templateUrl: './order.page.html',
    styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
    bankname = ''
    bankref = ''
    cartId = ''
    loading = false
    user

    constructor(
        private utils: UtilService,
        private afs: AngularFirestore,
        private router: ActivatedRoute,
        private navCtrl: NavController
    ) { }

    ngOnInit() {
        this.cartId = this.router.snapshot.params.id
        this.user = JSON.parse(localStorage['user'])
    }

    submit() {
        this.loading = true
        if (this.bankname == '' || this.bankref === '') {
            this.loading = false
            this.utils.presentToast('Please fill in all input above', {
                position: 'bottom',
                color: 'danger'
            })
        } else {
            console.log(this.user)
            this.afs.collection('orders', ref => ref.where('user_id', '==', this.user.uid))
                .get()
                .toPromise()
                .then(query => {
                    query.forEach(doc => {
                        doc.ref.update({
                            status: 'paid', payment: {
                                bankname: this.bankname,
                                bankref: this.bankref
                            }
                        })
                    })
                    this.afs.collection('carts', ref => ref.where('user_id', '==', this.user.uid))
                        .get().toPromise().then(q => q.forEach(doc => {
                            doc.ref.delete()
                        }))
                    this.loading = false
                    this.navCtrl.navigateForward('/thankyou')
                })
        }
    }

}
