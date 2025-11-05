import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatsocketService } from './chatsocket.service';
import { NotiService } from '../noti.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy  , AfterViewChecked{

  visible = false;
  newMessage = '';
  messages: { username: string, message: string }[] = [];
  @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef;

  constructor(private socketService: NotiService,private messageService: MessageService){

  }

  ngOnInit(): void {
    //this.socketService.initConnection();
    if(localStorage.getItem('user_name') != 'tuannd'){
    this.socketService.subscribeUserNotification('/user/queue/message',(msg: any) => {

       console.log("push noti "+msg);
      
      this.messageService.add({
        severity: 'info',
        summary: msg.username,
        detail: msg.message || 'Bạn có thông báo mới!',
        life: 1000  
      });
      this.messages.push({username:'Support',message:msg.message});
    });
  }
  }


  sendMessage() {
    if (!this.newMessage.trim()) return;
    this.messages.push({ username : localStorage.getItem('user_name') || '',message: this.newMessage });
    const userMessage = this.newMessage;
    this.newMessage = '';


  this.socketService.sendMessage('/app/private.sendMessage', {
    username: localStorage.getItem('user_name'),
    message: userMessage
  });

  }

  ngOnDestroy(): void {
    
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

   private scrollToBottom(): void {
    try {
      const el = this.chatMessagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (err) {}
  }

}