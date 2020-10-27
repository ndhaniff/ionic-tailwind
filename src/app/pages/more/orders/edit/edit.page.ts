import { NavController } from '@ionic/angular'
import { UtilService } from './../../../../services/util.service'
import { tap } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
    order
    ordersSubscription$
    status
    loading = false
    username

    constructor(
        private afs: AngularFirestore,
        private router: ActivatedRoute,
        private util: UtilService,
        private navCtrl: NavController
    ) { }

    ngOnInit() {
    }

    ionViewDidEnter() {
        console.log(this.router.snapshot.params.id)
        this.ordersSubscription$ = this.afs.doc('orders/' + this.router.snapshot.params.id)
            .valueChanges()

        this.ordersSubscription$.subscribe(data => {
            this.order = data
            this.status = this.order.status
            this.afs.doc('users/' + this.order.user_id)
                .valueChanges()
                .subscribe((data: any) => this.username = data.name)
        })
    }

    async save() {
        this.loading = true
        await this.afs.doc('orders/' + this.router.snapshot.params.id)
            .ref
            .set({ status: this.status }, { merge: true })
        await this.util.presentToast('Successfully updated', {
            position: 'top',
            color: 'success'
        })
        this.navCtrl.pop()
        this.loading = false
    }
}
