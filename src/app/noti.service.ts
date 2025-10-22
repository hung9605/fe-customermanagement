import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotiService {
  private client: Client;
  private connected = false;
  private subscriptions: { topic: string; callback: (msg: any) => void }[] = [];
  private reconnectDelay = 5000;

  private readonly serverUrl = environment.apiNotify;

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(this.serverUrl),
      reconnectDelay: this.reconnectDelay,
      debug: (msg) => console.log('[STOMP]', msg)
    });

    // Khi kết nối thành công
    this.client.onConnect = () => {
      console.log('✅ Connected to WebSocket');
      this.connected = true;

      // Re-subscribe tất cả các topic đã lưu
      this.subscriptions.forEach(sub => {
        this._subscribeTopic(sub.topic, sub.callback);
      });
    };

    // Khi mất kết nối
    this.client.onWebSocketClose = () => {
      this.connected = false;
      console.warn('⚠️ WebSocket disconnected. Retrying...');
    };

    // Khi có lỗi
    this.client.onStompError = (frame) => {
      console.error('❌ STOMP error:', frame.headers['message']);
    };
  }

  /** Bắt đầu kết nối WebSocket */
  connect(): void {
    if (!this.client.active) {
      this.client.activate();
    }
  }

  /** Ngắt kết nối WebSocket */
  disconnect(): void {
    if (this.client.active) {
      this.client.deactivate();
    }
  }

  /** Đăng ký nhận message từ topic */
  subscribe(topic: string, callback: (msg: any) => void): void {
    // Nếu đã đăng ký topic này rồi → bỏ qua (tránh trùng)
    if (this.subscriptions.some(sub => sub.topic === topic)) {
      return;
    }

    this.subscriptions.push({ topic, callback });

    // Nếu đang kết nối thì subscribe ngay
    if (this.connected) {
      this._subscribeTopic(topic, callback);
    }
  }

  /** Hàm nội bộ để thực hiện subscribe thật */
  private _subscribeTopic(topic: string, callback: (msg: any) => void): void {
    this.client.subscribe(topic, (message: IMessage) => {
      try {
        callback(JSON.parse(message.body));
      } catch {
        callback(message.body);
      }
    });
  }
}
