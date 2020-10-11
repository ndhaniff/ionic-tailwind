import { AuthService } from '@services/auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NavController } from '@ionic/angular'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    signUpForm: FormGroup

    constructor(
        private navCtrl: NavController,
        private fb: FormBuilder,
        private auth: AuthService
    ) { }

    get name() {
        return this.signUpForm.get('name')
    }
    get email() {
        return this.signUpForm.get('email')
    }
    get password() {
        return this.signUpForm.get('password')
    }
    get confirm_pass() {
        return this.signUpForm.get('confirm_pass')
    }
    get is_seller() {
        return this.signUpForm.get('is_seller')
    }

    ngOnInit(
    ) {
        this.signUpForm = this.fb.group({
            name: ['', [
                Validators.required
            ]],
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(6)
            ]],
            confirm_pass: ['', [
                Validators.required
            ]],
            is_seller: [false]
        }, { validators: [this.checkPasswords] })
    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        let pass = group.get('password').value
        let confirmPass = group.get('confirm_pass').value

        return pass === confirmPass ? null : { notSame: true }
    }

    signUp() {
        const { confirm_pass, email, password, ...rest } = this.signUpForm.value

        this.auth.SignUp(email, password, rest)
    }

    signIn() {
        this.navCtrl.navigateForward('/login')
    }
}
