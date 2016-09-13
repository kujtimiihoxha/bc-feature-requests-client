
export class Notification {
  type: number;
  user: string;
  timestamp: number;
  content:{
    details:{
      user_id: string,
      description: string,
      type: string,
      icon: string,
      created_at: string
    }
  };
}

export class SocketMessage {
  type:number;
  data:string;
}
