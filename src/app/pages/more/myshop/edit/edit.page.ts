import { UtilService } from './../../../../services/util.service'
import { AngularFirestore } from '@angular/fire/firestore'
import { FormBuilder, Validators } from '@angular/forms'
import { CameraService } from './../../../../services/camera.service'
import { NavController } from '@ionic/angular'
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
    detail
    avatarSrc = null
    editForm
    @ViewChild('avatarimg') avatarImg: ElementRef

    constructor(
        private navCtrl: NavController,
        private cameraSvc: CameraService,
        private fb: FormBuilder,
        private afs: AngularFirestore,
        private util: UtilService,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {

    }

    sanitize(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl(url)
    }

    ionViewDidEnter() {
        this.detail = JSON.parse(localStorage['seller'])
        this.detail.shop = JSON.parse(this.detail.shop)
        this.avatarSrc = this.detail.shop.avatar
        this.editForm = this.fb.group({
            name: [this.detail.shop.name, [Validators.required]],
        })
    }

    async openCamera() {
        let avatar = await this.cameraSvc.takePicture()
        this.avatarSrc = avatar.webviewPath
        this.avatarImg.nativeElement.src = this.avatarSrc
        this.saveProfile()
    }

    saveProfile() {
        let user_uid = JSON.parse(localStorage['user']).uid
        let ref = this.afs.doc('sellers/' + user_uid)
        ref.set({
            shop: JSON.stringify({
                name: this.editForm.get('name').value,
                avatar: this.avatarSrc,
                user_uid
            })
        }, { merge: true })
        ref.get().toPromise().then(q => {
            localStorage['seller'] = JSON.stringify(q.data())
            this.util.presentToast('Successfully updated!', {
                position: 'top',
                color: 'success'
            })
        })
    }

    errorBorder(controlName, validator) {
        return { 'border border-red-600': this.editForm.get(controlName).hasError(validator) && this.editForm.touched }
    }

}
