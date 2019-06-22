import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }


  takePicture() {
    Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    }).then(image => {
      this.domSanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    });
  }

}
