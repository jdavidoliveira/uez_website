export default async function sendMessage(socket: any, message: any, chatId: string) {
  socket.emit("sendMessage", { chatId, message })
}
