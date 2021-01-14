import { UtilService } from './../../../../services/util.service'
import { CustomerService } from './../../../../services/customer.service'
import { AuthService } from '@services/auth.service'
import { CameraService } from './../../../../services/camera.service'
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms'
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

    editForm: FormGroup
    avatarSrc: any = ''
    detail: any
    @ViewChild('avatarimg') avatarImg: ElementRef

    constructor(
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private cameraSvc: CameraService,
        private auth: AuthService,
        private customerSvc: CustomerService,
    ) {

        let userprofile: any = this.activatedRoute.snapshot.params.userProfile
        this.detail = JSON.parse(userprofile)
    }

    ngOnInit() {
        let { address, shipping_address } = this.detail.detail
        if (!address || !shipping_address) {
            address = shipping_address = {
                street1: '',
                street2: '',
                poscode: '',
                city: '',
                state: ''
            }
        }
        this.getAvatar()
        this.editForm = this.fb.group({
            name: [this.detail.name, [Validators.required]],
            address: this.fb.group({
                street1: [address.street1, [Validators.required]],
                street2: [address.street2],
                poscode: [address.poscode, [Validators.required]],
                city: [address.city, [Validators.required]],
                state: [address.state, [Validators.required]],
                country: ['Malaysia', [Validators.required]],
            }),
            shipping_address: this.fb.group({
                street1: [shipping_address.street1 ?? '', [Validators.required]],
                street2: [shipping_address.street2 ?? ''],
                poscode: [shipping_address.poscode ?? '', [Validators.required]],
                city: [shipping_address.city ?? '', [Validators.required]],
                state: [shipping_address.state ?? '', [Validators.required]],
                country: ['Malaysia', [Validators.required]],
            })
        })
    }

    sameAsAddress() {
        this.editForm.get('shipping_address').setValue(this.editForm.get('address').value)
    }

    errorBorder(controlName, validator) {
        return { 'border border-red-600': this.editForm.get(controlName).hasError(validator) && this.editForm.touched }
    }

    async openCamera() {
        let avatar = await this.cameraSvc.takePicture()
        this.avatarSrc = avatar.webviewPath
        this.avatarImg.nativeElement.src = this.avatarSrc
        this.saveProfile()
    }

    saveProfile() {
        this.auth.UpdateUserDataById(this.detail.uid, {
            avatarUrl: this.avatarSrc,
            name: this.editForm.get('name').value
        })
        this.customerSvc.saveCustomerData(this.detail, this.editForm.value)
    }

    async getAvatar() {
        let avatarSrc = await this.cameraSvc.loadSaved()
        if (avatarSrc) {
            this.avatarSrc = avatarSrc
            this.avatarImg.nativeElement.src = avatarSrc
        }
    }
}
