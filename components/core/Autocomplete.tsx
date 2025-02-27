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

// Interface cho option trong Autocomplete
interface AutocompleteOption {
  label: string;
  value: string;
}

// Props cho component Autocomplete
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
  // State cho giá trị input
  const [inputValue, setInputValue] = useState(value);
  // State cho việc mở/đóng dropdown
  const [open, setOpen] = useState(false);
  // State cho các options được lọc
  const [filteredOptions, setFilteredOptions] =
    useState<AutocompleteOption[]>(options);
  // State cho option được chọn
  const [selectedOption, setSelectedOption] =
    useState<AutocompleteOption | null>(
      options.find((option) => option.value === value) || null
    );

  // Tham chiếu đến input element
  const inputRef = useRef<HTMLInputElement>(null);

  // Tìm label từ value
  const getOptionLabel = (value: string) => {
    const option = options.find((option) => option.value === value);
    return option ? option.label : value;
  };

  // Xử lý khi input thay đổi
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (onChange) {
      onChange(newValue);
    }

    // Lọc options dựa trên giá trị input
    const filtered = options.filter(
      (option) =>
        option.label.toLowerCase().includes(newValue.toLowerCase()) ||
        option.value.toLowerCase().includes(newValue.toLowerCase())
    );
    setFilteredOptions(filtered);

    // Mở dropdown nếu có giá trị và có kết quả
    if (newValue && filtered.length > 0) {
      setOpen(true);
    }

    // Reset selected option nếu input trống
    if (!newValue) {
      setSelectedOption(null);
    }
  };

  // Xử lý khi chọn một option
  const handleSelectOption = (option: AutocompleteOption) => {
    setSelectedOption(option);
    setInputValue(option.label);

    // Đặt timeout để đảm bảo dropdown đóng trước khi focus lại vào input
    setTimeout(() => {
      setOpen(false);
      // Focus lại vào input sau khi chọn option
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

  // Xử lý khi xóa giá trị
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOption(null);
    setInputValue("");

    if (onChange) {
      onChange("");
    }

    // Focus lại vào input sau khi xóa
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Cập nhật filtered options khi options thay đổi
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  // Cập nhật inputValue khi value prop thay đổi
  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value ? getOptionLabel(value) : "");
      setSelectedOption(
        options.find((option) => option.value === value) || null
      );
    }
  }, [value, options]);

  // Xử lý sự kiện đóng Popover
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    // Khi dropdown đóng, focus lại vào input
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
                  tabIndex={-1} // Tránh bị focus khi tab
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
                tabIndex={-1} // Tránh bị focus khi tab
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
