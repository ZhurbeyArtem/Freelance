export interface IRegistration {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string,
    userRole: string
}
export interface userSuccess {
    token: string
}