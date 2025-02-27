"use client"

import { Bot, MessageSquare, RefreshCcw, Share2, Users, Bell, ChevronDown, Heart, HelpCircle, MoreHorizontal, Search, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Link  from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  AlertCircle,
  ChevronRight,
  Lock,
  BotIcon as Robot,
  User,
  LayoutDashboard,
  Calendar,
  BarChart,
  LogOut,
  Menu,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"


// Define the Profile type
interface Profile {
  id: number;
  name: string;
  role: string;
  location: string;
  avatar: string;
  bio: string;
  tagline: string;
  experience: { role: string; company: string; period: string; type?: string }[];
  education: { school: string; degree: string; period: string; logo: string }[];
}

const profiles: Profile[] = [
  {
    id: 1,
    name: "Suz Cohan",
    role: "TriYoga Teacher",
    location: "San Francisco, California, United States",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PQAvjB1h4WBfeJSgA7UW2d8lOz21Je.png",
    bio: "Suze Cohan's current role is TriYoga Teacher at Devi Yoga Center. She has been teaching yoga since 2007, specializing in Basics and Level One TriYoga.",
    tagline: "TriYoga Teacher • Devi Yoga Center • San Francisco",
    experience: [
      { role: "TriYoga Teacher", company: "Devi Yoga Center", period: "9/2007 - Present" },
      { role: "Retired exercise physiologist/fitness director/personal trainer, Yoga teacher", company: "Self-employed", period: "2/1993 - 2/2004", type: "Self-employed" },
      { role: "Fitness Director", company: "The Parkpoint clubs", period: "2/1993 - 2/2004" },
    ],
    education: [
      { school: "Sonoma State University", degree: "Master of Arts in Exercise Physiology", period: "1995 - 2002", logo: "/placeholder.svg?height=24&width=24" },
      { school: "Stanford University", degree: "Bachelor of Arts in English/Psychology", period: "1966 - 1970", logo: "/placeholder.svg?height=24&width=24" },
    ],
  },
];

export default function Page() {
  const [isLeftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
       {/* Left Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full border-r border-indigo-100 bg-gradient-to-b from-white to-indigo-50 transition-all overflow-y-auto duration-300 ease-in-out ${
          isLeftSidebarCollapsed ? "w-6" : "w-64"
        } z-10 shadow-lg`}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLeftSidebarCollapsed((prev) => !prev)}
          className="absolute top-5 right-[-7px] p-2 rounded-full text-indigo-700 hover:bg-indigo-50"
        >
          {isLeftSidebarCollapsed ? "▷" : "◀"}
        </Button>
        {!isLeftSidebarCollapsed && (
          <div className="flex h-full flex-col">
            <div className="border-b border-indigo-100 p-6">
              <Link href="/" className="block">
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-4 flex items-center space-x-3 shadow-lg hover:from-indigo-700 hover:to-indigo-800 transition-all group">
                  <div className="bg-white/10 rounded-lg p-2">
                    <svg 
                      className="w-6 h-6 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-lg font-bold text-white group-hover:scale-105 transition-transform">
                      NetworkAI
                    </h2>
                    <span className="text-xs text-indigo-200">
                      Professional Networking
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <nav className="flex-1 space-y-2 p-4">
              {[
                "Dashboard",
                "New Contact",
                "View Network",
                "Manage AI Agents",
                "Notifications",
                "Settings",
                "Logout",
              ].map((item) => (
                <Link
                  key={item}
                  href={item === "Dashboard" ? "/dashboard" : item === "New Contact" ? "/new-contact" : item === "Roles" ? "/roles" : item === "View Network" ? "/three" : item === "Manage AI Agents" ? "/agents" : item === "Settings" ? "/settings" : item === "Notifications" ? "/notifications" : "#"}
                  className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-all hover:bg-indigo-100 hover:shadow-md ${
                    item === "Settings" ? "bg-indigo-600 text-white shadow-md" : "text-slate-700"
                  }`}
                  onClick={() => {
                    setVisualizationType("list")
                    // Clean up Three.js resources
                    if (rendererRef.current) {
                      rendererRef.current.dispose()
                    }
                    if (sceneRef.current) {
                      sceneRef.current.clear()
                    }
                    if (mountRef.current?.children[0]) {
                      mountRef.current.removeChild(mountRef.current.children[0])
                    }
                  }}
                >
                  <span>{item}</span>
                </Link>
              ))}
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


      {/* Main Content Area */}
<div className={`flex-1 transition-all duration-300 ease-in-out ${isLeftSidebarCollapsed ? "ml-6" : "ml-64"} ${isRightSidebarCollapsed ? "mr-6" : "mr-80"}`}>
<header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-md sticky top-0 z-10">
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-medium text-slate-600">Made with</span>
            <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
            <Link href="#" className="font-medium text-indigo-600 hover:underline">
              Learn More →
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:bg-indigo-50 text-indigo-600">
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-indigo-50 text-indigo-600">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar className="h-9 w-9 border-2 border-indigo-200 ring-2 ring-indigo-100">
              <AvatarFallback className="bg-indigo-600 text-white">RM</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" className="hover:bg-indigo-50 text-indigo-600">
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
        </header>
        <div className="space-y-6  max-w-4xl mx-auto">
    <ScrollArea className="h-screen">
      <div className="space-y-4 p-4 md:p-8 pt-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 border-l-4 border-indigo-600 pl-4">Settings</h2>
          <p className="text-slate-600">Manage your account settings and preferences.</p>
        </div>
        <Separator className="bg-indigo-100" />
        <div className="grid gap-6 max-w-3xl">
          {/* AI Agents Section */}
          <Card className="border border-indigo-100 shadow-md">
            <CardHeader className="bg-gradient-to-r from-white to-indigo-50/30 pb-4">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Robot className="h-5 w-5 text-indigo-600" />
                Manage AI Agents
              </CardTitle>
              <CardDescription className="text-slate-600">Configure your AI assistants and their behaviors</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6">
              <Link
                href="/settings/web-scraping"
                className="flex items-center justify-between rounded-lg border border-indigo-100 p-4 hover:bg-indigo-50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <Share2 className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-slate-800">Web Scraping Agent</p>
                    <p className="text-sm text-slate-600">Configure scraping settings</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-indigo-600" />
              </Link>
              <Link
                href="/settings/social-media"
                className="flex items-center justify-between rounded-lg border border-indigo-100 p-4 hover:bg-indigo-50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <Share2 className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-slate-800">Social Media Agent</p>
                    <p className="text-sm text-slate-600">Manage social interactions</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-indigo-600" />
              </Link>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card className="border border-indigo-100 shadow-md">
            <CardHeader className="bg-gradient-to-r from-white to-indigo-50/30 pb-4">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <User className="h-5 w-5 text-indigo-600" />
                Account Settings
              </CardTitle>
              <CardDescription className="text-slate-600">Manage your account preferences and data</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6">
              <Link
                href="/settings/profile"
                className="flex items-center justify-between rounded-lg border border-indigo-100 p-4 hover:bg-indigo-50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <User className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-slate-800">Profile</p>
                    <p className="text-sm text-slate-600">Update your profile information</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-indigo-600" />
              </Link>
              <Link
                href="/settings/analytics"
                className="flex items-center justify-between rounded-lg border border-indigo-100 p-4 hover:bg-indigo-50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <Settings className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-slate-800">Analytics</p>
                    <p className="text-sm text-slate-600">View your analytics data</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-indigo-600" />
              </Link>
              <Link
                href="/settings/insights"
                className="flex items-center justify-between rounded-lg border border-indigo-100 p-4 hover:bg-indigo-50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <AlertCircle className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-slate-800">Insights</p>
                    <p className="text-sm text-slate-600">Review your account insights</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-indigo-600" />
              </Link>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border border-indigo-100 shadow-md">
            <CardHeader className="bg-gradient-to-r from-white to-indigo-50/30 pb-4">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Bell className="h-5 w-5 text-indigo-600" />
                Notification Settings
              </CardTitle>
              <CardDescription className="text-slate-600">Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6">
              <Link
                href="/settings/notifications/setup"
                className="flex items-center justify-between rounded-lg border border-indigo-100 p-4 hover:bg-indigo-50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <Bell className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-slate-800">Setup</p>
                    <p className="text-sm text-slate-600">Configure notification preferences</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-indigo-600" />
              </Link>
              <Link
                href="/settings/notifications/display"
                className="flex items-center justify-between rounded-lg border border-indigo-100 p-4 hover:bg-indigo-50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <Settings className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-slate-800">Display Style</p>
                    <p className="text-sm text-slate-600">Customize AI notification display</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-indigo-600" />
              </Link>
            </CardContent>
          </Card>

          {/* Additional Settings */}
          <Card className="border border-indigo-100 shadow-md">
            <CardHeader className="bg-gradient-to-r from-white to-indigo-50/30 pb-4">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Lock className="h-5 w-5 text-indigo-600" />
                Additional Settings
              </CardTitle>
              <CardDescription className="text-slate-600">Privacy, support, and legal information</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6 md:grid-cols-3">
              <Link
                href="/settings/privacy"
                className="flex items-center justify-between rounded-lg border border-indigo-100 p-4 hover:bg-indigo-50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <Lock className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-slate-800">Privacy Settings</p>
                    <p className="text-sm text-slate-600">Manage your privacy preferences</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-indigo-600" />
              </Link>
              <Link
                href="/settings/support"
                className="flex items-center justify-between rounded-lg border border-indigo-100 p-4 hover:bg-indigo-50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <HelpCircle className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-slate-800">Help & Support</p>
                    <p className="text-sm text-slate-600">Get help with your account</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-indigo-600" />
              </Link>
              <Link
                href="/settings/terms"
                className="flex items-center justify-between rounded-lg border border-indigo-100 p-4 hover:bg-indigo-50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <AlertCircle className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-slate-800">Terms of Service</p>
                    <p className="text-sm text-slate-600">Review our terms and conditions</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-indigo-600" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  </div>
</div>

       {/* Right Sidebar */}
       <aside
        className={`fixed right-0 top-0 h-full border-l border-indigo-100 bg-gradient-to-b from-white to-indigo-50 transition-all overflow-y-auto duration-300 ease-in-out ${
          isRightSidebarCollapsed ? "w-6" : "w-80"
        } shadow-lg z-10`}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setRightSidebarCollapsed((prev) => !prev)}
          className="absolute top-5 left-[-7px] p-2 rounded-full text-indigo-700 hover:bg-indigo-50"
        >
          {isRightSidebarCollapsed ? "◁" : "▶"}
        </Button>
        {!isRightSidebarCollapsed && (
          <div className="flex h-full flex-col p-6">
            <div className="text-center">
              <Avatar className="mx-auto h-24 w-24 border-4 border-indigo-200 ring-4 ring-indigo-100">
                <AvatarImage src="/profile.jpg" alt="Profile" />
                <AvatarFallback className="bg-indigo-600 text-white text-2xl font-bold">RM</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-bold text-slate-800">Rajiv Mallisetty</h2>
              <p className="text-sm text-slate-600">Chief Executive Officer</p>
              <p className="text-sm font-bold text-indigo-600 mt-1 bg-indigo-50 py-1 px-3 rounded-full inline-block">Texas, US</p>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-slate-800 text-lg border-b border-indigo-100 pb-2">Network Insights</h3>
              <div className="mt-4 space-y-4">
                <Card className="border border-indigo-100 bg-gradient-to-r from-white to-indigo-50 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-2xl font-bold text-indigo-700">95</p>
                      <p className="text-sm text-slate-600">Potential AI-Suggested Connections on LinkedIn</p>
                    </div>
                    <Switch className="data-[state=checked]:bg-indigo-600" />
                  </CardContent>
                </Card>
                <Card className="border border-indigo-100 bg-gradient-to-r from-white to-indigo-50 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-2xl font-bold text-indigo-700">80</p>
                      <p className="text-sm text-slate-600">Potential AI-Suggested Connections via Email</p>
                    </div>
                    <Switch className="data-[state=checked]:bg-indigo-600" />
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800 text-lg border-b border-indigo-100 pb-2">Notifications</h3>
                <Button variant="ghost" size="icon" className="hover:bg-indigo-50 text-indigo-600 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
                </Button>
              </div>

              <div className="mt-4 space-y-3">
                {[{
                  title: "Your Agent Found a Content Creator",
                  time: "12:15 PM",
                }, {
                  title: "Your Agent Found a Potential Music Marketer in Your Network",
                  time: "10:30 AM",
                }, {
                  title: "Your Agent Found a Possible Marketer",
                  time: "9:15 AM",
                }].map((notification, i) => (
                  <Card key={i} className={`border border-indigo-100 bg-white p-4 shadow-md transition-all hover:shadow-lg hover:border-indigo-300 ${i === 0 ? 'border-l-4 border-l-indigo-600' : ''}`}>
                    <div className="flex items-start space-x-3">
                      <Avatar className="mt-1 h-8 w-8 border-2 border-indigo-200">
                        <AvatarImage src={profiles?.[0]?.avatar || "/default-avatar.jpg"} alt="Notification" />
                        <AvatarFallback className="bg-indigo-600 text-white">N</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{notification.title}</p>
                        <Button
                          variant="link"
                          className="h-auto p-0 text-sm font-bold text-indigo-600 hover:text-indigo-800"
                        >
                          See Profile
                        </Button>
                      </div>
                      <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded-full">{notification.time}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
