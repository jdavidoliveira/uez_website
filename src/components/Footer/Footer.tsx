import Image from 'next/image';
import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer_content}>
                <div className={styles.footer_cards}>
                    <div className={styles.footer_card}>
                        <Image src="/logo.svg" alt="Logo UEZ" width={60} height={60} className={styles.footer_logo} />
                    </div>
                    <div className={styles.footer_card}>
                        <h2>Recursos</h2>
                        <Link href="/sobre">Aplicação</Link>
                        <Link href="https://github.com/UezCompany" target='_blank'>Documentação</Link>
                    </div>
                    <div className={styles.footer_card}>
                        <h2>Produtos</h2>
                        <Link href="/sobre">Serviços</Link>
                        <Link href="/sobre">Categorias</Link>
                    </div>
                    <div className={styles.footer_card}>
                        <h2>Empresa</h2>
                        <Link href="/sobre">Sobre nós</Link>
                    </div>
                    <div className={styles.footer_card}>
                        <h2>Social</h2>
                        <div className={styles.footer_social_content}>
                            <Link href="https://www.instagram.com/uez_company/" target='_blank'><Image src="/images/icons/instagram-icons8.svg" alt="Instagram"  width={16} height={16} /></Link>
                            <Link href="https://www.youtube.com/channel/UCxR_EP2zp4X49229z833F-A" target='_blank'><Image src="/images/icons/youtube-icons8.svg" alt="Youtube" width={16} height={16} /></Link>
                        </div>
                    </div>
                    <div className={styles.footer_card}>
                        <h2>Jurídico</h2>
                        <Link href="/sobre">Termos de Uso</Link>
                        <Link href="/sobre">Política de privacidade</Link>
                    </div>
                </div>
                <div><span className={styles.footer_copyright}>Copyright © 2023 UEZ-Company. All rights reserved.</span></div>
            </div>
        </footer>
    )
}