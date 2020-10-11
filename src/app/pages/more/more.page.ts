import { CameraService } from './../../services/camera.service'
import { AuthService } from '@services/auth.service'
import { NavController } from '@ionic/angular'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-more',
    templateUrl: './more.page.html',
    styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {
    avatar: any

    constructor(
        private navCtrl: NavController,
        public auth: AuthService,
        private camera: CameraService
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
        console.log('run')
        this.loadAvatar()
    }

    goTo(route) {
        this.navCtrl.navigateForward('/account' + route)
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
