"use client";

import { ArrowDown, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface ComboValues {
  value: string;
  label: string;
}

interface ComboboxProps {
  comboValues: ComboValues[];
  searchingFor: string;
  selectAction: (selectedValues: string[]) => void;
}

export function Combobox({
  comboValues,
  searchingFor,
  selectAction,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Array<string>>([]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className={values.length > 0 ? "border border-primary" : ""}
        >
          Assignee <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${searchingFor}...`} />
          <CommandEmpty>No {searchingFor} found.</CommandEmpty>
          <CommandGroup>
            {comboValues.map((comboValue) => (
              <CommandItem
                key={comboValue.value}
                value={comboValue.value}
                onSelect={(currentValue) => {
                  const newValuesArray = values.includes(currentValue)
                    ? values.filter((val) => val !== currentValue)
                    : [...values, currentValue];
                  // setValue(currentValue === value ? "" : currentValue);
                  setValues(newValuesArray);
                  // setOpen(false);

                  selectAction(newValuesArray);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    values.includes(comboValue.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {comboValue.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
