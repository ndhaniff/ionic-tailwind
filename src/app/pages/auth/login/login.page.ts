import { NavController } from '@ionic/angular'
import { Component, OnInit } from '@angular/core'
import { AuthService } from '@services/auth.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginform: FormGroup

    constructor(
        private auth: AuthService,
        private navCtrl: NavController,
        private fb: FormBuilder
    ) { }

    get email() {
        return this.loginform.get('email')
    }

    get password() {
        return this.loginform.get('password')
    }

    ngOnInit() {
        this.loginform = this.fb.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(6)
            ]]
        })
    }

    attemptSignIn() {
        const { email, password } = this.loginform.value
        this.auth.SignIn(email, password)
    }


    signUp() {
        this.navCtrl.navigateForward('/signup')
    }
}
