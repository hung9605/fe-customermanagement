import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatsocketService } from './chatsocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {

  visible = false;
  newMessage = '';
  messages: { from: string, text: string }[] = [];

  constructor(private socketService: ChatsocketService){

  }

  ngOnInit(): void {
    this.socketService.initConnection();
   
  }


  sendMessage() {
    this.socketService.connect();
    if (!this.newMessage.trim()) return;

    this.messages.push({ from: 'You', text: this.newMessage });

    const userMessage = this.newMessage;
    this.newMessage = '';

    
  // Gửi lên server Spring Boot
  // this.socketService.sendMessage('/app/chat.sendMessage', {
  //   from: localStorage.getItem('username'),
  //   content: userMessage
  // });

    // Demo phản hồi tự động
    setTimeout(() => {
      this.messages.push({
        from: 'Support',
        text: `Đã nhận: "${userMessage}". Chúng tôi sẽ phản hồi sớm nhất!`
      });
    }, 1000);
  }

  ngOnDestroy(): void {
    
  }


}
