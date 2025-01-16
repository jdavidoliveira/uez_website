import Image from "next/image"
import React from "react"

interface StarRatingProps {
  rating: number
  size?: number // Tamanho das estrelas, padrão 20px
  filledStarSrc?: string // Imagem da estrela cheia, padrão "/images/icons/estrela-inteira.png"
  halfStarSrc?: string // Imagem da estrela meia cheia, padrão "/images/icons/estrela-metade.png"
  emptyStarSrc?: string // Imagem da estrela vazia, padrão "/images/icons/estrela-vazia.png"
  className?: string // Classe CSS extra para customização
  showStars?: boolean // Exibir estrelas? (default: true)
  showRating?: boolean // Exibir nota? (default: true)
}

const Rating: React.FC<StarRatingProps> = ({
  rating,
  size = 20,
  filledStarSrc = "/images/icons/estrela-inteira.png",
  halfStarSrc = "/images/icons/estrela-metade.png",
  emptyStarSrc = "/images/icons/estrela-vazia.png",
  className = "",
  showStars = true,
  showRating = true,
}) => {
  const roundedRating = Math.floor(rating)
  const stars = []

  // Adiciona as estrelas preenchidas
  for (let i = 0; i < roundedRating; i++) {
    stars.push(
      <Image
        key={`star-${i}`}
        src={filledStarSrc}
        alt="Estrela cheia"
        width={size}
        height={size}
        className={className}
      />,
    )
  }

  // Adiciona uma estrela meia cheia, se necessário
  if (rating !== roundedRating) {
    stars.push(
      <Image
        key={`star-${roundedRating}`}
        src={halfStarSrc}
        alt="Estrela meia cheia"
        width={size}
        height={size}
        className={className}
      />,
    )
  }

  // Preenche as estrelas restantes com estrelas vazias
  for (let i = stars.length; i < 5; i++) {
    stars.push(
      <Image
        key={`star-${i}`}
        src={emptyStarSrc}
        alt="Estrela vazia"
        width={size}
        height={size}
        className={className}
      />,
    )
  }

  return (
    <div className="flex items-center gap-2">
      {showStars && <div className="flex space-x-1">{stars}</div>}
      {showRating && <span className="text-sm font-semibold">{rating.toFixed(1)}/5</span>}
    </div>
  )
}

export default Rating
