interface ModalProps {
    message: string
    handleClick: () => void
}

export default function Modal({ message, handleClick }: ModalProps) {
    return (
        <div className="fixed bg-[rgba(0,0,0,0.5)] top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50">
            <p className="bg-white p-4 shadow rounded-lg">{message}</p>
            <button onClick={(e) => {
                e.preventDefault();
                handleClick()
            }}>Fechar</button>
        </div>
    )
}
