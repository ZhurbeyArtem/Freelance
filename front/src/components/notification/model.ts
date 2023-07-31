export interface notification {
    "id": number,
    "status": string,
    "message":string ,
    "userId": number,
    "jobId": number,
}


export interface getNotification {
    "page": number,
    'status': string
}

export interface updateNotification {
    "status" : string;
    "id": number
}

export interface addMark {
    "id": number,
    "mark": any
}

export interface getAllNotifications {
    notifications :[{
        notification_id: number
        notification_status: string
        notification_message: string
        notification_userId: number
        notification_jobId: number
        user_firstName: string
        user_email: string
        user_phoneNumber: string
        user_id:number
    }]
    ,
    count: number

}

export interface createNotification{
    "message": string,
    "userId": number,
    "jobId": number
}