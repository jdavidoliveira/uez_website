export default interface Chat {
    _id: string, //id do chat
    uzerId: string,
    uzerService: string,
    clienteId: string,
    createdAt: string
    messages: Messages[],
    photo: string
    clienteName: string
    uzerName: string
}

export interface Messages {
    sendDate: string,
    sendHour: string,
    senderId: string
    content: string,
    type: 'text' | 'image' | 'budget'
    _idPedido: string
}