import { VendorService } from '../../../services/vendor.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { db,storage } from '../../../../../firebase/firebase';
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import Swal from 'sweetalert2'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  image: string | undefined;
  selectedFile: File | undefined;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private _vendorService: VendorService, private matDialog: MatDialog) { }

  ngOnInit(): void {
  }
 imageSelect(event: any){
  this.selectedFile = event.target.files[0];
  if (event.target.files) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target?.files[0]);
    reader.onload = (e:any) => {
      this.image = e.target.result;
    }
  } 
 }
 async onSave(){
  if (!this.selectedFile){
    Swal.fire('File Not Found')
  }else{
    const random = `${String(Math.random()*10)}${String(Date.now)}`
        const imageRef = ref(storage, `vendor/${random}/`);
        if (this.image){
        await uploadString(imageRef, this.image, "data_url").then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          this._vendorService.profilePicUpload(downloadURL).subscribe((res)=>{

          })
          this.matDialog.closeAll()
        })
      }
  }
 }

}
