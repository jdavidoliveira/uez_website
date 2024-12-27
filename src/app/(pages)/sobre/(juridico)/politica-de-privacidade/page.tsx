import { Metadata } from "next"
import React from "react"
import { Paragrafozinho, Titulozinho } from "../components"

export const metadata: Metadata = {
  title: "Politica de Privacidade",
}

export default function PoliticaDePrivacidade() {
  return (
    <>
      <h1 className="mt-10 text-3xl font-bold">Política de Privacidade</h1>
      <div className="mx-auto my-10 flex w-10/12 flex-col gap-6 md:w-8/12">
        <div className="flex flex-col gap-2">
          <h2 className="font-light">Última atualização: 08/12/2024</h2>
          <p className="indent-4">
            <Titulozinho>1. Introdução</Titulozinho>
            Bem-vindo à UEZ-COMPANY. Esta política de privacidade descreve como coletamos, usamos, armazenamos e
            protegemos as informações pessoais dos nossos usuários. Ao utilizar nossos serviços, você concorda com as
            práticas descritas nesta política.
          </p>
        </div>
        <Titulozinho>2. Informações Coletadas</Titulozinho>
        <Paragrafozinho>
          Podemos coletar as seguintes informações pessoais de nossos usuários:
          <ul className="list-disc py-4">
            <li className="list-none">Informações de identificação, como nome, endereço, número de telefone e endereço de e-mail;</li>
            <li className="list-none">Informações de pagamento, quando necessário para transações financeiras;</li>
            <li className="list-none">Informações de localização, se você optar por compartilhá-las;</li>
            <li className="list-none">Informações de login, como nome de usuário e senha;</li>
            <li className="list-none">Informações sobre o perfil de usuário, como habilidades, experiência e preferências.</li>
          </ul>
        </Paragrafozinho>
        <Titulozinho>3. Uso das Informações</Titulozinho>
        <Paragrafozinho>
          Usamos as informações pessoais coletadas para os seguintes fins:
          <ul className="list-disc py-4">
            <li className="list-none">Facilitar a conexão entre uzers e clientes;</li>
            <li className="list-none">Processar transações e pagamentos;</li>
            <li className="list-none">Personalizar a experiência do usuário;</li>
            <li className="list-none">Cumprir obrigações legais e regulatórias;</li>
            <li className="list-none">Comunicar-se com os usuários sobre serviços, transações e atualizações;</li>
            <li className="list-none">Manter a segurança e a integridade de nossos sistemas e dados.</li>
          </ul>
        </Paragrafozinho>
        <Titulozinho>4. Compartilhamento de Informações</Titulozinho>
        <Paragrafozinho>
          Compartilhamos informações pessoais apenas nas seguintes circunstâncias:
          <ul className="list-disc py-4">
            <li className="list-none">
              Com prestadores de serviços que nos auxiliam na prestação de serviços, sujeitos a acordos de
              confidencialidade;
            </li>
            <li className="list-none">Com prestadores de serviços financeiros para processar transações;</li>
            <li className="list-none">Com outros usuários para facilitar a conexão entre prestadores de serviços e clientes;</li>
            <li className="list-none">Quando exigido por lei, regulamentação ou processo legal;</li>
            <li className="list-none">Para proteger os direitos, a segurança ou a propriedade da nossa empresa.</li>
          </ul>
        </Paragrafozinho>
        <Titulozinho>5. Segurança</Titulozinho>
        <Paragrafozinho>
          Nós implementamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado,
          uso indevido ou divulgação.
        </Paragrafozinho>
        <Titulozinho>6. Acesso e Controle das Suas Informações</Titulozinho>
        <Paragrafozinho>
          Você pode acessar e atualizar suas informações pessoais através da sua conta de usuário. Você também pode
          solicitar a exclusão de suas informações pessoais, sujeito a obrigações legais de retenção.
        </Paragrafozinho>
        <Titulozinho>7. Alterações na Política de Privacidade</Titulozinho>
        <Paragrafozinho>
          Reservamos o direito de modificar esta política de privacidade a qualquer momento. A versão mais recente
          estará sempre disponível em nosso site ou aplicativo.
        </Paragrafozinho>
        <Titulozinho>8. Contato</Titulozinho>
        <Paragrafozinho>
          Se você tiver alguma dúvida ou preocupação sobre nossa política de privacidade, entre em contato conosco em
          uezcompanylog@gmail.com ou por meio do nosso Whatsapp +55 21 97878-3261
        </Paragrafozinho>

      </div>
    </>
  )
}
