import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { createPasswordStrengthValidator } from '../helper/validation-password';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  crendenciales:FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {}


  get email() {
    return this.crendenciales.get('email');
  }

  get password() {
    return this.crendenciales.get('password');
  }

  ngOnInit() {
    this.crendenciales = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),createPasswordStrengthValidator()]],
    });
  }

  async register() {
    

    const user = await this.authService.register(this.crendenciales.value);
 

    if (user) {
      this.router.navigateByUrl('/convertidor-youtube', { replaceUrl: true });
    } else {
      this.showAlert('Falló Registración', 'Intente devuelta!');
    }
  }

 

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  redirectToLogin(){
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
