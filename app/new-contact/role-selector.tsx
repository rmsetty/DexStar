"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"

const roles = [
  {
    value: "team-manager",
    label: "Team Manager",
    color: "#4CAF50",
  },
  {
    value: "programmer",
    label: "Programmer",
    color: "#2196F3",
  },
  {
    value: "engineer",
    label: "Engineer",
    color: "#F44336",
  },
  {
    value: "server-booster",
    label: "Server Booster",
    color: "#9C27B0",
  },
]

export function RoleSelector() {
  const [open, setOpen] = useState(false)
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Roles
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
            {selectedRoles.length > 0 ? `${selectedRoles.length} roles selected` : "Select roles..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search roles..." />
            <CommandList>
              <CommandEmpty>No roles found.</CommandEmpty>
              <CommandGroup>
                {roles.map((role) => (
                  <CommandItem
                    key={role.value}
                    onSelect={() => {
                      setSelectedRoles((prev) =>
                        prev.includes(role.value) ? prev.filter((x) => x !== role.value) : [...prev, role.value],
                      )
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", selectedRoles.includes(role.value) ? "opacity-100" : "opacity-0")}
                    />
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: role.color }} />
                      {role.label}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

