export function infoByType(type: string) {
  let title = ""
  let photo = "/images/notifications/"

  switch (type) {
    case "uezerSendedQuote":
      photo += "uezerSendedQuote.png"
      title = "Você recebeu um orçamento!"
      break
    case "serviceCompleted":
      photo += "serviceCompleted.png"
      title = "Seu serviço foi finalizado!"
      break

    case "uezerMessageRequest":
      photo += "uezerMessageRequest.png"
      title = "Um Uezer quer conversar contigo!"
      break
    case "orderCreated":
      photo += "orderCreated.png"
      title = "Seu pedido foi lançado!"
      break
    case "userBan":
      photo += "userBan.png"
      title = "Infelizmente você foi banido."
      break
    case "congratsForSignup":
      photo += "congratsForSignup.png"
      title = "Parabéns! Agora você é um de nós!"
      break
    case "clientMessageRequest":
      photo += "clientMessageRequest.png"
      title = "Um Cliente quer conversar contigo!"
      break
    case "quoteAccepted":
      photo += "quoteAccepted.png"
      title = "Seu orçamento foi aceito!"
      break
    case "quoteDeclined":
      photo += "quoteDeclined.png"
      title = "Seu orçamento foi negado!"
      break
    case "serviceRated":
      photo += "serviceRated.png"
      title = "Seu serviço foi avaliado!"
      break
    case "errorOcurred":
      photo += "errorOcurred.png"
      title = "Houve algum erro no seu serviço!"
      break
    default:
      photo += "notification.png"
      title = "notification"
  }

  return { title, photo }
}
