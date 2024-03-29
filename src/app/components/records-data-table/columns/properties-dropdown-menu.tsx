"use client";

import {
  ArrowDown,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMemo, useState } from "react";

interface PropertiesDropdownMenuProps {
  /** Properties in map form. Key: [value1, value2] */
  properties: Map<string, Array<string>>;
  selectAction: (selectedValues: string[]) => void; // selected values of properties, eg ["vendor:IBM", "example:property"]
}

export function PropertiesDropdownMenu({
  properties,
  selectAction,
}: PropertiesDropdownMenuProps) {
  // memod properties key array for efficiency
  const propertyKeys = useMemo(() => {
    const propertyKeysArr: string[] = [];
    properties.forEach((_value, key) => {
      propertyKeysArr.push(key);
    });

    return propertyKeysArr;
  }, [properties]);

  const [values, setValues] = useState<string[]>([]); // store values as ["vendor:IBM", "example:property"]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={values.length > 0 ? "border border-primary" : undefined}
        >
          Properties <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-52">
        <DropdownMenuGroup>
          {propertyKeys.map((propertyKey) => (
            <DropdownMenuSub key={propertyKey}>
              <DropdownMenuSubTrigger>{propertyKey}</DropdownMenuSubTrigger>

              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {properties.get(propertyKey)?.map((propertyValue) => {
                    const propertyJoinedText = `${propertyKey}:${propertyValue}`;
                    const checked = values.includes(propertyJoinedText);

                    return (
                      <DropdownMenuCheckboxItem
                        key={propertyValue}
                        onSelect={(e) => e.preventDefault()}
                        checked={checked}
                        onCheckedChange={(newChecked) => {
                          const newValues = !newChecked
                            ? values.filter((val) => val !== propertyJoinedText)
                            : [...values, propertyJoinedText];

                          setValues(newValues);

                          selectAction(newValues);
                        }}
                      >
                        <span>{propertyValue}</span>
                      </DropdownMenuCheckboxItem>
                    );
                  })}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
