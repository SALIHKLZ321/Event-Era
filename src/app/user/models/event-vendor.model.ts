import { iVendorProfile } from "./vendor.model"

export interface ievent{
    _id: string,
    title: string ,
    vendor: iVendorProfile,
    venue: string ,
    description: string ,
    price: number,
    slots: string ,
    date: string ,
    image_url: string
}