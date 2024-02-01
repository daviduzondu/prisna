"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const eventTypes = [
  {
    value: "weddings",
    label: "Weddings",
  },
  {
    value: "conferences",
    label: "Conferences",
  },
  {
    value: "bday",
    label: "Birthday Parties",
  },
  {
    value: "seminars",
    label: "Seminars",
  },
  {
    value: "concerts",
    label: "Concerts",
  },
  {
    value: "any",
    label: "Any Events",
  },
];

export default function EventTypeList({value, setValue}) {
  const [open, setOpen] = React.useState(false);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? eventTypes.find((eventType) => eventType.value === value)?.label : "Select event type..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command required>
          <CommandInput placeholder="Search event types..." />
          <CommandEmpty>Nothing found.</CommandEmpty>
          <CommandGroup>
            {eventTypes.map((eventType) => (
              <CommandItem
                key={eventType.value}
                value={eventType.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check className={cn("mr-2 h-4 w-4", value === eventType.value ? "opacity-100" : "opacity-0")} />
                {eventType.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
