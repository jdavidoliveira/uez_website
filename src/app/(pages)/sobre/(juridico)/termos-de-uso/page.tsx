import { Metadata } from "next"
import React from "react"
import { Paragrafozinho, Titulozinho } from "../layout"

export const metadata: Metadata = {
  title: "Termos de Uso",
}

export default function TermosDeUso() {
  return (
    <>
      <h1 className="text-3xl font-bold mt-10">Termos de Uso</h1>
      <div className="md:w-8/12 w-10/12 flex flex-col gap-6 mx-auto my-10">
        <div className="flex flex-col gap-2">
          <h2 className="font-light">Última atualização: 08/05/2024</h2>
          <p className="indent-4">
            Bem-vindo(a) à UEZ-Company. Antes de utilizar nossos serviços, leia atentamente os seguintes termos e
            condições. Ao acessar ou utilizar nossos serviços, você concorda em obedecer a estes termos. Se você não
            concordar com os termos a seguir, não use nossos serviços.
          </p>
        </div>
        <Titulozinho>1. Descrição dos Serviços</Titulozinho>
        <Paragrafozinho>
          A UEZ-Company é uma empresa que tem o objetivo de facilitar a sua vida, te ajudando a encontrar profissionais
          que possam realizar algum serviço para você ou conseguir mais clientes.
        </Paragrafozinho>
        <Titulozinho>2. Aceitação dos Usuários</Titulozinho>
        <Paragrafozinho>
          Você concorda em utilizar nossos serviços de forma ética, respeitando os direitos de terceiros e cumprindo
          todas as leis e regulamentos aplicáveis. Você deve:
          <ul className="list-disc px-10 py-4">
            <li>Fornecer informações verdadeiras e confiáveis; </li>
            <li>Não realizar atividades ilegais ou prejudiciais; </li>
            <li>Respeitar direitos autorais, marcas registradas ou outros direitos de propriedade intelectual; </li>
            <li>Não tentar acessar indevidamente sistemas ou informações não autorizadas;</li>
            <li>Não enviar spam ou outras comunicações não solicitadas.</li>
          </ul>
        </Paragrafozinho>
        <Titulozinho>3. Papel da Nossa Empresa</Titulozinho>
        <Paragrafozinho>
          Entenda que a nossa empresa atua como intermediária entre os prestadores de serviços e os clientes. Não somos
          responsáveis pelos serviços prestados ou contratados pelos usuários. Nós não garantimos a qualidade, segurança
          ou legalidade dos serviços.
        </Paragrafozinho>
        <Titulozinho>4. Pagamentos</Titulozinho>
        <Paragrafozinho>
          As transações financeiras, incluindo pagamentos por serviços, são intermediadas pela nossa plataforma entre os
          prestadores de serviços e os clientes. Nossa empresa facilita essas transações, mas não é responsável por
          problemas de pagamento que ocorram fora de nossa plataforma.
        </Paragrafozinho>
        <Titulozinho>5. Privacidade e Segurança</Titulozinho>
        <Paragrafozinho>
          Nossa política de privacidade descreve como coletamos, usamos e protegemos suas informações pessoais. Ao usar
          nossos serviços, você concorda com nossa política de privacidade.
        </Paragrafozinho>
        <Titulozinho>6. Isenção de Responsabilidade</Titulozinho>
        <Paragrafozinho>
          Nossa empresa não é responsável por quaisquer perdas, danos ou prejuízos decorrentes do uso de nossos
          serviços. Você usa nossos serviços, por sua própria conta e risco.
        </Paragrafozinho>
        <Titulozinho>7. Modificações dos Termos de Uso</Titulozinho>
        <Paragrafozinho>
          Reservamos o direito de modificar estes termos a qualquer momento. A versão mais recente dos termos estará
          sempre disponível em nosso site. Revise os periodicamente para se manter informado das mudanças.
        </Paragrafozinho>
        <Titulozinho>8. Lei Aplicável</Titulozinho>
        <Paragrafozinho>Estes termos são regidos e interpretados de acordo com as leis do Brasil.</Paragrafozinho>
        <Titulozinho>9. Contato</Titulozinho>
        <Paragrafozinho>
          Se você tiver alguma dúvida ou preocupação sobre estes termos, entre em contato conosco por meio de nosso
          e-mail uezcompanylog@gmail.com.
        </Paragrafozinho>
        <Paragrafozinho>Ou por meio do nosso Whatsapp +55 21 97878-3261</Paragrafozinho>
        <Paragrafozinho>
          Ao continuar a usar nossos serviços, você concorda com estes termos de uso. Obrigado por escolher a
          UEZ-Company!
        </Paragrafozinho>
      </div>
    </>
  )
}
