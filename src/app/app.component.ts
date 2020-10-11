import { AuthService } from '@services/auth.service'
import { Component, ViewChildren, QueryList } from '@angular/core'

import { NavController, Platform, ToastController, IonRouterOutlet } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { Router } from "@angular/router"

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    userSubscription$: any
    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>
    lastTimeBackPress = 0;
    timePeriodToExit = 2000;
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private navCtrl: NavController,
        private router: Router,
        private auth: AuthService,
        private toastController: ToastController
    ) {
        this.initializeApp()
        this.backButtonEvent()
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault()
            this.splashScreen.hide()
            window.screen.orientation.lock('portrait')

            this.auth.user$.subscribe(data => {
                localStorage['user'] = JSON.stringify(data)

                if (data.is_seller) {
                    this.auth.getSeller(data.uid)
                        .subscribe(data => {
                            localStorage['seller'] = JSON.stringify(data)
                        })
                }
            })
            // this.navCtrl.navigateForward('/tabs')
        })
    }

    backButtonEvent() {
        this.platform.backButton.subscribe(async () => {
            this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
                if (outlet && outlet.canGoBack()) {
                    outlet.pop()
                } else if (
                    this.router.url === "/tabs/home" ||
                    this.router.url === "/tabs/cart" ||
                    this.router.url === "/tabs/more"
                ) {
                    if (
                        new Date().getTime() - this.lastTimeBackPress <
                        this.timePeriodToExit
                    ) {
                        navigator["app"].exitApp()
                    } else {
                        this.showToast()
                        this.lastTimeBackPress = new Date().getTime()
                    }
                }
            })
        })
    }
    async showToast() {
        const toast = await this.toastController.create({
            message: "press back again to exit App.",
            duration: 2000,
            cssClass: "leaveToast",
        })
        toast.present()
    }

    ngOnDestroy() {
        this.userSubscription$.unsubscribe()
    }
}
