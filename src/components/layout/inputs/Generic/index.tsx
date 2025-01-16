import styles from "./Input.module.css"
import * as Slider from "@radix-ui/react-slider"
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import { twMerge } from "tailwind-merge"

interface InputProps {
  label?: string
  type?: "checkbox" | "range" | "select" | "password" | "text" | "email" | "number" | any
  id: string
  handleChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | any
  value?: any
  minLength?: number
  maxLength?: number
  placeholder?: string
  auxButton?: React.ReactNode | string
  onAuxButtonClick?: () => void
  auxButtonTitle?: string
  minRange?: number
  maxRange?: number
  minRangeLabel?: string
  maxRangeLabel?: string
  pattern?: string
  className?: string
  options?: string[]
  size?: number
  noLabel?: boolean
}

export default function Input({
  label,
  type,
  id,
  handleChange,
  value,
  minLength,
  maxLength,
  placeholder,
  auxButton,
  onAuxButtonClick = () => {},
  auxButtonTitle,
  minRange,
  maxRange,
  minRangeLabel,
  maxRangeLabel,
  pattern,
  className = "",
  options,
  size,
  noLabel,
}: InputProps) {
  switch (type) {
    case "checkbox":
      return (
        <div className="flex items-center justify-between gap-4">
          <Checkbox.Root
            className={twMerge(
              "bg-primary-gray flex h-6 w-6 items-center justify-center transition hover:bg-[#dbdbdb]",
              className,
            )}
            onCheckedChange={handleChange}
            id={id}
            checked={value}
          >
            <Checkbox.Indicator className="text-violet11 flex h-full w-full items-center justify-center bg-[#5e5bff] duration-300">
              <CheckIcon color="white" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label
            className={`text-lg font-normal leading-none text-black ${noLabel ? "hidden" : ""}`}
            title={label}
            htmlFor={id}
          >
            {label}
          </label>
        </div>
      )
    case "range":
      return (
        <div className="flex w-full flex-col items-center justify-center">
          <Slider.Root
            className="relative flex w-10/12 touch-none select-none items-center"
            min={minRange}
            max={maxRange}
            step={1}
            id={id}
            onValueChange={handleChange}
            value={[value]}
          >
            <Slider.Track className="bg-primary-dark-blue relative h-2 grow rounded-full">
              <Slider.Range className="bg-primary-dark-blue absolute h-full rounded-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block h-6 w-6 cursor-pointer rounded-full bg-[#5e5bff] focus:outline-none "
              aria-label="Volume"
            />
          </Slider.Root>
          <div className={`${styles.range_labels + " " + className}`}>
            <label htmlFor={id} title={label} className={styles.range_label}>
              {minRangeLabel}
            </label>
            <label htmlFor={id} title={label} className={styles.range_label}>
              {String(value) + " km"}
            </label>
            <label htmlFor={id} title={label} className={styles.range_label}>
              {maxRangeLabel}
            </label>
          </div>
        </div>
      )
    default:
      return (
        <div className="flex w-full flex-col items-center justify-center">
          <label htmlFor={id} title={label} className="self-start text-base font-medium">
            {label}
          </label>
          <div className="flex h-10 w-full items-center">
            <input
              onChange={handleChange}
              className={twMerge(
                `bg-primary-gray h-10 w-full px-3 py-2 text-base font-medium invalid:border-red-500`,
                className,
              )}
              type={type || "text"}
              id={id}
              value={value || ""}
              minLength={minLength || 0}
              maxLength={maxLength || 30}
              placeholder={placeholder || ""}
              pattern={pattern}
            />
            {auxButton && (
              <button
                title={auxButtonTitle || "Botão Auxiliar"}
                type="button"
                className={styles.auxButton}
                onClick={(e) => {
                  e.preventDefault()
                  onAuxButtonClick()
                }}
              >
                {auxButton}
              </button>
            )}
          </div>
        </div>
      )
  }
}

// const SelectItem = ({ children, className, value }: { children: React.ReactNode, className?: string, value: string }) => (
//   <Select.Item
//     className={classnames(
//       'text-base leading-none flex items-center h-[25px] pr-[35px] pl-[25px] relative cursor-default',
//       className
//     )}
//     value={value}
//   >
//     <Select.ItemText>{children}</Select.ItemText>
//     <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
//       <CheckIcon />
//     </Select.ItemIndicator>
//   </Select.Item>
// );
