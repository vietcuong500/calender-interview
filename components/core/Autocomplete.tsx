import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AutocompleteOption {
  label: string;
  value: string;
}
interface AutocompleteProps {
  options: AutocompleteOption[];
  placeholder?: string;
  emptyMessage?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (option: AutocompleteOption) => void;
  className?: string;
  disabled?: boolean;
  allowClear?: boolean;
}

const Autocomplete = ({
  options,
  placeholder = "",
  emptyMessage = "",
  value = "",
  onChange,
  onSelect,
  className,
  disabled = false,
  allowClear = true,
}: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [open, setOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] =
    useState<AutocompleteOption[]>(options);
  const [selectedOption, setSelectedOption] =
    useState<AutocompleteOption | null>(
      options.find((option) => option.value === value) || null
    );

  const inputRef = useRef<HTMLInputElement>(null);

  const getOptionLabel = (value: string) => {
    const option = options.find((option) => option.value === value);
    return option ? option.label : value;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (onChange) {
      onChange(newValue);
    }

    const filtered = options.filter(
      (option) =>
        option.label.toLowerCase().includes(newValue.toLowerCase()) ||
        option.value.toLowerCase().includes(newValue.toLowerCase())
    );
    setFilteredOptions(filtered);

    if (newValue && filtered.length > 0) {
      setOpen(true);
    }

    if (!newValue) {
      setSelectedOption(null);
    }
  };

  const handleSelectOption = (option: AutocompleteOption) => {
    setSelectedOption(option);
    setInputValue(option.label);

    setTimeout(() => {
      setOpen(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);

    if (onChange) {
      onChange(option.value);
    }

    if (onSelect) {
      onSelect(option);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOption(null);
    setInputValue("");

    if (onChange) {
      onChange("");
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value ? getOptionLabel(value) : "");
      setSelectedOption(
        options.find((option) => option.value === value) || null
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              placeholder={placeholder}
              disabled={disabled}
              className="w-full pr-8 h-10 border-none bg-secondary focus-within:bg-white"
              onFocus={() => {
                if (!disabled && inputValue && filteredOptions.length > 0) {
                  setOpen(true);
                }
              }}
              onClick={() => {
                if (!disabled && inputValue && filteredOptions.length > 0) {
                  setOpen(true);
                }
              }}
            />

            <div className="absolute right-0 top-0 flex h-full items-center">
              {allowClear && inputValue && (
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={handleClear}
                  disabled={disabled}
                  className="h-full px-2 hover:bg-transparent"
                  tabIndex={-1} 
                >
                  <X className="h-4 w-4 text-gray-500" />
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={() => setOpen(!open)}
                disabled={disabled}
                className="h-full px-2 hover:bg-transparent"
                tabIndex={-1}
              >
                <ChevronsUpDown className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent className="p-0 w-full" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelectOption(option)}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedOption?.value === option.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Autocomplete;
