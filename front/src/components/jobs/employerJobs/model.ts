export interface jobs {
    "id": number,
    "title": string,
    "description": string,
    "hourlyRate": string,
    "duration": string,
    "englishLevel": string,
    "tags": string[],
    "userId": number,
}

export interface createJob {
    "title": string,
    "description": string,
    "hourlyRate": string,
    "duration": string,
    "englishLevel": string,
    "tags": string[],
}

export interface listResponse<T> {
    listJobs: T[],
    totalJobs: number
}

export interface listJobs {
    page: number,
    tags: string[]
}