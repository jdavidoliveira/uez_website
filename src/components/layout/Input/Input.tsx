import styles from "./Input.module.css";
import * as Slider from '@radix-ui/react-slider'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'

interface InputProps {
  label?: string;
  type?: "checkbox" | "range" | "select" | "password" | "text" | "email" | "number" | any;
  id: string;
  handleChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | any;
  value?: any;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  auxButton?: React.ReactNode | string;
  onAuxButtonClick?: () => void;
  auxButtonTitle?: string;
  minRange?: number;
  maxRange?: number;
  minRangeLabel?: string;
  maxRangeLabel?: string;
  pattern?: string;
  className?: string;
  options?: string[];
  size?: number;
  isBorded?: boolean;
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
  onAuxButtonClick = () => { },
  auxButtonTitle,
  minRange,
  maxRange,
  minRangeLabel,
  maxRangeLabel,
  pattern,
  className = "",
  options,
  size,
  isBorded,
  noLabel
}: InputProps) {


  switch (type) {
    case "checkbox":
      return (
        <div className="flex items-center justify-between gap-1">
          <Checkbox.Root
            className={`hover:bg-[#dbdbdb] flex h-6 w-6 appearance-none items-center justify-center transition bg-cinzero outline-none ${isBorded ? "border border-[#a9a9a9] bg-white w-4 h-4" : ""}`}
            onCheckedChange={handleChange}
            id={id}
            checked={value}
          >
            <Checkbox.Indicator className="w-full h-full flex items-center justify-center text-violet11 bg-[#5e5bff] duration-300">
              <CheckIcon color="white" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className={`text-lg font-normal leading-none text-black ${noLabel ? "hidden" : ""}`} title={label} htmlFor={id}>
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
    // case "select":
    //   return (
    //     <div className="flex items-center justify-center w-full">
    //       <div className={`relative`}>
    //         <Select.Root>
    //           <Select.Trigger
    //             className={`flex items-center w-${size} justify-between px-7 text-base leading-none h-[35px] gap-[5px] bg-cinzero outline-none`}
    //             aria-label={label}
    //           >
    //             <Select.Value placeholder={placeholder} />
    //             <Select.Icon className="text-black">
    //               <ChevronDownIcon />
    //             </Select.Icon>
    //           </Select.Trigger>
    //           <Select.Portal>
    //             <Select.Content className="bg-cinzero">
    //               <Select.Viewport className="p-2">
    //                   <SelectItem value="apple">Apple</SelectItem>
    //                   <SelectItem value="pera">Ai meu cuuuuuu</SelectItem>
    //               </Select.Viewport>
    //             </Select.Content>
    //           </Select.Portal>
    //         </Select.Root>
    //       </div>
    //     </div>
    //   );
    default:
      return (
        <div className="flex flex-col items-center justify-center w-full">
          <label htmlFor={id} title={label} className="self-start text-base font-medium">
            {label}
          </label>
          <div className="flex items-center w-full h-10">
            <input
              onChange={handleChange}
              className={`bg-cinzero w-full h-10 font-medium text-base px-3 py-2 ${className}`}
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