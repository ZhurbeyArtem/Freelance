export interface bid {
    "Bid_id": number,
    "Bid_description": string,
    "Bid_price": string,
    "Bid_userId": number,
    "Bid_jobId": number,
    "Bid_isApproved": boolean,
}

export interface getAllBids {
    "Bid_id": number,
    "Bid_description": string,
    "Bid_attachment": string,
    "Bid_price": string,
    "Bid_userId": number,
    "Bid_jobId": number,
    "Bid_isApproved": boolean,
    "user_firstName": string,
    "user_email": string,
    "user_phoneNumber": string,
    "total": number,
    "rating": number
}
export interface jobBid {
    "id": number,
    "description": string,
    "price": string,
    "isApproved": string,
    "userId": number,
    "jobId": number,
}

export interface approveBid {
    id: number,
    jobId: number
}