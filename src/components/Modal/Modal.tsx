interface ModalProps {
    message: string
    handleClick: () => void
    noButton?: boolean
}

export default function Modal({ message, handleClick, noButton = false }: ModalProps) {
    return (
        <div className="fixed bg-[rgba(0,0,0,0.5)] top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50">
            <p className="bg-white p-4 shadow rounded-lg text-center font-semibold text-xl max-w-[80] animate-transitionY">{message}</p>
            {!noButton && <button className="bg-roxazul text-white py-2 px-4 cursor-pointer font-semibold text-base mt-4 animate-transitionY rounded-md" onClick={(e) => {
                e.preventDefault();
                handleClick()
            }}>Fechar</button>}
        </div>
    )
}
