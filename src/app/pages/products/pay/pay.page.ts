import { NavController } from '@ionic/angular'
import { ActivatedRoute } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore'
import { UtilService } from './../../../services/util.service'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-pay',
    templateUrl: './pay.page.html',
    styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
    bankname = ''
    bankref = ''
    orderId = ''
    loading = false
    user

    constructor(
        private utils: UtilService,
        private afs: AngularFirestore,
        private router: ActivatedRoute,
        private navCtrl: NavController
    ) { }

    ngOnInit() {
        this.orderId = this.router.snapshot.params.id
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
            this.loading = false
            this.navCtrl.navigateForward('/tabs/more')
            this.afs.doc('orders/' + this.orderId).set({
                status: 'paid', payment: {
                    bankname: this.bankname,
                    bankref: this.bankref
                }
            }, { merge: true })
        }
    }

}
