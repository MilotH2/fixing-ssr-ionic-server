import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  isLoadingController: boolean = false;
  showingToast: boolean = false;

  constructor(
    // private alertController: AlertController,
    private toastController: ToastController,
    // private translateService: TranslateService,
    private loadingCtrl: LoadingController // private actionSheetController: ActionSheetController,
  ) // private imagesService: ImagesService
  {}

  async presentLoadingController(message?: string): Promise<void> {
    this.isLoadingController = true;

    var loadingOpts: LoadingOptions = {
      // duration: 1000,
      message,
      spinner: 'crescent',
      mode: 'ios',
      animated: true,
      backdropDismiss: false,
      showBackdrop: true,
      translucent: true,
      cssClass: 'loading-spinner-design',
    };
    return await this.loadingCtrl.create(loadingOpts).then((a) => {
      a.present().then(() => {
        if (!this.isLoadingController) {
          a.dismiss()
            .then(() => console.log(''))
            .catch(() => {});
        }
      });
    });
  }

  async dismissLoadingController(): Promise<void> {
    this.isLoadingController = false;
    return await this.loadingCtrl
      .dismiss()
      .then(() => console.log(''))
      .catch(() => {});
  }

  async presentToast(
    message: string,
    icon?: string,
    iconColor?: string
  ): Promise<void> {
    // Stop multiple toasts

    if (!this.showingToast) {
      this.showingToast = true;

      try {
        this.toastController
          .dismiss()
          .then(() => {})
          .catch(() => {})
          .finally(() => {});
      } catch (e) {}
      const toast = await this.toastController.create({
        message,
        duration: 2000,
        cssClass: iconColor ? iconColor + ' ' + 'toastStyle' : 'toastStyle',
        icon: icon ?? 'checkmark-circle',
        mode: 'ios',
      });
      toast.present();
      await toast.onDidDismiss();
      this.showingToast = false;
    }
  }
}
