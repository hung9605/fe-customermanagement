import { AfterViewChecked, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Message, User, CacheMessage } from './message';
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
  showLoadOld = false;
  showGoToBottom = true;
  isNumberMessageOld = 0;
  lastIndex = 0;
  isFirstLoad = true;
  page = 0;
  hasMore = true;
  isLoading = false;
  cacheMessage : { [username: string]: CacheMessage} = {};
 
  constructor(private chatService: ChatService
             ,private notiService: NotiService
             ,private messageService: MessageService
             ,private ngZone: NgZone
  ){}

   ngOnInit() {
    this.getListUser();
    this.subcriberUser();
    this.cacheMessage = {};
  }

  subcriberUser(){
    this.notiService.subscribeUserNotification('/user/queue/message',(msg: Message) => {
      this.messageService.add({
        severity: 'info',
        summary: msg.username,
        detail: msg.message || 'Bạn có thông báo mới!',
        life: 1000  
      });
      if(msg.username == this.selectedUser?.username){
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
    if (!user || user.username == this.selectedUser?.username) return;
    
    this.page = 0;
    this.isLoading = true;
    this.selectedUser = user;
    this.selectedUser.unreadCount = 0;
    console.log('this.selectedUser', this.selectedUser);
    console.log('this.cacheMessage', this.cacheMessage);
    
    const cache = this.cacheMessage[user.username];
    if(cache){
      this.messages = cache.message;
      this.page = cache.page;
      this.isLoading = false;
      return;
    }
    this.chatService.getMessage(this.selectedUser.username,this.page).subscribe({
       next: ({data}) => {
        this.messages = data.reverse();
        this.cacheMessage[user.username] = {page: this.page, message: this.messages};
        this.isNumberMessageOld = this.messages.length;
        this.isLoading = false;
        this.gotoBottom();
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

  loadOld(){
    if (this.isLoading || !this.hasMore) return;
    this.page++;
    this.isLoading = true;
    const el = this.chatMessagesContainer.nativeElement;
    const oldHeight = el.scrollHeight;
    this.chatService.getMessage(this.selectedUser?.username || '',this.page).subscribe({
      next: ({data}) => {
        const newMess = data.reverse();
        if(!newMess){
          this.hasMore = false;
        }else{
          this.messages = [...newMess,...this.messages];
          const username = this.selectedUser?.username;
          if(username)
          this.cacheMessage[username] = {page: this.page, message: this.messages};
          setTimeout(() => {
            const newHeight = el.scrollHeight;
            el.scrollTop = newHeight - oldHeight;
            this.showGoToBottom = true;
            this.isLoading = false;
          }, 200);
        }
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      }
      
    })

  }


  gotoBottom(){
    const el = this.chatMessagesContainer.nativeElement;
    el.scrollTop = el.scrollHeight;
    console.log('el.clientHeightel.clientHeight', el.clientHeight);
  }

  onScroll() {
    const el = this.chatMessagesContainer.nativeElement;
    this.showLoadOld = el.scrollTop < 120 && this.hasMore;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const shouldShow = distanceFromBottom > 500;
    if (shouldShow !== this.showGoToBottom) {
    this.showGoToBottom = shouldShow;
    }
  }




}
