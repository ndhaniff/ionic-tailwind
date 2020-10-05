import { NavController } from '@ionic/angular'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-more',
    templateUrl: './more.page.html',
    styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

    constructor(
        private navCtrl: NavController
    ) { }

    ngOnInit() {
    }

    goTo(route) {
        this.navCtrl.navigateForward('/account' + route)
    }
}
