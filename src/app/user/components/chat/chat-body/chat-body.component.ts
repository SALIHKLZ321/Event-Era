import { iChat } from './../../../../common/models/chat.model';
import { iVendor } from './../../../../vendor/models/vendor.model';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../../../common/chat/chat.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.css']
})
export class ChatBodyComponent implements OnInit,AfterViewInit {
  vendorId! : string;
  userId!: string;
  vendorDetails: iVendor  | undefined;
  history: iChat[] | undefined;
  chatId!: string ;
  text: string | null | undefined;
  message = new FormGroup({
    text:new FormControl('',Validators.required)
  })
  constructor(private _activatedRoute: ActivatedRoute, private _chatService: ChatService) { 
    this._activatedRoute.params.subscribe((params) => {
      this.vendorId = params['id'];
    })
    ;
  }

  ngOnInit(): void {
    this.connect()?.subscribe((res) => {
      this.chatId = res.connection._id;
      this.userId = res.sender
      this._chatService.joinRoom(res.connection._id)
      this.messageHistory();
    })
    this._chatService.receiveMessage().subscribe({next:(message)=>{
      const obj = {sender: this.vendorId, receiver: this.userId, text: message ,chatId:this.chatId}
      this.history?.push(obj)
    }})
  }
  ngAfterViewInit(): void {
    
  }
  connect(){
    if(this.vendorId){
      return this._chatService.establishConnection(this.vendorId, 'user')
    };
    return;
  }
  messageHistory(){
      this._chatService.chatHistory(this.chatId).subscribe((res:any) => {
        console.log(res);
        
        
        this.history = res.chats;
        console.log(res.chats);
      })
    }
    sendMessage(){
      if(this.message.controls.text.value != null ){
        const text = this.message.controls.text.value;
        const msg = {sender: this.userId, receiver: this.vendorId, text , chatId:this.chatId}
        this.history?.push(msg)
        this._chatService.sendMessage(text , this.vendorId);
        const obj = { receiver: this.vendorId,chatId: this.chatId, data: text}
        this._chatService.sendMessages(obj).subscribe((res:any) => {
          console.log(res.status);
          this.text = null
        })
      }
  }
}

