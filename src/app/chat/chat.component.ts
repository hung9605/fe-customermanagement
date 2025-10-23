import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {

  visible = false;
  newMessage = '';
  messages: { from: string, text: string }[] = [];

  ngOnInit(): void {
    
  }


  sendMessage() {
    if (!this.newMessage.trim()) return;

    this.messages.push({ from: 'You', text: this.newMessage });

    const userMessage = this.newMessage;
    this.newMessage = '';

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
