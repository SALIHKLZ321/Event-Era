import { iVendorProfile } from '../../../models/vendor.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../../../common/chat/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  vendorId : string | undefined;
  userId!: string;
  vendor: iVendorProfile | undefined;
  vendors: iVendorProfile [] | undefined; 
  constructor(private _activatedRoute: ActivatedRoute, private _chatService: ChatService) {
    this._activatedRoute.params.subscribe((params) => {
      this.vendorId = params['id'];
    })
   }

  ngOnInit(): void {
    this.chatList();
  }
  
  chatList(){
    this._chatService.fetchChatList().subscribe((res) => {
      this.vendors = res.chats
      this.userId = res.sender;
    this._chatService.userAdd(res.sender)
    })
  }
}
