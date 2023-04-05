import { db,storage } from './../../../../firebase/firebase';
import Swal from 'sweetalert2';
import { EventUploadService } from './../../services/event-upload.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { ievent } from '../../models/event.model';


@Component({
  selector: 'app-event-host',
  templateUrl: './event-host.component.html',
  styleUrls: ['./event-host.component.css']
})
export class EventHostComponent implements OnInit {

  eventForm=new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    ticketPrice: new FormControl('',[Validators.required]),
    venue: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required]),
    slots: new FormControl('',[Validators.required]),
  })
  selectedFile: File|undefined;
  img_url!: string ;
  constructor(private _eventService: EventUploadService) { }
  ngOnInit(): void {
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
    if (!this.selectedFile) {
      Swal.fire('File not found');
    }else{
      if(this.img_url){
        const random = String(Math.random()*10)
        const imageRef = ref(storage, `events/${random}/`);
        await uploadString(imageRef, this.img_url, "data_url").then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          const form: ievent = {
            title: this.eventForm.controls.title.value,
            venue: this.eventForm.controls.venue.value,
            description: this.eventForm.controls.description.value,
            date: this.eventForm.controls.date.value,
            slots: this.eventForm.controls.slots.value,
            price: this.eventForm.controls.ticketPrice.value,
            image_url: downloadURL
          }
          this._eventService.eventUpload(form)
      })
      }
     
    }
  }
  get submitForm(){
    return this.eventForm.controls
  }

}
function moment(value: string | null): Date {
  throw new Error('Function not implemented.');
}

