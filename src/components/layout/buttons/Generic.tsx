import { twMerge } from "tailwind-merge"

interface ButtonProps {
  handleClick: () => void
  children: string | React.ReactNode
  className?: string
}

export default function Button({ handleClick, children, className }: ButtonProps) {
  const handleClickFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleClick()
  }
  return (
    <button
      onClick={handleClickFunction}
      className={twMerge(
        "bg-primary-dark-blue flex items-center justify-center rounded-lg border-none px-4 py-2 text-xl font-extrabold text-white hover:bg-[#0f0f5c]",
        className,
      )}
    >
      {children}
    </button>
  )
}
