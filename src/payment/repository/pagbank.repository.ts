import { Injectable } from '@nestjs/common';
import { PagBank } from '../dto/pagbank.subscription.dto';

@Injectable()
export class PagbankRepository {
  private URL_BASE = process.env.PAGSEGURO_SUBSCRIPTION;
  constructor() {}

  private headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${process.env.PAGSEGURO_TOKEN}`,
  };

  async subscribe(paymentData: PagBank.SubscriptionDTO) {
    console.log(
      '\nEnviando dados para assinatura: ',
      JSON.stringify(paymentData),
    );

    const url = `${this.URL_BASE}/subscriptions`;
    const options = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(paymentData),
    };

    let response = await fetch(url, options);
    let data = await response.json();

    console.log('\nResposta assinatura: ', JSON.stringify(data));
    if (response.status == 201) return data;

    return null;
  }

  async generatePixQrCode(paymentData: PagBank.PixDTO) {
    console.log(
      '\nEnviando dados para pagamento com pix: ',
      JSON.stringify(paymentData),
    );

    const url = `${process.env.PAGSEGURO_PIX}/orders`;
    const options = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(paymentData),
    };

    let response = await fetch(url, options);
    let data = await response.text();

    console.log('\nResposta pagamento com pix: ', data);
    if (response.status == 201) return JSON.parse(data);

    return null;
  }

  async cancelSubscription(subscriptionId: string) {
    const url = `${this.URL_BASE}/subscriptions/${subscriptionId}/cancel`;
    const options = {
      method: 'PUT',
      headers: this.headers,
    };

    console.log(url);

    let response = await fetch(url, options);

    if (response.status === 201) return response.json();

    return null;
  }

  async getPlanById(planId: string) {
    const url = `${this.URL_BASE}/plans/${planId}`;

    console.log('Obtendo o plano em: ', url, '\r');
    const options = {
      method: 'GET',
      headers: this.headers,
    };

    let response = await fetch(url, options);
    console.log(response.status);

    if (response.status === 200) return response.json();

    return null;
  }

  async capturePix(orderId: string) {
    const url = `${process.env.PAGSEGURO_PIX}/orders/${orderId}`;

    console.log('Obtendo o order em: ', url, '\r');
    const options = {
      method: 'GET',
      headers: this.headers,
    };

    let response = await fetch(url, options);

    if (response.status === 200) {
      let data = await response.text();
      console.log('Order response: ', data);
      return JSON.parse(data);
    }
    return null;
  }

  async findSubscriberByEmail(email: string) {
    console.log('\nObter subscriber por email: ', JSON.stringify(email));

    let headers = { ...this.headers, q: email };

    const url = `${this.URL_BASE}/customers`;
    const options = {
      method: 'GET',
      headers: headers,
    };

    let response = await fetch(url, options);
    let data = await response.text();

    console.log('\nResposta Obter subscriber: ', data);
    if (response.status == 200) return JSON.parse(data);

    return null;
  }
}
