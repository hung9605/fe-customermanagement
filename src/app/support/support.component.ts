import { AfterViewChecked, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  lastIndex = 0;
  constructor(private chatService: ChatService
             ,private notiService: NotiService
             ,private messageService: MessageService
             ,private ngZone: NgZone
  ){}

   ngOnInit() {
    this.getListUser();
    this.subcriberUser();
  }

  subcriberUser(){
    this.notiService.subscribeUserNotification('/user/queue/message',(msg: Message) => {
      this.messageService.add({
        severity: 'info',
        summary: msg.username,
        detail: msg.message || 'Bạn có thông báo mới!',
        life: 1000  
      });
      console.log('user?.usernameuser?.usernameuser?.username',this.selectedUser?.username);
      
      if(msg.username == this.selectedUser?.username){
        console.log("push message");
        this.messages.push(msg);
        this.scrollIfNewMessage();
        this.markMessagesAsRead();
      }else{
        const foundUser = this.users.find(u => u.username == msg.username);
        if(foundUser){
          foundUser.lastMessage = msg.message;
          foundUser.unreadCount = (foundUser.unreadCount || 0) +1;
        }else{
           this.users.unshift({
            id:0,
            username: msg.username,
            lastMessage: msg.message,
            unreadCount: 1
          });
        }
        this.users = [...this.users];
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
    this.selectedUser.unreadCount = 0;
    console.log('this.selectedUser', this.selectedUser);
    this.chatService.getMessage(this.selectedUser.username,0).subscribe({
       next: ({data}) => {
        this.messages = data.reverse();
        this.isFirstLoad = true;
        if(this.selectedUser){
          this.ngZone.runOutsideAngular(() => {
             setTimeout(() => {
              this.markMessagesAsRead();
             },1000);
          });
     
        }
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
  }
}

private scrollToBottom(): void {
    try {
      const el = this.chatMessagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
      setTimeout(() => {
        this.isFirstLoad = false;
      }, 500);
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

  markMessagesAsRead(){
    const username = this.selectedUser?.username;
    this.chatService.markRead({from:username, to: username}).subscribe({
      next: ({data}) => {console.log(data);
      }
      ,error: err => console.log(err)
      
    })
  }



}
