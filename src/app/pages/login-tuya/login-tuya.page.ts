import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login-tuya',
  templateUrl: './login-tuya.page.html',
  styleUrls: ['./login-tuya.page.scss'],
})
export class LoginTuyaPage implements OnInit {

  public form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(public navCtrl: NavController, public http: HttpClient, public storage: Storage) { }

  ngOnInit() {
  }

  backPage() {
    this.navCtrl.back();
  }

  login() {

    let data: FormData = new FormData();
    data.append('from', 'tuya');
    data.append('countryCode', '55');
    data.append('userName', this.form.value.email ?? '');
    data.append('password', this.form.value.password ?? '');
    data.append('bizType', 'tuya');


    this.http.post<any>('https://px1.tuyaeu.com/homeassistant/auth.do', data).subscribe({
      next: data => {
        if (data?.responseStatus != 'error') {
          this.storage.set('tuyaToken', data.access_token);
          this.storage.set('tuyaRefreshToken', data.access_token);
          this.storage.set('tuyaLogin', this.form.value.email);
          this.storage.set('tuyaPassword', this.form.value.password);
          this.navCtrl.back();
        }
      },
      error: error => {
          console.error('There was an error!', error);
      }
    })
  }

}
