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
          <h2 className="font-light">Última atualização: 08/05/2024</h2>
          <p className="indent-4">
            Bem-vindo à UEZ-COMPANY. Esta política de privacidade descreve como coletamos, usamos, armazenamos e
            protegemos as informações pessoais dos nossos usuários. Ao utilizar nossos serviços, você concorda com as
            práticas descritas nesta política.
          </p>
        </div>
        <Titulozinho>1. Informações Coletadas</Titulozinho>
        <Paragrafozinho>
          Podemos coletar as seguintes informações pessoais de nossos usuários:
          <ul className="list-disc px-10 py-4">
            <li>Informações de identificação, como nome, endereço, número de telefone e endereço de e-mail;</li>
            <li>Informações de pagamento, quando necessário para transações financeiras;</li>
            <li>Informações de localização, se você optar por compartilhá-las;</li>
            <li>Informações de login, como nome de usuário e senha;</li>
            <li>Informações sobre o perfil de usuário, como habilidades, experiência e preferências.</li>
          </ul>
        </Paragrafozinho>
        <Titulozinho>2. Uso das Informações</Titulozinho>
        <Paragrafozinho>
          Usamos as informações pessoais coletadas para os seguintes fins:
          <ul className="list-disc px-10 py-4">
            <li>Facilitar a conexão entre uzers e clientes;</li>
            <li>Processar transações e pagamentos;</li>
            <li>Personalizar a experiência do usuário;</li>
            <li>Cumprir obrigações legais e regulatórias;</li>
            <li>Comunicar-se com os usuários sobre serviços, transações e atualizações;</li>
            <li>Manter a segurança e a integridade de nossos sistemas e dados.</li>
          </ul>
        </Paragrafozinho>
        <Titulozinho>3. Compartilhamento de Informações</Titulozinho>
        <Paragrafozinho>
          Compartilhamos informações pessoais apenas nas seguintes circunstâncias:
          <ul className="list-disc px-10 py-4">
            <li>
              Com prestadores de serviços que nos auxiliam na prestação de serviços, sujeitos a acordos de
              confidencialidade;
            </li>
            <li>Com prestadores de serviços financeiros para processar transações;</li>
            <li>Com outros usuários para facilitar a conexão entre prestadores de serviços e clientes;</li>
            <li>Quando exigido por lei, regulamentação ou processo legal;</li>
            <li>Para proteger os direitos, a segurança ou a propriedade da nossa empresa.</li>
          </ul>
        </Paragrafozinho>
        <Titulozinho>4. Segurança</Titulozinho>
        <Paragrafozinho>
          Nós implementamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado,
          uso indevido ou divulgação.
        </Paragrafozinho>
        <Titulozinho>5. Acesso e Controle das Suas Informações</Titulozinho>
        <Paragrafozinho>
          Você pode acessar e atualizar suas informações pessoais através da sua conta de usuário. Você também pode
          solicitar a exclusão de suas informações pessoais, sujeito a obrigações legais de retenção.
        </Paragrafozinho>
        <Titulozinho>6. Alterações na Política de Privacidade</Titulozinho>
        <Paragrafozinho>
          Reservamos o direito de modificar esta política de privacidade a qualquer momento. A versão mais recente
          estará sempre disponível em nosso site ou aplicativo.
        </Paragrafozinho>
        <Titulozinho>7. Contato</Titulozinho>
        <Paragrafozinho>
          Se você tiver alguma dúvida ou preocupação sobre nossa política de privacidade, entre em contato conosco em
          uezcompanylog@gmail.com.
        </Paragrafozinho>
        <Paragrafozinho>Ou por meio do nosso Whatsapp +55 21 97878-3261</Paragrafozinho>
        <Paragrafozinho>Obrigado por escolher a UEZ-Company!</Paragrafozinho>
      </div>
    </>
  )
}
