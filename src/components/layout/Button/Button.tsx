interface ButtonProps {
    handleClick: () => void;
    value: string;
    className?: string;
}

export default function Button({ handleClick, value, className }: ButtonProps) {

    const handleClickFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleClick();
    }
    return (
        <button onClick={handleClickFunction} className={`bg-azulao border-none flex items-center justify-center py-2 px-4 rounded-lg text-white text-xl font-extrabold hover:bg-[#0f0f5c] ${className}`}>
            {value}
        </button>
    )
}