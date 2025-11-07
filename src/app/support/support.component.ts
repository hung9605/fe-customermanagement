import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Message, User } from './message';
import { ChatService } from './chat.service';
import ApiResponse from '../common/api/Respone';
import { NotiService } from '../noti.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent implements OnInit, OnDestroy, AfterViewChecked {
  users: User[] = [];
  selectedUser?: User;
  messages: Message[] = [];
  newMessage: string = '';
  @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef;
  showLoadMore = false;
  lastMessageCount = 0;
  isSend = false;
  isFirstLoad = false;
  constructor(private chatService: ChatService
             ,private notiService: NotiService
             ,private messageService: MessageService
  ){}

   ngOnInit() {
    this.getListUser();
    
  
  }

  subcriberUser(user: User){
    this.notiService.subscribeUserNotification('/user/queue/message',(msg: Message) => {
      this.messageService.add({
        severity: 'info',
        summary: msg.username,
        detail: msg.message || 'Bạn có thông báo mới!',
        life: 1000  
      });
      console.log('msg.username',msg.username);
      console.log('this.selectedUser?.username', user?.username);
      
      if(msg.username == user?.username){
        this.messages.push(msg);
        console.log('messagesmessagesmessages',this.messages);
        
        this.scrollIfNewMessage();
      }
    });
  }

  getListUser(){
    this.chatService.getListUser().subscribe({
      next: ({data}:ApiResponse) => {
        this.users = data;
      }
      ,error: (err:any) => {console.log(err)}
    })
  }

  selectUser(user: User) {
    if (!user) return;
    this.selectedUser = user;
    console.log('this.selectedUser', this.selectedUser);
    this.chatService.getMessage(this.selectedUser.username,0).subscribe({
       next: ({data}) => {
        this.messages = data.reverse();
        this.isFirstLoad = true;
        console.log("scroll to bottom");
        if(this.selectedUser)
          this.subcriberUser(this.selectedUser);
      }
      ,error: err => console.log(err)
    })
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    const messageSend = { username: 'tuannd', message: this.newMessage ,status:false,toAccount:this.selectedUser!.username };
    this.notiService.sendMessage('/app/private.sendMessage', {
    username: localStorage.getItem('user_name'),
    message: this.newMessage,
    toAccount: this.selectedUser!.username
    });
      this.messages.push(messageSend);
      this.isSend =true;
      this.newMessage = '';
  }

ngOnDestroy(): void {
  
}

ngAfterViewChecked(): void {
  if(this.isSend){
          this.scrollToBottom();
          this.isSend = false;
  }
  if(this.isFirstLoad){
    this.scrollToBottom();
    this.isFirstLoad = false;
  }
}

private scrollToBottom(): void {
    try {
      const el = this.chatMessagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (err) {}
  }

  private scrollIfNewMessage() {
    if (this.messages.length > this.lastMessageCount) {
      this.lastMessageCount = this.messages.length;
        const el = this.chatMessagesContainer.nativeElement;
      if(!(el.scrollHeight - el.scrollTop - el.clientHeight > 250))
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }



}
