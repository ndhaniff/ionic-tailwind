import { CameraService } from './../../../services/camera.service'
import { NavController } from '@ionic/angular'
import { Observable } from 'rxjs'
import { CustomerService, Customer } from './../../../services/customer.service'
import { Component, OnInit } from '@angular/core'
import { strict } from 'assert'

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    avatar: any
    detail: any

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

    constructor(
        private customerSvc: CustomerService,
        private navCtrl: NavController,
        private camera: CameraService
    ) { }

    ngOnInit() {
        this.customerSvc.getCustomerDetails$(this.user.uid)
            .subscribe((data: any) => {
                if (!data) {
                    this.detail = {
                        address: null,
                        payment_type: null,
                        created_at: null
                    }
                } else {
                    this.detail = data
                }
            })
        this.loadAvatar()
    }

    formatAddress(address) {
        let addressStr = `${address.street1} ${address.street2}, ${address.city}, ${address.poscode} ${address.state}`
        return addressStr[0].toUpperCase() + addressStr.slice(1)
    }

    ionViewDidEnter() {
        this.loadAvatar()
    }

    async loadAvatar() {
        this.avatar = await this.camera.loadSaved()
    }

    goToEdit() {
        this.navCtrl.navigateForward(['account/profile/edit', {
            userProfile: JSON.stringify({
                ...this.user,
                detail: { ...this.detail }
            })
        }])
    }
}
