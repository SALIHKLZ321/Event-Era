import { iUser } from './user.model'
export interface iTicket{
    _id: string,
    user: iUser,
    quantity: number,
    total: number,
}