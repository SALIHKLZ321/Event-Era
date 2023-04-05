import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/common/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  vendorId : string | undefined;
  constructor(private _activatedRoute: ActivatedRoute,private _socketService: ChatService) { 
    if(this._activatedRoute.params){
    this._activatedRoute.params.subscribe((params) => {
      this.vendorId = params['id'];
    })
  }
  }
  

  ngOnInit(): void {

  }


}
