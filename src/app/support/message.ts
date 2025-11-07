export interface User {
  id: number;
  username: string;
  lastMessage?: string;
  unreadCount?: number;
}

export interface Message {
  username: string;
  message: string;
  status: boolean;
  toAccount: string;
}