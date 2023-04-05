import { iVendorProfile } from './../../user/models/vendor.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { iChat } from '../models/chat.model';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private socket:Socket,private _http:HttpClient){}
 
   joinRoom(data:any){
    this.socket.emit('room-create', data);
   }
   userAdd(id: string){
    this.socket.emit('new-user-add',id)
   }

   sendMessage(data: string,id: string ){
    return this.socket.emit('send-message',{data, receiverId: id})
   }
   receiveMessage():Observable<string>{
    return this.socket.fromEvent<string>('receive-message')
   }
   
   getMessage(): Observable<any> {
    return new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data:any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    })
   }
   establishConnection(id: string, role: string){
    const obj = { recieverId: id, role }
    return this._http.post<{ connection: { _id: string }, reciever: iVendorProfile , sender: string }>(`${environment.apiUrl}/user/connect-vendor`, obj)
  }
  establishConnectionVendor(id: string, role: string){
    const obj = { recieverId: id, role }
    return this._http.post<{ connection: { _id: string }, reciever: iVendorProfile  }>(`${environment.apiUrl}/vendor/connect-user`, obj)
  }

  fetchChatList(){
    return this._http.get<{ chats: iVendorProfile[], sender: string }>(`${environment.apiUrl}/user/chat-list`)
  }
  chatHistory(id: string){
    return this._http.get<{ chats: iChat[]}>(`${ environment.apiUrl }/user/chat-history?id=${ id }`)
  }
  sendMessages(data: any){
    return this._http.post<{status: boolean}>(`${environment.apiUrl}/user/send-message`, data)
  }
  fetchChatListVendor(){
    return this._http.get<{ chats: iVendorProfile[], sender: string }>(`${environment.apiUrl}/vendor/chat-list`)
  }
  chatHistoryVendor(id: string){
    return this._http.get<{ chats: iChat[], sender: string}>(`${ environment.apiUrl }/vendor/chat-history?id=${ id }`)
  }
  sendMessagesVendor(data: any){
    return this._http.post<{status: boolean}>(`${environment.apiUrl}/vendor/send-message`, data)
  }
   
}
