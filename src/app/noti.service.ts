import { Injectable } from '@angular/core';
import { IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


@Injectable({
  providedIn: 'root'
})
export class NotiService {

  private stompClient: any;
  private connected = false;
  private subscriptions: { topic: string; callback: (msg: any) => void }[] = [];
  private reconnectDelay = 5000;

  constructor() { }

   connect() {
    const socket = new SockJS('http://localhost:9105/ws-notify');
    this.stompClient = Stomp.over(socket);

    // optional: tắt log
    this.stompClient.debug = () => {};

    this.stompClient.connect(
      {},
      () => {
        console.log('✅ Connected to WebSocket');
        this.connected = true;

        // Re-subscribe lại tất cả topic sau khi reconnect
        this.subscriptions.forEach((sub) => {
          this.subscribe(sub.topic, sub.callback);
        });
      },
      (error: any) => {
        console.warn('⚠️ WebSocket disconnected. Retrying in 5s...', error);
        this.connected = false;

        setTimeout(() => {
          this.connect(); // reconnect
        }, this.reconnectDelay);
      }
    );
  }

  subscribe(topic: string, callback: (msg: any) => void) {
    if (this.connected && this.stompClient) {
      const sub = this.stompClient.subscribe(topic, (message: IMessage) => {
        callback(JSON.parse(message.body));
      });
      this.subscriptions.push({ topic, callback });
      return sub;
    } else {
      // Nếu chưa kết nối, chờ rồi subscribe sau
      this.subscriptions.push({ topic, callback });
    }
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }

  
}
