import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"

const LeftSidebar = ({ isCollapsed, toggleCollapse }) => {
  return (
    <aside
      className={`fixed left-0 top-0 h-full border-r border-indigo-100 bg-gradient-to-b from-white to-indigo-50 transition-all duration-300 ease-in-out ${isCollapsed ? "w-6" : "w-64"} z-10 shadow-lg`}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleCollapse}
        className="absolute top-5 right-[-7px] p-2 rounded-full text-indigo-700 hover:bg-indigo-50"
      >
        {isCollapsed ? "▷" : "◀"}
      </Button>
      {!isCollapsed && (
        <div className="flex h-full flex-col">
          <div className="border-b border-indigo-100 p-6">
            <div className="bg-white rounded-lg p-4 border-2 border-indigo-600 flex items-center justify-center shadow-md">
              <h2 className="text-lg font-bold text-indigo-700">Networking Tool</h2>
            </div>
          </div>
          <nav className="flex-1 space-y-2 p-4">
            {[...]} {/* Existing navigation items */}
          </nav>
          <div className="p-4">
            <Card className="overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-lg border-0">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl">👑</span>
                  <h3 className="font-bold">Upgrade to Premium</h3>
                </div>
              </CardHeader>
              <CardContent className="text-center text-sm pb-2">
                <p className="text-white/90">Get 10x More New Features</p>
              </CardContent>
              <CardFooter className="justify-center pb-6">
                <Button variant="secondary" size="sm" className="font-medium shadow-md hover:bg-white text-indigo-700">
                  Upgrade Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </aside>
  )
}

export default LeftSidebar