import { db,storage } from './../../../../firebase/firebase';
import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iEvent, ievent } from '../../models/event.model';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventUploadService } from '../../services/event-upload.service';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit{
  eventForm=new FormGroup({
    title: new FormControl(this.data.event.title,[Validators.required]),
    description: new FormControl(this.data.event.description,[Validators.required]),
    ticketPrice: new FormControl(this.data.event.price,[Validators.required]),
    venue: new FormControl(this.data.event.venue,[Validators.required]),
    date: new FormControl(this.data.event.date,[Validators.required]),
    slots: new FormControl(this.data.event.slots,[Validators.required]),
  })
  selectedFile: File|undefined;
  img_url: string = this.data.event.image_url
  constructor(private _eventService: EventUploadService, @Inject(MAT_DIALOG_DATA) public data: any, private _matDialog: MatDialog){
  }
  ngOnInit(){
    
  }
  imageSelected (event: any){
    this.selectedFile = event.target.files[0];
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e:any) => {
        this.img_url = e.target.result;
      }
    } 
  }
  async onSubmit(){
    if (this.eventForm.invalid) {
      Swal.fire('Fill all fields with valid values');
      return ;
    }
      if(this.selectedFile){
        const random = String(Math.random()*10)
        const imageRef = ref(storage, `events/${random}/`);
        await uploadString(imageRef, this.img_url, "data_url").then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          const form: iEvent = {
            _id:this.data.event._id,
            title: this.eventForm.controls.title.value,
            venue: this.eventForm.controls.venue.value,
            description: this.eventForm.controls.description.value,
            date: this.eventForm.controls.date.value,
            slots: this.eventForm.controls.slots.value,
            price: this.eventForm.controls.ticketPrice.value,
            image_url: downloadURL,
            sold: this.data.event.sold?this.data.event.sold: 0

          }
          this._eventService.eventUpdate(form).subscribe((res)=> {
            if(res.status == true){
              this._matDialog.closeAll()
            }
          })
      })
      }else{
        const form: iEvent = {
          _id:this.data.event._id,
          title: this.eventForm.controls.title.value,
          venue: this.eventForm.controls.venue.value,
          description: this.eventForm.controls.description.value,
          date: this.eventForm.controls.date.value,
          slots: this.eventForm.controls.slots.value,
          price: this.eventForm.controls.ticketPrice.value,
          image_url: this.img_url,
          sold: this.data.event.sold?this.data.event.sold: 0
        }
        this._eventService.eventUpdate(form).subscribe((res)=> {
          if(res.status == true){
            this._matDialog.closeAll()
          }
        })
      }
     
    }
    get submitForm(){
      return this.eventForm.controls
    }
  }



