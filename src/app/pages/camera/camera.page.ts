import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActionSheetController, AlertController } from '@ionic/angular';

CameraSource.Camera

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  photoUrl: string;

  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  askToTakePicture() {
    this.actionSheetController.create({
      header: 'Source?',
      buttons: [
        {
          text: 'CameraSource.Camera',
          handler: () => {
            this.takePicture(CameraSource.Camera);
          }
        },
        {
          text: 'CameraSource.Photos',
          handler: () => {
            this.takePicture(CameraSource.Photos);
          }
        },
        {
          text: 'CameraSource.Prompt',
          handler: () => {
            this.takePicture(CameraSource.Prompt);
          }
        },
      ]
    }).then(actionSheet => actionSheet.present());
  }

  takePicture(source: CameraSource) {
    Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: source
    }).then(image => {
      this.photoUrl = image.dataUrl;
    }).catch(error => {
      this.alertController.create({
        header: 'Error!',
        subHeader: "Something went wrong...",
        message: error,
        buttons: ['OK']
      }).then(alert => alert.present());
    });
  }

}
