export default interface Notification {
    _id: string,
    type: "budget-received" | string,
    content: string,
    meta: Date,
    _idUser: string,
    readed: boolean,
}

