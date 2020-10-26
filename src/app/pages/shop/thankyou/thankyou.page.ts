import { NavController } from '@ionic/angular'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-thankyou',
    templateUrl: './thankyou.page.html',
    styleUrls: ['./thankyou.page.scss'],
})
export class ThankyouPage implements OnInit {

    constructor(
        private navCtrl: NavController
    ) { }

    ngOnInit() {
    }

    gotohome() {
        this.navCtrl.navigateBack('/')
    }
}
