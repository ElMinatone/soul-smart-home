import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public devicesTuya: any = [];

  constructor(public http: HttpClient, public storage: Storage) {}

  async ngOnInit() {
    let tokenTuya = await this.storage.get('tuyaToken') ?? null;
    if (tokenTuya != null) {
      this.discoveryTuya();
    }
  }

  async discoveryTuya() {
    let devicesTuya = await this.storage.get('tuyaDevices') ?? '';
    if (devicesTuya != '') {
      this.devicesTuya = JSON.parse(devicesTuya);
      console.log(this.devicesTuya);
    }

    let tokenTuya = await this.storage.get('tuyaToken') ?? null;
    let data = {
      "header": {
        "name": "Discovery",
        "namespace": "discovery",
        "payloadVersion": "1"
      },
      "payload": {
        "accessToken": tokenTuya
      }
    }

    this.http.post<any>('https://px1.tuyaeu.com/homeassistant/skill', data).subscribe({
      next: data => {
        if (data?.header.code == 'SUCCESS') {
          let devices = data.payload.devices;
          this.devicesTuya = devices;
          this.storage.set('tuyaDevices', JSON.stringify(devices));
        }
      },
      error: error => {
          console.error('There was an error!', error);
      }
    })
  }

  async switchOnOff(dev: any) {
    console.log(dev);
    if (dev.data.state == true) {
      dev.data.state = false;
    } else {
      dev.data.state = true;
    }
    let index = this.devicesTuya.findIndex((item: any) => item.id == dev.id);
    this.devicesTuya[index] = dev;
    this.storage.set('tuyaDevices', JSON.stringify(this.devicesTuya));

    let tokenTuya = await this.storage.get('tuyaToken') ?? null;
    let data = {
      "header": {
        "name": "turnOnOff",
        "namespace": "control",
        "payloadVersion": 1
  },
      "payload": {
        "accessToken": tokenTuya,
        "devId": dev.id,
        "value": dev.data.state == true ? 1 : 0
      }
    }

    this.http.post<any>('https://px1.tuyaeu.com/homeassistant/skill', data).subscribe({
      next: data => {
        if (data?.header.code == 'SUCCESS') {

        }
      },
      error: error => {
          console.error('There was an error!', error);
      }
    });

  }

}
