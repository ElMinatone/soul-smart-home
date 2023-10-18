import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  // tuya
  tuyaEnable: boolean = false;

  constructor(public storage: Storage) {
  }

  async ngOnInit() {
    let tuyaToken = await this.storage.get('tuyaToken') ?? null;
    if (tuyaToken != null) {
      this.tuyaEnable = true;
    }
  }

}
