'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { CheckIcon } from 'lucide-react';
import React from 'react';

interface FilterOption {
  id: string;
  index?: number;
  title?: string;
  stories_video_url?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface MultiSelectBoxProps {
  title: string;
  options: FilterOption[];
  setSelectedValues: (values: FilterOption[]) => void;
  selectedValues: FilterOption[] | [];
}

export function MultiSelectBox({
  title,
  options,
  setSelectedValues,
  selectedValues
}: MultiSelectBoxProps) {
  const selectedValuesSet = React.useMemo(
    () => new Set(selectedValues.map((option) => option?.id)),
    [selectedValues]
  );

  const handleSelect = (value: FilterOption) => {
    const newValues = [...selectedValues];
    const existsIndex = newValues.findIndex(
      (selected) => selected.id === value.id
    );

    if (existsIndex !== -1) {
      newValues.splice(existsIndex, 1);
    } else {
      newValues.push(value);
    }

    setSelectedValues(newValues);
  };

  const resetFilter = () => setSelectedValues([]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between border-dashed"
        >
          <div className="flex items-center">
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            {title}
          </div>
          {selectedValues.length > 0 && (
            <div className="flex items-center">
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.length} selected
                  </Badge>
                ) : (
                  selectedValues.map((value) => (
                    <Badge
                      variant="secondary"
                      key={value.id}
                      className="rounded-sm px-1 font-normal"
                    >
                      {value?.title}
                    </Badge>
                  ))
                )}
              </div>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${title}`} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  onSelect={() => handleSelect(option)}
                >
                  <div
                    className={cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                      selectedValuesSet.has(option.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'opacity-50 [&_svg]:invisible'
                    )}
                  >
                    <CheckIcon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  {option.icon && (
                    <option.icon
                      className="mr-2 h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  )}
                  <span>{option.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            {selectedValues.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={resetFilter}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
