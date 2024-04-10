import api from "../lib/api"

export default async function sendNotification(type: string, content: string, id: string) {
  await api
    .post(`/notification/send/${id}`, {
      content: content,
      type: type,
    })
    .then((res) => console.log("Notificação enviada", res.data))
    .catch((err) => console.log("Erro ao enviar a notificação"))
}
