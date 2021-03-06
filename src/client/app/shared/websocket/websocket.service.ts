import {Injectable} from "@angular/core";
import {Config} from "../config/env.config";
@Injectable()
export class WebSocketService {
  private socket: WebSocket;
  connect(username: string){
    if(typeof this.socket !== 'undefined') {
      return;
    }
    this.socket = new WebSocket(`ws://${Config.BASE}/ws/join?uname=${username}&tkn=${localStorage.getItem("id_token")}`);
  }
   handle(callback:any){
    this.socket.onmessage =callback;
  }
}
