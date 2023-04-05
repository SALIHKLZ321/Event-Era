import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../../../common/chat/chat.service';
import { iChat } from '../../../../common/models/chat.model';
import { iVendorProfile } from './../../../../user/models/vendor.model';

@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.css']
})
export class ChatBodyComponent implements OnInit {
  userId ! : string ;
  vendorId! : string;
  userDetails: iVendorProfile  | undefined;
  history: iChat[] | undefined;
  chatId!: string ;
  message = new FormGroup({
    text:new FormControl('',Validators.required)
  })
  constructor(private _activatedRoute: ActivatedRoute, private _chatService: ChatService) { 
    this._activatedRoute.params.subscribe((params) => {
      this.userId = params['id'];
    })
  }

  ngOnInit(): void {
    this.connect()?.subscribe((res) => {
      this.chatId = res.connection._id
      this._chatService.joinRoom(res.connection._id)
      this.messageHistory();
    })
    this._chatService.receiveMessage().subscribe((message)=> {
      console.log(this.vendorId,'vendor', this.userId ,'user');
      
      const obj = {sender: this.userId, receiver: this.vendorId, text: message ,chatId:this.chatId}
      this.history?.push(obj)
    })
  }
  connect(){
    if(this.userId){
      return this._chatService.establishConnectionVendor(this.userId, 'vendor')
    };
    return;
  }
  messageHistory(){
    if(this.chatId){
      this._chatService.chatHistoryVendor(this.chatId).subscribe((res) => {
        this.history = res.chats;
        this.vendorId = res.sender
      })
    }
  }
  sendMessage(){
    if(this.message.controls.text.value != null){
      
      const text = this.message.controls.text.value;
      const msg = {sender: this.vendorId, receiver: this.userId, text , chatId:this.chatId}
        this.history?.push(msg)
      const obj = { receiver: this.userId,chatId: this.chatId, data: text}
      this._chatService.sendMessage(text , this.userId);
  
      this._chatService.sendMessagesVendor(obj).subscribe((res) => {
        console.log(res.status);
      })
    }
  }

}
