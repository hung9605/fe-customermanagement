import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatsocketService } from './chatsocket.service';
import { NotiService } from '../noti.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {

  visible = false;
  newMessage = '';
  messages: { from: string, message: string }[] = [];

  constructor(private socketService: NotiService){

  }

  ngOnInit(): void {
    //this.socketService.initConnection();
  }


  sendMessage() {
  //  this.socketService.connect();
    if (!this.newMessage.trim()) return;
    this.messages.push({ from : localStorage.getItem('user_name') || '',message: this.newMessage });
    const userMessage = this.newMessage;
    this.newMessage = '';


  this.socketService.sendMessage('/app/private.sendMessage', {
    username: localStorage.getItem('user_name'),
    message: userMessage
  });

    // Demo phản hồi tự động
    setTimeout(() => {
      this.messages.push({
        from: 'Support',
        message: `Đã nhận: "${userMessage}". Chúng tôi sẽ phản hồi sớm nhất!`
      });
    }, 1000);
  }

  ngOnDestroy(): void {
    
  }


}
