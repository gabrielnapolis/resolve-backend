import { Injectable } from '@nestjs/common';
import PagbankSubscriptionDTO from '../dto/pagbank.subscription.dto';

@Injectable()
export class PagbankRepository {
  private URL_BASE = process.env.PAGSEGURO_SUBSCRIPTION
  constructor() {}

  private headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${process.env.PAGSEGURO_TOKEN}`,
  };

  async subscribe(paymentData: PagbankSubscriptionDTO) {
    console.log("sending data... ", JSON.stringify(paymentData));

    const url = `${this.URL_BASE}/subscriptions`;
    const options = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(paymentData),
    };

    let response = await fetch(url, options)

    console.log('response data: ', JSON.stringify(response));
    if(response.status === 200)
      return response.json()

    return null;
  }

  async cancelSubscription(subscriptionId: string) {
    const url = `${this.URL_BASE}/subscriptions/${subscriptionId}/cancel`;
    const options = {
      method: 'PUT',
      headers: this.headers,
    };

    let response = await fetch(url, options);

    if (response.status === 200) return response.json();

    return null;

  }

  async getPlanById(planId: string) {
    const url = `${this.URL_BASE}/plans/${planId}`;
    const options = {
      method: 'GET',
      headers: this.headers,
    };

    let response = await fetch(url, options);

    if (response.status === 200) return response.json();

    return null;
  }
}
