import type { Metadata } from "next"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer/Footer"
import ScrollToTop from "@/components/sections/ScrollToTop"

export const metadata: Metadata = {
  title: {
    template: "%s | Uez Company",
    default: "Uez Company",
  },
  description: "Surgiu algum problema e você precisa de ajuda? Então bem-vindo á Uez!",
}

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <ScrollToTop />
      {children}
      {/* <Link
          title="SAC"
          href="https://api.whatsapp.com/send?phone=5521978783261&text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20como%20funciona%20a%20UEZ"
          target="_blank"
          className="fixed z-50 sm:bottom-8 bottom-6 bg-emerald-500 right-4 rounded-full sm:w-14 sm:h-14 w-10 h-10 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer animate-float"
        >
          <Phone color="white" size={30} className="w-1/2 sm:w-8/12" />
        </Link> */}
      <Footer />
    </>
  )
}
