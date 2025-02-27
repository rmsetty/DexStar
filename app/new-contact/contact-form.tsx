"use client"

import { useState } from "react"
import { PlusCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RoleSelector } from "./role-selector"

export default function ContactForm() {
  const [additionalFields, setAdditionalFields] = useState<string[]>([])

  const addField = (field: string) => {
    if (!additionalFields.includes(field)) {
      setAdditionalFields([...additionalFields, field])
    }
  }

  return (
    <Card className="border border-indigo-100 shadow-md">
      <CardHeader className="bg-gradient-to-r from-white to-indigo-50/30">
      <CardTitle className="mb-8 text-3xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">New Contact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-indigo-50 border-2 border-indigo-200 ring-2 ring-indigo-100 flex items-center justify-center">
              <User className="h-12 w-12 text-indigo-400" />
            </div>
            <Button size="sm" variant="secondary" className="absolute bottom-0 right-0 bg-indigo-600 text-white hover:bg-indigo-700 shadow-md">
              Add Photo
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="prefix" className="font-medium text-slate-700">Prefix</Label>
            <Input 
              id="prefix" 
              placeholder="Mr./Ms./Dr." 
              className="rounded-lg border border-indigo-200 bg-white px-4 py-2 shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="firstName" className="font-medium text-slate-700">First Name</Label>
            <Input 
              id="firstName" 
              placeholder="Enter first name" 
              className="rounded-lg border border-indigo-200 bg-white px-4 py-2 shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="lastName" className="font-medium text-slate-700">Last Name</Label>
            <Input 
              id="lastName" 
              placeholder="Enter last name" 
              className="rounded-lg border border-indigo-200 bg-white px-4 py-2 shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="company" className="font-medium text-slate-700">Company</Label>
            <Input 
              id="company" 
              placeholder="Enter company name" 
              className="rounded-lg border border-indigo-200 bg-white px-4 py-2 shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="font-medium text-slate-700">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter email address" 
              className="rounded-lg border border-indigo-200 bg-white px-4 py-2 shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone" className="font-medium text-slate-700">Phone</Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="Enter phone number" 
              className="rounded-lg border border-indigo-200 bg-white px-4 py-2 shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
            />
          </div>

          <RoleSelector />

          {additionalFields.map((field) => (
            <div key={field} className="grid gap-2">
              <Label htmlFor={field} className="font-medium text-slate-700">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
              {field === "notes" ? (
                <Textarea 
                  id={field} 
                  placeholder={`Enter ${field}`} 
                  className="rounded-lg border border-indigo-200 bg-white px-4 py-2 shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
                />
              ) : field === "pronouns" ? (
                <Select>
                  <SelectTrigger className="rounded-lg border border-indigo-200 bg-white shadow-md">
                    <SelectValue placeholder="Select pronouns" />
                  </SelectTrigger>
                  <SelectContent className="border-indigo-200 bg-white">
                    <SelectItem value="he/him">he/him</SelectItem>
                    <SelectItem value="she/her">she/her</SelectItem>
                    <SelectItem value="they/them">they/them</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input 
                  id={field} 
                  placeholder={`Enter ${field}`} 
                  className="rounded-lg border border-indigo-200 bg-white px-4 py-2 shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-2">
          <Label className="font-medium text-slate-700">Additional Fields</Label>
          <div className="flex flex-wrap gap-2">
            {["url", "address", "birthday", "pronouns", "notes", "social profile", "instant message"].map((field) => (
              <Button
                key={field}
                variant="outline"
                size="sm"
                onClick={() => addField(field)}
                disabled={additionalFields.includes(field)}
                className="hover:bg-indigo-50 border-indigo-300 text-indigo-700 hover:text-indigo-800 font-medium shadow-sm"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add {field}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            className="hover:bg-indigo-50 border-indigo-300 text-indigo-700 hover:text-indigo-800 font-medium shadow-sm"
          >
            Cancel
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
            Save Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}