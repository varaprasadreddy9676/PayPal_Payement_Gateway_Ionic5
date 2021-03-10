import { Component } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration,  PayPalPaymentDetails} from '@ionic-native/paypal/ngx';
import { NavController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private payPal: PayPal, private toastCtrl: ToastController) { }
  paymentAmount: string = '3.33';
  currency: string = 'USD';
  currencyIcon: string = '$';

  payWithPaypal() {
    console.log("Pay ????");
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'ARMwB4cAxN1Wnb1LVufXGb8Ez8Tc74X2QnP0zaIPbtEXmTWkkAjYWs9J0qN5s8qxJTY9X18dTHYxbspX'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          this.openToast()
          // Successfully paid
          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }


  async openToast() {
    const toast = await this.toastCtrl.create({
      cssClass: "my-cool-class",
      message: "Payment Succesfull!",
      duration: 6000,
      buttons: [
        {
          cssClass: "my-toast-button",
          text: "Close",
          handler: () => {
            console.log("clicked");
            return true;
          }
        }
      ]
    });
    toast.present();
  }
}

