import Image from "next/image"
import React from "react"

interface StarRatingProps {
  rating: number
}

const Avaliacao: React.FC<StarRatingProps> = ({ rating }) => {
  // Arredonda a avaliação para o número inteiro mais próximo
  const roundedRating = Math.floor(rating)
  console.log(roundedRating)

  const stars = []

  // Adicione estrelas preenchidas
  for (let i = 0; i < roundedRating; i++) {
    stars.push(
      <Image
        key={`star-${i}`}
        src="/images/icons/estrela-inteira.png"
        alt="Estrela"
        width={20}
        height={20}
        className="w-4 text-yellow-500"
      />
    )
  }

  // Adicione estrelas vazias (se houver uma parte fracionária)
  if (rating !== roundedRating) {
    stars.push(
      <Image
        key={`star-${roundedRating}`}
        src="/images/icons/estrela-metade.png"
        alt="Estrela"
        width={20}
        height={20}
        className="w-4 text-yellow-500"
      />
    )
  }

  // Adicione estrelas vazias restantes
  for (let i = stars.length; i < 5; i++) {
    stars.push(
      <Image
        key={`star-${i}`}
        src="/images/icons/estrela-vazia.png"
        alt="Estrela"
        width={20}
        height={20}
        className="w-4 text-yellow-500"
      />
    )
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex space-x-1">{stars} </div>
      <span className="text-sm font-medium">{rating.toFixed(1)}/5</span>
    </div>
  )
}

export default Avaliacao
