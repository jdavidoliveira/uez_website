export default interface Chat {
    _id: string, //id do chat
    uzerId: string,
    clienteId: string,
    createdAt: string
    messages: Messages[],

}

interface Messages {
    _id: string, //id do chat
    sendDate: string,
    sendHour: string,
    senderId: string
    content: string,
}