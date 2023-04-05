import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iVendorProfile } from '../user/models/vendor.model';
import { iChat } from './models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private _http: HttpClient) { }

  establishConnection(id: string, role: string){
    const obj = { recieverId: id, role }
    return this._http.post<{ connection: { _id: string }, reciever: iVendorProfile  }>(`${environment.apiUrl}/vendor/connect-user`, obj)
  }
  fetchChatList(){
    return this._http.get<{ chats: iVendorProfile[], sender: string }>(`${environment.apiUrl}/vendor/chat-list`)
  }
  chatHistory(id: string){
    return this._http.get<{ chats: iChat[]}>(`${ environment.apiUrl }/vendor/chat-history?id=${ id }`)
  }
  sendMessages(data: any){
    return this._http.post<{status: boolean}>(`${environment.apiUrl}/vendor/send-message`, data)
  }
}

