import { ievent } from './../../models/event.model';
import { EventUploadService } from './../../services/event-upload.service';
import { iVendor } from './../../models/vendor.model';
import { VendorService } from './../../services/vendor.service';
import { Component, OnInit } from '@angular/core';
import { db, storage } from './../../../../firebase/firebase';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogActions,
} from '@angular/material/dialog';
import { ImageUploadComponent } from '../modal/image-upload/image-upload.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  selectedFile: File | undefined;
  img_url: string | undefined;
  vendorDetails: iVendor | undefined;
  events: ievent[] | undefined;
  totalEvents: number | undefined;

  constructor(
    private _vendorService: VendorService,
    private _eventService: EventUploadService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchVendorsAndEvents();
  }
  fetchVendorsAndEvents() {
    this._vendorService.fetchVendors().subscribe((res) => {
      this.vendorDetails = res.vendor;
    });
    this._eventService.fetchEvents().subscribe((res) => {
      this.events = res.events;
    });
  }
  imageSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.img_url = e.target.result;
      };
    }
  }
  async imageUpload() {
    if (this.img_url) {
      const random = String(Math.random() * 10);
      const imageRef = ref(storage, `vendor/${random}/`);
      await uploadString(imageRef, this.img_url, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        this._vendorService.profilePicUpload(downloadURL).subscribe((res) => {
          if (this.vendorDetails) {
            this.vendorDetails.image = res.url;
          }
        });
      });
    }
  }
  openImageModal() {
    this.matDialog.open(ImageUploadComponent, {
      data: {
        width: '350px',
      },
    });
  }
}
