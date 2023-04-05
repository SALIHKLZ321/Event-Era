import { iVendor } from "./vendor.model"

export interface ievent{
    title: string | null | undefined,
    venue: string | null | undefined,
    description: string | null | undefined,
    price: string | null | undefined,
    slots: string | null | undefined,
    date: string | null | undefined,
    image_url: string | null
}
export interface iEvent{
    _id: string ,
    title: string | null | undefined,
    venue: string | null | undefined,
    description: string | null | undefined,
    price: string | null | undefined,
    slots: string | null | undefined,
    date: string | null | undefined,
    image_url: string | null,
    sold: number| undefined
}
export interface iEventVendor{
    _id: string ,
    title: string | null | undefined,
    vendor: string,
    venue: string | null | undefined,
    description: string | null | undefined,
    price: string | null | undefined,
    slots: string | null | undefined,
    date: string | null | undefined,
    image_url: string | null,
    sold: number| undefined
}
