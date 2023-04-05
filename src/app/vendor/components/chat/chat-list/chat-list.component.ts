import { ChatService } from 'src/app/common/chat/chat.service';
import { iVendorProfile } from './../../../../user/models/vendor.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  userId : string | undefined;
  user: iVendorProfile | undefined;
  users:  iVendorProfile[] | undefined; 
  sender!: string

  constructor(private _activatedRoute: ActivatedRoute, private _chatService: ChatService) { 
    this._activatedRoute.params.subscribe((params) => {
      this.userId = params['id'];
    })
  }

  ngOnInit(): void {
    this.connect();
    this.chatList();
  }
  connect(){
    if(this.userId){
      this._chatService.establishConnectionVendor(this.userId, 'vendor').subscribe((res) => {
        this.user = res.reciever;
      })
    }
  }
  chatList(){
    this._chatService.fetchChatListVendor().subscribe((res) => {
      this.users = res.chats
      this.sender = res.sender
      this._chatService.userAdd(res.sender)
    })
  }
  getUrl(id: string){
    return `vendor/chat/${{id}}`
  }

}
