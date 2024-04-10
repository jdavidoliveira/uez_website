import Image from "next/image"

export default function Footer() {
    return (
        <footer className="bg-azulao flex justify-between p-11 ">
            <section className="flex flex-col gap-20">
                <div className="flex gap-24 items-center">
                    <Image src="/logoWhite.svg" width={183} alt="logo UEZ" height={120} />

                    <div className="flex flex-col text-center gap-4">
                        <a href="" className="text-white text-2xl font-semibold"> 
                            Empresa
                        </a>

                        <span className="text-white"> Sobre nós</span>
                    </div>
                </div>

                <div className="flex gap-8 ">
                    <a href="www.tiktok.com/@uezcompany" target="_blank">
                        <Image  src="/youtube.svg" width={50} height={50} alt="logo do Tiktok"/> 
                    </a>
                    <a href="https://www.youtube.com/@UezCompany" target="_blank">
                        <Image  src="/tiktok.svg" width={50} height={50} alt="logo do Youtube "/> 
                    </a>
                    <a href="https://www.instagram.com/uez_company/" target="_blank">
                        <Image  src="/insta.svg" width={50} height={50} alt="logo do Instagram"/> 
                    </a>
                    <a href="tps://www.facebook.com/uezco/" className="pt-[3px]" target="_blank">
                        <Image  src="/facebook.svg" width={50} height={50} alt="logo do Facebook "/> 
                    </a>
                    <a href="https://br.pinterest.com/uezcompany/" target="_blank">
                        <Image  src="/pinterest.svg" width={50} height={50} alt="logo do Pinterest"/> 
                    </a>
                </div>
            </section>


            <section className="flex flex-col items-center pt-5 gap-7">
                <h1 className="font-semibold text-white text-2xl">
                    Suporte
                </h1>

                <div className="flex gap-4">
                    <a href="" target="_blank">
                        <Image  src="/email.svg" width={50} height={50} alt="logo do Email"/> 
                    </a>

                    <a href="" target="_blank">
                        <Image  src="/zap.svg" width={50} height={50} alt="logo do Whastzap"/> 
                    </a>
                </div>
            </section>

            <section className="text-white text-end pt-5 flex flex-col gap-20">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl pb-3">
                        Jurídico
                    </h1>

                    <span className="font-light"> Termos de uso </span>
                    <span className="font-light"> Política de privacidade </span>
                </div>

                <h1>Copyright © 2024 UEZ-Company. All rights reserved.</h1>
            </section>
        </footer>
    )
}