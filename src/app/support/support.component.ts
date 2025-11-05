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

  constructor(private chatService: ChatService
             ,private notiService: NotiService
             ,private messageService: MessageService
  ){

  }

  ngOnInit() {
    // Giả lập dữ liệu người dùng
    // this.users = [
    //   { id: 1, username: 'Nguyen Van A', lastMessage: 'Em cần hỗ trợ...' },
    //   { id: 2, username: 'Le Thi B', lastMessage: 'Cảm ơn ạ!' },
    //   { id: 3, username: 'Tran Van C', lastMessage: 'Lỗi đăng nhập rồi anh ơi.' },
    //   { id: 4, username: 'Nguyen Van A', lastMessage: 'Em cần hỗ trợ...' },
    //   { id: 5, username: 'Le Thi B', lastMessage: 'Cảm ơn ạ!' },
    //   { id: 6, username: 'Tran Van C', lastMessage: 'Lỗi đăng nhập rồi anh ơi.' },
    //   { id: 7, username: 'Nguyen Van A', lastMessage: 'Em cần hỗ trợ...' },
    //   { id: 8, username: 'Le Thi B', lastMessage: 'Cảm ơn ạ!' },
    //   { id: 9, username: 'Tran Van C', lastMessage: 'Lỗi đăng nhập rồi anh ơi.' },
    // ];



    this.getListUser();

    this.notiService.subscribeUserNotification('/user/queue/message',(msg: Message) => {
      this.messageService.add({
        severity: 'info',
        summary: msg.username,
        detail: msg.message || 'Bạn có thông báo mới!',
        life: 1000  
      });
      if(msg.username == this.selectedUser?.username){
        this.messages.push(msg);
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
    this.selectedUser = user;
    this.chatService.getMessage(this.selectedUser.username,0).subscribe({
       next: ({data}) => {this.messages = data.reverse()}
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
      this.newMessage = '';
  }

ngOnDestroy(): void {
  
}

ngAfterViewChecked(): void {
  this.scrollToBottom();
}

 private scrollToBottom(): void {
    try {
      const el = this.chatMessagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (err) {}
  }

}
