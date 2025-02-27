"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface CreateRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateRole: (role: { name: string; color: string; type: string }) => void
}

const roleTypes = ["cosmetic", "member", "moderator", "manager"]

export function CreateRoleDialog({ open, onOpenChange, onCreateRole }: CreateRoleDialogProps) {
  const [roleName, setRoleName] = useState("")
  const [roleColor, setRoleColor] = useState("#99aab5")
  const [roleLevel, setRoleLevel] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreateRole({
      name: roleName,
      color: roleColor,
      type: roleTypes[roleLevel],
    })
    onOpenChange(false)
    setRoleName("")
    setRoleColor("#99aab5")
    setRoleLevel(0)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-indigo-100 shadow-lg bg-white">
        <DialogHeader className="border-b border-indigo-100 pb-4">
          <DialogTitle className="text-xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">Create a new role</DialogTitle>
          <DialogDescription className="text-slate-600 mt-2">
            Give this role a unique name and color. You can always change this later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="roleName" className="font-medium text-slate-700">Role Name</Label>
              <Input
                id="roleName"
                placeholder="e.g. coach, moderator, subscriber, pet club"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="rounded-lg border border-indigo-200 bg-white px-4 py-2 shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roleColor" className="font-medium text-slate-700">Role Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="roleColor"
                  type="color"
                  value={roleColor}
                  onChange={(e) => setRoleColor(e.target.value)}
                  className="w-20 h-10 p-1 border border-indigo-200 rounded-lg shadow-sm"
                />
                <Input
                  value={roleColor}
                  onChange={(e) => setRoleColor(e.target.value)}
                  placeholder="#HEX"
                  className="font-mono rounded-lg border border-indigo-200 bg-white px-4 py-2 shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-medium text-slate-700">Role Level</Label>
              <div className="space-y-4">
                <Slider 
                  value={[roleLevel]} 
                  onValueChange={([value]) => setRoleLevel(value)} 
                  max={3} 
                  step={1}
                  className="text-indigo-600"
                />
                <div className="flex justify-between">
                  {roleTypes.map((type, index) => (
                    <div
                      key={type}
                      className={`text-sm capitalize ${
                        index === roleLevel ? "text-indigo-700 font-medium" : "text-slate-500"
                      }`}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="pt-2 border-t border-indigo-100">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="hover:bg-indigo-50 border-indigo-300 text-indigo-700 hover:text-indigo-800 font-medium shadow-sm"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
            >
              Create Role
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}