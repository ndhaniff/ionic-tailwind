import { Injectable } from '@angular/core'
import { ToastController } from '@ionic/angular'

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(
        public toast: ToastController
    ) { }

    async presentToast(message, options = null) {
        const toast = await this.toast.create({
            message,
            duration: 500,
            ...options
        })
        toast.present()
    }

    async delay(time = 500) {
        return new Promise((resolve, reject) => {
            setTimeout(_ => resolve(), time)
        })
    }

}
