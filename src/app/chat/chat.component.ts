import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatsocketService } from './chatsocket.service';
import { NotiService } from '../noti.service';
import { MessageService } from 'primeng/api';
import { ChatService } from '../support/chat.service';

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
  username = '';
  showLoadMore = false;
  constructor(private socketService: NotiService
              ,private messageService: MessageService
              ,private chatService: ChatService
            ){

  }

  ngOnInit(): void {
    this.username = localStorage.getItem('user_name') || '';
    if(this.username != 'tuannd'){
    this.getMessage();
    this.socketService.subscribeUserNotification('/user/queue/message',(msg: any) => {
      this.messageService.add({
        severity: 'info',
        summary: msg.username,
        detail: msg.message || 'Bạn có thông báo mới!',
        life: 1000  
      });
      this.messages.push({username:msg.username,message:msg.message});
  
    });
  }
  }

  getMessage(){
     this.chatService.getMessage(this.username || '',0).subscribe({
       next: ({data}) => {this.messages = data.reverse();
       }
      ,error: err => console.log(err)
    })
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

  show(){
    this.visible = true;
    this.getMessage();
  }

  loadMore(){

  }

  gotoBottom(){

  }

}