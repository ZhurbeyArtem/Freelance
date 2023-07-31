import { jobBid } from "components/bid/model"

export interface ITags {
    id: number,
    name: string
}

export interface getJob { 
    "id": number,
    "title": string,
    "description": string,
    "hourlyRate": string,
    "duration": string,
    "englishLevel": string,
    "tags": string[],
    "userId": number,
    "bids": jobBid[]
}

