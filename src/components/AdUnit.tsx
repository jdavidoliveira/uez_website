"use client"

import { useEffect } from "react"
import Script from "next/script"

declare global {
  interface Window {
    adsbygoogle: any
  }
}

type Props = {
  adClient: string
  adSlot: string
  adFormat?: string
  adStyle?: object
}

const AdUnit: React.FC<Props> = ({ adClient, adSlot, adFormat = "auto", adStyle }) => {
  useEffect(() => {
    // Após a renderização inicial, ativar o anúncio
    if (window && window.adsbygoogle) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        console.error("Erro ao inicializar adsbygoogle", e)
      }
    }
  }, [])

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...adStyle }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
      ></ins>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" strategy="afterInteractive" />
    </>
  )
}

export default AdUnit
