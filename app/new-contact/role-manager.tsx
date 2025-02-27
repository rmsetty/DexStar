"use client"

import { useState } from "react"
import { Plus, Search, Users, MoreHorizontal, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CreateRoleDialog } from "./create-role-dialog"
import Link from "next/link"

interface Role {
  id: string
  name: string
  color: string
  members: number
  type: "cosmetic" | "member" | "moderator" | "manager"
}

const initialRoles: Role[] = [
  { id: "1", name: "Team Manager", color: "#4CAF50", members: 1, type: "manager" },
  { id: "2", name: "Programmer", color: "#2196F3", members: 4, type: "member" },
  { id: "3", name: "Engineer", color: "#F44336", members: 6, type: "member" },
  { id: "4", name: "Server Booster", color: "#9C27B0", members: 0, type: "cosmetic" },
]

export default function RoleManager() {
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const addRole = (newRole: Omit<Role, "id" | "members">) => {
    setRoles([
      ...roles,
      {
        ...newRole,
        id: Math.random().toString(36).substr(2, 9),
        members: 0,
      },
    ])
  }

  return (
    <div>      
      <Card className="border border-indigo-100 bg-white shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-indigo-100">
          <CardTitle className="text-3xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">Role Management</CardTitle>
          <Button 
            className="bg-indigo-600 font-medium shadow-md hover:bg-indigo-700 transition-colors text-white"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Role
          </Button>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-400" />
              <Input 
                placeholder="Search roles..." 
                className="w-full rounded-lg border border-indigo-200 bg-white px-10 py-3 shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
              />
            </div>
          </div>

          <Card className="border border-indigo-100 bg-white p-5 shadow-md mt-4">
            <div className="space-y-3 text-sm">
              <p className="font-bold text-indigo-600 flex items-center">
                <span className="inline-block bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center mr-2">✓</span>
                Role Statistics
              </p>
              <div className="pl-8 space-y-2">
                <p className="text-slate-700 flex items-center">
                  <span className="inline-block bg-green-100 text-green-600 rounded-full w-4 h-4 flex items-center justify-center mr-2 text-xs">✓</span>
                  {roles.length} total roles configured
                </p>
                <p className="text-slate-700 flex items-center">
                  <span className="inline-block bg-green-100 text-green-600 rounded-full w-4 h-4 flex items-center justify-center mr-2 text-xs">✓</span>
                  {roles.reduce((acc, role) => acc + role.members, 0)} members assigned to roles
                </p>
              </div>
            </div>
          </Card>

          <div className="grid gap-4 mt-6">
            {roles.map((role, index) => (
              <Card 
                key={role.id} 
                className={`group border border-indigo-100 bg-white shadow-md transition-all hover:shadow-lg hover:border-indigo-300 hover:translate-x-1 transform duration-200 ${index % 2 === 0 ? 'bg-gradient-to-r from-white to-indigo-50/30' : ''}`}
              >
                <CardContent className="flex items-center justify-between p-5">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full ring-2 ring-indigo-100" style={{ backgroundColor: role.color }} />
                    <div>
                      <div className="font-bold text-slate-800">{role.name}</div>
                      <div className="text-sm text-slate-600 flex items-center">
                        <Users className="mr-1 h-3 w-3" />
                        {role.members} {role.members === 1 ? "Member" : "Members"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="hover:bg-indigo-50 border-indigo-200 text-indigo-600"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="hover:bg-indigo-50 border-indigo-200 text-indigo-600"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
                <CardContent className="px-5 pt-0 pb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-medium hover:bg-indigo-50 border-indigo-300 text-indigo-700 hover:text-indigo-800"
                  >
                    Edit Role
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-center mt-6">
            <Button 
              variant="outline" 
              className="font-medium border-indigo-300 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 px-6"
            >
              <Plus className="mr-2 h-4 w-4" />
              Load More Roles
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center space-x-2 text-sm mt-8 justify-center">
        <span className="font-medium text-slate-600">Made with</span>
        <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
        <Link href="#" className="font-medium text-indigo-600 hover:underline">
          Learn More About Roles →
        </Link>
      </div>

      <CreateRoleDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} onCreateRole={addRole} />
    </div>
  )
}