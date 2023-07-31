export interface tags {
    id: number,
    name: string
}

export interface futureJob {
    "title": string,
    "description": string,
    "hourlyRate": string,
    "duration": string,
    "englishLevel": string,
    "tags": string[],
}

export interface form<T>{
    "job": T,
    "suffix": string,
}