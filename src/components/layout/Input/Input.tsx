import styles from "./Input.module.css";
import * as Slider from '@radix-ui/react-slider'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'

interface InputProps {
  label?: string;
  type: string;
  id: string;
  handleChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | any;
  value?: any;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  auxButton?: string;
  onAuxButtonClick?: () => void;
  auxButtonTitle?: string;
  minRange?: number;
  maxRange?: number;
  minRangeLabel?: string;
  maxRangeLabel?: string;
  pattern?: string;
  className?: string;
  options?: string[];
}

export default function Input({
  label,
  type,
  id,
  handleChange,
  value = "",
  minLength,
  maxLength,
  placeholder,
  auxButton,
  onAuxButtonClick = () => { },
  auxButtonTitle,
  minRange,
  maxRange,
  minRangeLabel,
  maxRangeLabel,
  pattern,
  className = "",
  options
}: InputProps) {


  switch (type) {
    case "checkbox":
      return (
        <div className="flex items-center justify-between gap-1">
          <Checkbox.Root
            className={`hover:bg-[#949494] flex h-6 w-6 appearance-none items-center justify-center transition bg-cinzero outline-none ${className}`}
            onCheckedChange={handleChange}
            id={id}
            checked={value}
          >
            <Checkbox.Indicator className="w-full h-full flex items-center justify-center text-violet11 bg-[#5e5bff]">
              <CheckIcon color="white" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className={`text-lg font-normal leading-none text-black ${className}`} title={label} htmlFor={id}>
            {label}
          </label>
        </div>
      );

    case "range":
      return (
        <div className="flex flex-col items-center justify-center w-full">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-10/12"
            min={minRange}
            max={maxRange}
            step={1}
            id={id}
            onValueChange={handleChange}
            value={[value]}
          >
            <Slider.Track className="bg-azulao relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-azulao rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-6 h-6 bg-[#5e5bff] rounded-full cursor-pointer focus:outline-none "
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
      );
    case "select":
      return (
        <div className="flex flex-col items-center justify-center w-full">
          <label htmlFor={id} title={label} className="self-start text-base font-medium">
            {label}
          </label>
          <div className={`relative mt-2 w-64 ${styles.selectContainer}`}>
            <Select.Root
              value={value}
              onValueChange={handleChange}
            >
              <Select.Trigger className="bg-cinzero border border-gray-300 rounded-md p-2 flex justify-between items-center">
                <span>{value}</span>
                <ChevronDownIcon className="w-5 h-5" />
              </Select.Trigger>
              <Select.Content className="bg-white border border-gray-300 rounded-md mt-2 absolute w-full z-10">
                {options?.map((option) => (
                  <Select.Item
                    key={option}
                    value={option}
                    className="py-2 px-4 cursor-pointer hover:bg-blue-100"
                  >
                    {option}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>
        </div>
      );
    default:
      return (
        <div className="flex flex-col items-center justify-center w-full">
          <label htmlFor={id} title={label} className="self-start text-base font-medium">
            {label}
          </label>
          <div className="flex items-center w-full h-10">
            <input
              onChange={handleChange}
              className={styles.inputtext_bonito}
              type={type || "text"}
              id={id}
              value={value || ""}
              minLength={minLength || 0}
              maxLength={maxLength || 30}
              placeholder={placeholder || ""}
              pattern={pattern}
              max={maxRange}
            />
            {auxButton && (
              <button
                title={auxButtonTitle || "Botão Auxiliar"}
                type="button"
                className={styles.auxButton}
                onClick={(e) => {
                  e.preventDefault();
                  onAuxButtonClick()
                }}
              >
                {auxButton}
              </button>
            )}
          </div>
        </div>
      );
  }
}
