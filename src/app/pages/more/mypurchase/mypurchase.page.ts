import { ActivatedRoute } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore'
import { IonSlides, NavController } from '@ionic/angular'
import { Subject, merge } from 'rxjs'
import { Component, OnInit, ViewChild } from '@angular/core'
import { SwiperOptions } from 'swiper'
import { scan } from 'rxjs/operators'

@Component({
    selector: 'app-mypurchase',
    templateUrl: './mypurchase.page.html',
    styleUrls: ['./mypurchase.page.scss'],
})
export class MypurchasePage implements OnInit {
    @ViewChild('sliderContent', { static: false }) sliderContent: IonSlides
    slideChange$: Subject<{ index: number }> = new Subject()
    catSliderOpt: SwiperOptions = {
        slidesPerView: 3
    }
    catSliderContentOpt: SwiperOptions = {
        slidesPerView: 1,
        spaceBetween: 10,
        simulateTouch: false
    }
    activeSlideIdx = 0
    statuses = [
        {
            name: 'To Pay'
        },
        {
            name: 'To Ship'
        },
        {
            name: 'To Receive'
        },
        {
            name: 'To Rate'
        },
        {
            name: 'Done'
        },
    ]
    unpaid
    paid
    shipped
    complete
    done

    constructor(
        private afs: AngularFirestore,
        private navCtrl: NavController,
        private router: ActivatedRoute
    ) { }

    ngOnInit() {

    }

    async ionViewDidEnter() {
        this.sliderContent.slideTo(parseInt(this.router.snapshot.params.type))
        let ordersRef = this.afs.collection('orders')
        let userId = JSON.parse(localStorage['user']).uid
        let q = ordersRef.ref.where('user_id', '==', userId)
        let unpaid = await q.where('status', '==', 'unpaid').get()
        let paid = await q.where('status', '==', 'paid').get()
        let shipped = await q.where('status', '==', 'shipped').get()
        let complete = await q.where('status', '==', 'complete').get()
        let done = await q.where('status', '==', 'done').get()
        const callback = doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        }
        this.unpaid = unpaid.docs.map(callback)
        this.paid = paid.docs.map(callback)
        this.shipped = shipped.docs.map(callback)
        this.complete = complete.docs.map(callback)
        this.done = done.docs.map(callback)
    }

    async contentSlideChange() {
        let index = await this.sliderContent.getActiveIndex()
        this.slideChange$.next({
            index
        })
    }

    pay(uid) {
        this.navCtrl.navigateForward('/pay/' + uid)
    }
    rate(uid, orderId) {
        this.navCtrl.navigateForward(['/review/' + uid], {
            queryParams: {
                orderId
            }
        })
    }

    async selectCategory(index) {
        this.activeSlideIdx = index
        this.sliderContent.slideTo(index)
    };

}
