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
  lastMessageCount = 0;
  isSend = false;
  isLoad = true;
  page = 0;
  isLoading: boolean = true;
  showGoToBottom = false;
  hasMore = true;
  showLoadOld = false;
  constructor( private socketService: NotiService
              ,private messageService: MessageService
              ,private chatService: ChatService
            ){}

  ngOnInit(): void {
    this.username = localStorage.getItem('user_name') || '';
    if(this.username != 'tuannd'){
    this.loadInit();
    this.socketService.subscribeUserNotification('/user/queue/message',(msg: any) => {
      this.messageService.add({
        severity: 'info',
        summary: msg.username,
        detail: msg.message || 'Bạn có thông báo mới!',
        life: 1000  
      });
      this.messages.push({username:msg.username,message:msg.message});
      this.scrollIfNewMessage();
    });
  }
  }

  loadInit(){
  if(!this.username){
      this.username = localStorage.getItem('user_name') || '';
  }
  this.chatService.getMessage(this.username,this.page).subscribe({
      next: ({data}) => {this.messages = data.reverse();
        this.isLoading = false;
        setTimeout(() => {
          this.scrollToBottom();
        });
      },error: err => {console.log(err);this.isLoading = false;}
   })
  }

  getMessage(){
    if(!this.username){
      this.username = localStorage.getItem('user_name') || '';
    }
    this.chatService.getMessage(this.username || '',0).subscribe({
       next: ({data}) => {this.messages = data.reverse();
        this.scrollToBottom();
       }
      ,error: err => console.log(err)
    });

  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    this.messages.push({username : localStorage.getItem('user_name') || '',message: this.newMessage });
    const userMessage = this.newMessage;
    this.newMessage = '';
    this.socketService.sendMessage('/app/private.sendMessage', {
      username: localStorage.getItem('user_name'),
      message: userMessage
    });
    this.isSend = true;
  }

  ngOnDestroy(): void {
    
  }

  ngAfterViewChecked() {
       if(this.isSend){
          this.scrollToBottom();
          this.isSend = false;
       }

       if(this.isLoad){
        this.scrollToBottom();
        this.isLoad = false;
       }
      
  }

  private scrollToBottom(): void {
    try {
      const el = this.chatMessagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (err) {}
  }

  onScroll() {
    const el = this.chatMessagesContainer.nativeElement;
    this.showLoadOld = el.scrollTop < 120 && this.hasMore;
    // Nếu cách đáy > 300px => hiện nút "Go to Bottom"
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    this.showGoToBottom = distanceFromBottom > 300;
  }

  private scrollIfNewMessage() {
    if (this.messages.length > this.lastMessageCount) {
      this.lastMessageCount = this.messages.length;
        const el = this.chatMessagesContainer.nativeElement;
      if(!(el.scrollHeight - el.scrollTop - el.clientHeight > 250))
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  show(){
    this.visible = true;
    this.getMessage();
  }

  loadMore(){

  }

  gotoBottom(){
    const el = this.chatMessagesContainer.nativeElement;
    el.scrollTop = el.scrollHeight;
  }

  loadOld(){
    if (this.isLoading || !this.hasMore) return;
    this.isLoading = true;
    const el = this.chatMessagesContainer.nativeElement;
    const oldHeight = el.scrollHeight;
    this.page ++;
    this.chatService.getMessage(this.username, this.page).subscribe({
      next: ({data}) => {
        const newMess = data.reverse();
        if(!newMess || newMess.length == 0)
          this.hasMore = false;
        else{
          this.messages = [...newMess,...this.messages];
          setTimeout(() => {
            const newHeight = el.scrollHeight;
            el.scrollTop = newHeight - oldHeight;
            this.showGoToBottom = true;
            this.isLoading = false;
          }, 500);
        }
      
      }
      ,error: err => console.log(err)
      
    })
  }

}
