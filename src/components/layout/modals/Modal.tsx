interface ModalProps {
  message: string
  handleClick: () => void
  noButton?: boolean
}

export default function Modal({ message, handleClick, noButton = false }: ModalProps) {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <p className="max-w-[80] animate-transitionY rounded-lg bg-white p-4 text-center text-xl font-semibold shadow">
        {message}
      </p>
      {!noButton && (
        <button
          className="mt-4 animate-transitionY cursor-pointer rounded-md bg-primary-blue px-4 py-2 text-base font-semibold text-white"
          onClick={(e) => {
            e.preventDefault()
            handleClick()
          }}
        >
          Fechar
        </button>
      )}
    </div>
  )
}
