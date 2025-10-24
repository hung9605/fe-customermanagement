export interface User {
  id: number;
  username: string;
  lastMessage?: string;
}

export interface Message {
  from: string;
  text: string;
}