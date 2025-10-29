import { Component, OnInit } from '@angular/core';
import { Message, User } from './message';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent implements OnInit {
 users: User[] = [];
  selectedUser?: User;
  messages: Message[] = [];
  newMessage: string = '';

  ngOnInit() {
    // Giả lập dữ liệu người dùng
    this.users = [
      { id: 1, username: 'Nguyen Van A', lastMessage: 'Em cần hỗ trợ...' },
      { id: 2, username: 'Le Thi B', lastMessage: 'Cảm ơn ạ!' },
      { id: 3, username: 'Tran Van C', lastMessage: 'Lỗi đăng nhập rồi anh ơi.' },
      { id: 4, username: 'Nguyen Van A', lastMessage: 'Em cần hỗ trợ...' },
      { id: 5, username: 'Le Thi B', lastMessage: 'Cảm ơn ạ!' },
      { id: 6, username: 'Tran Van C', lastMessage: 'Lỗi đăng nhập rồi anh ơi.' },
      { id: 7, username: 'Nguyen Van A', lastMessage: 'Em cần hỗ trợ...' },
      { id: 8, username: 'Le Thi B', lastMessage: 'Cảm ơn ạ!' },
      { id: 9, username: 'Tran Van C', lastMessage: 'Lỗi đăng nhập rồi anh ơi.' },
    ];
  }

  selectUser(user: User) {
    this.selectedUser = user;
    // Giả lập load tin nhắn từ backend
    this.messages = [
      { from: user.username, text: 'Chào anh, em cần hỗ trợ' },
      { from: 'Support', text: 'Chào bạn, mình có thể giúp gì cho bạn?' },
    ];
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    this.messages.push({ from: 'Support', text: this.newMessage });
    this.newMessage = '';

    // TODO: gửi message qua service websocket hoặc REST API
  }
}
