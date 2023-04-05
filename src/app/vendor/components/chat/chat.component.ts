import { ChatService } from './../../../common/chat/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public roomId : string | undefined;
  public messageText: string | undefined;
  public messageArray: {user: string, message: string}[] = [];

  public userList : any;
  public phone: string | undefined ;
  public currentUser: any ;
  public selectedUser: any;

  constructor(private _chatService: ChatService) { 
    this._chatService.getMessage().subscribe((data: {user: string, message:string}) => {
      this.messageArray.push(data)
    })
  }


  ngOnInit(): void {
  }
  selectedUserHandler(id: string) {
    this.selectedUser = this.selectedUser.find((user: { _id: string; }) => {
      user._id === id
    })
  }

}
