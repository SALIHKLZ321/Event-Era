import { environment } from './../../../../environments/environment';
import { Component, AfterViewInit, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ievent } from '../../models/event-vendor.model';
import { iUser } from '../../models/user.model';
import { BookingService } from '../../services/booking.service';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  public payPalConfig ? : IPayPalConfig;
  eventId!: string;
  event!: ievent;
  user!: iUser;
  quantity: number = 1;
  price!: number;
  paymentRequest : google.payments.api.PaymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"]
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '100',
      currencyCode: 'INR',
      countryCode: 'IN'
    },
    callbackIntents: ['PAYMENT_AUTHORIZATION']
  }
  paymentHandler: any;

  constructor(private _activatedRoute: ActivatedRoute, private _bookingService: BookingService, private _router: Router) {
    this._activatedRoute.params.subscribe((params)=> {
      this.eventId = params['id'];
    })
   }

  ngOnInit(): void {
    this.fetchBookingDetails();
  }

  ngAfterViewInit(): void {
    
  }
  fetchBookingDetails(){
    if(this.eventId){
      this._bookingService.fetchBookingDetails(this.eventId).subscribe((res) => {
        this.event = res.event;
        this.user = res.user;
        this.price = res.event.price;
        this.initConfig();
        this.invokeStripe();
      })
    }
  }
  quantityInc(){
    this.quantity++;
    if(this.event?.price){
      this.price = this.event?.price * this.quantity
    }
  }
  quantityDec(){
    this.quantity--;
    if(this.event?.price){
      this.price = this.event?.price * this.quantity
    }

  }
  onLoadPaymentData(event: Event){
    const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
    console.log('load payment data', eventDetail.detail);
    
  }
  onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler =(paymentData) => {
    console.log('payment authorized', paymentData);
    return {transactionState: 'SUCCESS'}
  }
  onError(event: Event){
    console.error('error', event);
    
  }
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        "clientId": 'AWCK_Xyc-vPGHMNz7NnUTQg5AajrxH-of_9l5-6SBCcau---NHAE7uEqSILmhAxXXqYIr_tHJnwg8uhE',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
              amount: {
              currency_code: "USD",
              value: `${this.price}`,
              breakdown: {
              item_total: {currency_code:"USD", value:`${this.price}`},
              }
              },
              items: [{name:`${this.event?.title}`, quantity:"1", unit_amount:{currency_code:"USD", value:`${this.price}`}}]
              }],
              redirect_urls: {
              return_url: 'http://www.pawelbiernacki.net/PawelBiernackiSklep/Success',
              cancel_url: 'http://www.pawelbiernacki.net/PawelBiernackiSklep/Cancel'
              },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
        },
        onApprove: (data: any, actions: { order: { get: () => Promise<any>; }; }) => {
             console.log('onApprove - transaction was approved, but not authorized', data, actions);
             actions.order.get().then((details: any) => {
                 console.log('onApprove - you can get full order details inside onApprove: ', details);
             });

         },
    }
}
}
makePayment(amount: any) {
  const data = {
    event: this.event._id,
    quantity: this.quantity,
    total: this.price,
  }
  const bookingTicket = ()=> {
    this._bookingService.bookTicket(data).subscribe((res) => {
      this._router.navigate(['/profile']);
    })
  }
  const paymentHandler = (<any>window).StripeCheckout.configure({
    key: 'pk_test_51MoOhaSFLMtPwurSY4DiJlWS8VXth4eVuw5cXig2xSgvlTn2NTXcWSr6mZ2Y2r8MH4LgcATZPeYJkHsmzlGHGf9C00Mbh1U7MG',
    locale: 'auto',
    token: function (stripeToken: any) {
      console.log(stripeToken);
      bookingTicket();
    },
  });
  paymentHandler.open({
    name: 'Positronx',
    description: '3 widgets',
    amount: amount * 100,
  });
}
invokeStripe() {
  if (!window.document.getElementById('stripe-script')) {
    const script = window.document.createElement('script');
    script.id = 'stripe-script';
    script.type = 'text/javascript';
    script.src = 'https://checkout.stripe.com/checkout.js';
    script.onload = () => {
      this.paymentHandler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51MoOhaSFLMtPwurSY4DiJlWS8VXth4eVuw5cXig2xSgvlTn2NTXcWSr6mZ2Y2r8MH4LgcATZPeYJkHsmzlGHGf9C00Mbh1U7MG',
        locale: 'auto',
        token: function (stripeToken: any) {
          console.log(stripeToken);
          alert('Payment has been successfull!');
          
        },
      });
    };
    window.document.body.appendChild(script);
  }
}

}
