import { NavController } from '@ionic/angular'
import { UtilService } from './../../../../services/util.service'
import { CustomerService } from './../../../../services/customer.service'
import { AuthService } from '@services/auth.service'
import { CameraService } from './../../../../services/camera.service'
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms'
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'

@Component({
    selector: 'app-add',
    templateUrl: './add.page.html',
    styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

    addForm: FormGroup
    avatarSrc: any
    detail: any
    @ViewChild('avatarimg') avatarImg: ElementRef

    constructor(
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private cameraSvc: CameraService,
        private auth: AuthService,
        private customerSvc: CustomerService,
        private navCtrl: NavController
    ) {
    }

    ngOnInit() {
        let address, shipping_address
        this.detail = JSON.parse(localStorage['user'])
        address = shipping_address = {
            street1: '',
            street2: '',
            poscode: '',
            city: '',
            state: ''
        }
        this.addForm = this.fb.group({
            address: this.fb.group({
                street1: [address.street1, [Validators.required]],
                street2: [address.street2],
                poscode: [address.poscode, [Validators.required]],
                city: [address.city, [Validators.required]],
                state: [address.state, [Validators.required]],
                country: ['Malaysia', [Validators.required]],
            }),
            shipping_address: this.fb.group({
                street1: [shipping_address.street1, [Validators.required]],
                street2: [shipping_address.street2],
                poscode: [shipping_address.poscode, [Validators.required]],
                city: [shipping_address.city, [Validators.required]],
                state: [shipping_address.state, [Validators.required]],
                country: ['Malaysia', [Validators.required]],
            })
        })
    }

    sameAsAddress() {
        this.addForm.get('shipping_address').setValue(this.addForm.get('address').value)
    }

    errorBorder(controlName, validator) {
        return { 'border border-red-600': this.addForm.get(controlName).hasError(validator) && this.addForm.touched }
    }

    async saveProfile() {
        await this.customerSvc.addCustomerAddress(this.detail.uid, this.addForm.value)
        this.navCtrl.pop()
    }
}
