import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/core/Popover";
import Image from "next/image";

interface AutocompleteOption {
  avatar: string;
  value: string;
  username: string;
  email: string;
}

interface AutocompleteProps {
  options: AutocompleteOption[];
  placeholder?: string;
  emptyMessage?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  allowClear?: boolean;
  onSelect?: (value: string) => void;
  selected?: string[];
}

export const AddGuests = ({
  options,
  placeholder = "",
  value = "",
  onChange,
  className,
  disabled = false,
  onSelect,
  selected,
}: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [open, setOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] =
    useState<AutocompleteOption[]>(options);

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (onChange) {
      onChange(newValue);
    }

    const filtered = options.filter(
      (option) =>
        option.username.toLowerCase().includes(newValue.toLowerCase()) ||
        option.value.toLowerCase().includes(newValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleSelectOption = (option) => {
    setInputValue("");
    if (onChange) {
      onChange(option.value);
    }
    if (onSelect) {
      onSelect(option.value);
    }
    setOpen(false);
  };

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative w-full">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full pr-8 h-10 border-none bg-secondary focus-within:bg-white"
          onFocus={(e) => {
            setOpen(!open);
            setReferenceElement(e.currentTarget);
          }}
          onClick={() => {
            if (!disabled && inputValue && filteredOptions.length > 0) {
              setOpen(true);
            }
          }}
        />
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => setOpen(!open)}
          disabled={disabled}
          className="h-full px-2 hover:bg-transparent absolute right-0 top-0"
          tabIndex={-1}
        >
          <ChevronsUpDown className="h-4 w-4 text-gray-500" />
        </Button>
      </div>
      {open && !!filteredOptions.length && (
        <Popover
          isOpen={open}
          setIsOpen={setOpen}
          referenceElement={referenceElement}
          className="max-h-48 bg-white z-10 w-full overflow-y-auto rounded py-2"
        >
          <div>
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => !selected?.includes(option.value) && handleSelectOption(option)}
                className={`px-4 py-2 flex items-center justify-between text-sm cursor-pointer hover:bg-neutral-100 text-neutral-800 ${
                  selected?.includes(option.value)
                    ? "opacity-50 bg-neutral-200"
                    : ""
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-neutral-700 mr-3 overflow-hidden">
                  <Image
                    alt={option.username}
                    src={option.avatar}
                    width={28}
                    height={28}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{option.username}</p>
                  <p className="text-xs text-neutral-600" >{option.email}</p>
                </div>
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    selected?.includes(option.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </div>
            ))}
          </div>
        </Popover>
      )}
    </div>
  );
};
