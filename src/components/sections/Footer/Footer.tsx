import Image from "next/image"
import styles from "./Footer.module.css"
import Link from "next/link"
import AdUnit from "@/components/AdUnit"

const version = "0.1.2 (beta)"

export default function Footer() {
  return (
    <footer className={styles.footer + " relative"}>
      <div className={styles.footer_content}>
        <span className="absolute bottom-0 right-2 text-sm">version: {version}</span>
        <div className={styles.footer_cards}>
          <div className={styles.footer_card}>
            <Image src="/logo/full-logo.svg" alt="Logo UEZ" width={60} height={60} className={styles.footer_logo} />
            <div className={styles.footer_social_content}>
              <Link href="https://www.instagram.com/uez_company/" target="_blank">
                <Image
                  src="/social/instagram.png"
                  className="brightness-[100]"
                  alt="Instagram"
                  width={64}
                  height={64}
                />
              </Link>
              <Link href="https://www.facebook.com/uezco/" target="_blank">
                <Image src="/social/facebook.png" className="brightness-[100]" alt="Facebook" width={64} height={64} />
              </Link>
              <Link href="https://www.youtube.com/@UezCompany" target="_blank">
                <Image src="/social/youtube.png" className="brightness-[100]" alt="Youtube" width={64} height={64} />
              </Link>
              <Link href="https://www.tiktok.com/@uezcompany" target="_blank">
                <Image src="/social/tiktok.png" className="brightness-[100]" alt="Tik Tok" width={64} height={64} />
              </Link>
              <Link href="https://br.pinterest.com/uezcompany/" target="_blank">
                <Image
                  src="/social/pinterest.png"
                  className="brightness-[100]"
                  alt="Pinterest"
                  width={64}
                  height={64}
                />
              </Link>
            </div>
          </div>
          <div className={styles.footer_card}>
            <h2>Empresa</h2>
            <Link href="/sobre">Sobre nós</Link>
          </div>
          <div className={styles.footer_card}>
            <h2>Suporte</h2>
            <div className={styles.footer_social_content}>
              <Link href="mailto:suporte@uezcompany.com" target="_blank">
                <Image src="/social/zap.svg" alt="Email" width={16} height={16} />
              </Link>
              <Link
                href="https://api.whatsapp.com/send?phone=5521978783261&text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20como%20funciona%20a%20UEZ"
                target="_blank"
              >
                <Image src="/social/email.svg" alt="Whatsapp" width={16} height={16} />
              </Link>
            </div>
          </div>
          <div className={styles.footer_card}>
            <h2>Jurídico</h2>
            <Link href="/sobre/termos-de-uso">Termos de Uso</Link>
            <Link href="/sobre/politica-de-privacidade">Política de privacidade</Link>
          </div>
        </div>
        <div>
          <span className={styles.footer_copyright}>UEZ Company - 2024</span>
        </div>
      </div>
    </footer>
  )
}
