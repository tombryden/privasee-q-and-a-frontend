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
  selectAction: (value: string) => void;
}

export function Combobox({
  comboValues,
  searchingFor,
  selectAction,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className={value ? "border border-primary" : ""}
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
                  setValue(currentValue === value ? "" : currentValue);
                  // setOpen(false);

                  selectAction(currentValue);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === comboValue.value ? "opacity-100" : "opacity-0"
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
