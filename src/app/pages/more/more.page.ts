import { CameraService } from './../../services/camera.service'
import { AuthService } from '@services/auth.service'
import { NavController } from '@ionic/angular'
import { Component, OnInit } from '@angular/core'
import { AnalyticsService } from '@services/analytics.service'

@Component({
    selector: 'app-more',
    templateUrl: './more.page.html',
    styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {
    avatar: any
    mypurchase
    constructor(
        private navCtrl: NavController,
        public auth: AuthService,
        private camera: CameraService,
        private analytics: AnalyticsService
    ) { }

    get isLoggedin() {
        return localStorage['isLoggedin'] === 'true' ? true : false
    }

    get user() {
        try {
            if (localStorage['user']) {
                return JSON.parse(localStorage['user'])
            } else {
                return null
            }
        } catch (error) {
            return null
        }
    }


    ngOnInit() {
        this.loadAvatar()
    }

    async loadAvatar() {
        this.avatar = await this.camera.loadSaved()
    }

    ionViewDidEnter() {
        this.loadAvatar()
        if (localStorage['mypurchase']) {
            this.mypurchase = JSON.parse(localStorage['mypurchase'])
        }
        this.analytics.getMyPurchaseCount()
            .then(data => {
                localStorage['mypurchase'] = JSON.stringify(data)
                this.mypurchase = data
            })
    }

    goTo(route) {
        this.navCtrl.navigateForward('/account' + route)
    }

    goToMyShop() {
        this.navCtrl.navigateForward('/account/myshop/' + this.user.uid)
    }
    signIn() {
        this.navCtrl.navigateForward('/login')
    }
    signUp() {
        this.navCtrl.navigateForward('/signup')
    }
    signOut() {
        this.auth.SignOut()
    }
}
