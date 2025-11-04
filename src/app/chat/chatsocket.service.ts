import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChatsocketService {
  private client!: Client ;
  private connected = false;
  private subscriptions: { topic: string; callback: (msg: any) => void }[] = [];
  private reconnectDelay = 5000;
  private readonly serverUrl = environment.apiNotify;
  private retryCount = 0;
  private readonly maxRetry = 15; 

  constructor() {
  }
  initConnection(){
    const token = localStorage.getItem('access_token');
      if (!token) {
      console.warn('..Token invalid');
      setTimeout(() => this.initConnection(), 2000); // thử lại sau 2s
      return;
      }
    this.client = new Client({
      webSocketFactory: () => new SockJS(this.serverUrl),
      connectHeaders: {
       Authorization: `Bearer ${token}`,
      },
      reconnectDelay: this.reconnectDelay,
      debug: (msg) => console.log('[STOMP]', msg)
    });

    // Khi kết nối thành công
    this.client.onConnect = () => {
      console.log('✅ Connected to WebSocket');
      this.connected = true;
      this.retryCount = 0; 
      this.subscriptions.forEach(sub => {
        this._subscribeTopic(sub.topic, sub.callback);
      });
    };

    this.client.onWebSocketClose = () => {
      this.connected = false;
      console.warn('⚠️ WebSocket disconnected. Retrying...');
      this.retryCount++;
      if (this.retryCount >= this.maxRetry) {
        console.error(`❌ Retry failed ${this.maxRetry} times. Stopping reconnect.`);
        this.client.reconnectDelay = 0;
        this.client.deactivate(); // Ngắt hoàn toàn
      }
    };

    this.client.onStompError = (frame) => {
      console.error('❌ STOMP error:', frame.headers['message']);
    };

     this.client.activate();
  }

  connect(onConnected?: () => void): void {
  if (!this.client.active) {
    this.client.onConnect = () => {
      console.log('✅ Connected to WebSocket');
      this.connected = true;
      this.retryCount = 0;
      this.subscriptions.forEach(sub => {
        this._subscribeTopic(sub.topic, sub.callback);
      });

      if (onConnected) onConnected();
    };

    this.client.activate();
  }
}

  disconnect(): void {
    if (this.client.active) {
      this.client.deactivate();
    }
  }

  subscribeUserNotification(callback: (msg: any) => void): void {
    const topic = `/user/queue/notify`;
    this.subscribe(topic, callback);
  }

  subscribe(topic: string, callback: (msg: any) => void): void {
    if (this.subscriptions.some(sub => sub.topic === topic)) {
      return;
    }
    this.subscriptions.push({ topic, callback });
    if (this.connected) {
      this._subscribeTopic(topic, callback);
    }
  }
  private _subscribeTopic(topic: string, callback: (msg: any) => void): void {
    this.client.subscribe(topic, (message: IMessage) => {
      try {
        callback(JSON.parse(message.body));
      } catch {
        callback(message.body);
      }
    });
  }

  /**
   * Gửi message lên server qua STOMP
   * @param destination ví dụ: /app/chat.sendMessage
   * @param body dữ liệu muốn gửi (object hoặc string)
   */
  sendMessage(destination: string, body: any): void {
    if (this.client && this.client.connected) {
      const payload = typeof body === 'string' ? body : JSON.stringify(body);
      this.client.publish({ destination, body: payload });
      console.log('📤 Sent message:', destination, body);
    } else {
      console.warn('⚠️ Cannot send — STOMP client not connected');
    }
  }


}