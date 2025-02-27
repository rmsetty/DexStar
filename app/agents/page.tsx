"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Bot, Globe, Heart, HelpCircle, Settings, ChevronDown, MessageSquare, RefreshCcw, Search, Share2, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Bell } from "lucide-react"

// Define the Profile type
interface Profile {
  id: number
  name: string
  role: string
  location: string
  avatar: string
  bio: string
  tagline: string
  experience: { role: string; company: string; period: string; type?: string }[]
  education: { school: string; degree: string; period: string; logo: string }[]
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
      {
        role: "Retired exercise physiologist/fitness director/personal trainer, Yoga teacher",
        company: "Self-employed",
        period: "2/1993 - 2/2004",
        type: "Self-employed",
      },
      { role: "Fitness Director", company: "The Parkpoint clubs", period: "2/1993 - 2/2004" },
    ],
    education: [
      {
        school: "Sonoma State University",
        degree: "Master of Arts in Exercise Physiology",
        period: "1995 - 2002",
        logo: "/placeholder.svg?height=24&width=24",
      },
      {
        school: "Stanford University",
        degree: "Bachelor of Arts in English/Psychology",
        period: "1966 - 1970",
        logo: "/placeholder.svg?height=24&width=24",
      },
    ],
  },
]

export default function Page() {
  const [isLeftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false)
  const [isRightSidebarCollapsed, setRightSidebarCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50">
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
                    item === "Manage AI Agents" ? "bg-indigo-600 text-white shadow-md" : "text-slate-700"
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
      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${isLeftSidebarCollapsed ? "ml-6" : "ml-64"} ${
          isRightSidebarCollapsed ? "mr-6" : "mr-80"
        } max-w-full`}
      >
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

        <Tabs defaultValue="social" className="space-y-6 p-8 max-w-4xl mx-auto">
          <TabsList className="bg-indigo-50 p-1">
            <TabsTrigger 
              value="social" 
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              Social Media Agent
            </TabsTrigger>
            <TabsTrigger 
              value="scraping" 
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              Web Scraping Agent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="social" className="space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">
                Social Media Agent
              </h1>
              <p className="text-slate-600">Configure your AI social media assistant.</p>
            </div>

            <Card className="border border-indigo-100 shadow-md">
              <CardHeader className="bg-gradient-to-r from-white to-indigo-50/30 pb-4">
                <CardTitle>Connected Platforms</CardTitle>
                <CardDescription className="text-slate-600">Manage your connected social media accounts</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 pt-6">
                <div className="space-y-4">
                  {[
                    { platform: "LinkedIn", status: "Connected", type: "Professional" },
                    { platform: "Twitter", status: "Connected", type: "Social" },
                    { platform: "GitHub", status: "Connected", type: "Tech" },
                  ].map((platform) => (
                    <div key={platform.platform} className="flex items-center justify-between space-x-2 px-4 py-3 rounded-lg hover:bg-indigo-50 transition-all">
                      <div className="flex items-center space-x-4">
                        <Share2 className="h-5 w-5 text-indigo-600" />
                        <div>
                          <p className="font-medium text-slate-800">{platform.platform}</p>
                          <p className="text-sm text-slate-600">{platform.status}</p>
                        </div>
                      </div>
                      <Badge className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200">{platform.type}</Badge>
                    </div>
                  ))}
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Connect New Platform</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-indigo-100 shadow-md">
              <CardHeader className="bg-gradient-to-r from-white to-indigo-50/30 pb-4">
                <CardTitle>Connection Recommendations</CardTitle>
                <CardDescription className="text-slate-600">AI-powered connection suggestions based on your network</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 pt-6">
                <div className="space-y-4">
                  {[
                    {
                      name: "Alex Thompson",
                      role: "AI Researcher",
                      mutual: 12,
                      avatar: "/placeholder.svg?height=40&width=40",
                    },
                    {
                      name: "Sarah Chen",
                      role: "Product Manager",
                      mutual: 8,
                      avatar: "/placeholder.svg?height=40&width=40",
                    },
                    {
                      name: "Michael Kim",
                      role: "Tech Lead",
                      mutual: 15,
                      avatar: "/placeholder.svg?height=40&width=40",
                    },
                  ].map((person) => (
                    <div key={person.name} className="flex items-center justify-between space-x-2 px-4 py-3 rounded-lg hover:bg-indigo-50 transition-all">
                      <div className="flex items-center space-x-4">
                        <Avatar className="border-2 border-indigo-200 ring-2 ring-indigo-100">
                          <AvatarImage src={person.avatar} />
                          <AvatarFallback className="bg-indigo-600 text-white">{person.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-slate-800">{person.name}</p>
                          <p className="text-sm text-slate-600">{person.role}</p>
                        </div>
                      </div>
                      <Badge className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200">{person.mutual} mutual</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-indigo-100 shadow-md">
              <CardHeader className="bg-gradient-to-r from-white to-indigo-50/30 pb-4">
                <CardTitle>Auto-Engagement Settings</CardTitle>
                <CardDescription className="text-slate-600">Configure how the AI agent interacts with your network</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 pt-6">
                <div className="flex items-center justify-between space-x-2 px-4 py-3 rounded-lg hover:bg-indigo-50 transition-all">
                  <div className="flex items-center space-x-4">
                    <Bot className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="font-medium text-slate-800">Smart Responses</p>
                      <p className="text-sm text-slate-600">Auto-generate engagement responses</p>
                    </div>
                  </div>
                  <Switch className="data-[state=checked]:bg-indigo-600" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2 px-4 py-3 rounded-lg hover:bg-indigo-50 transition-all">
                  <div className="flex items-center space-x-4">
                    <Users className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="font-medium text-slate-800">Connection Filtering</p>
                      <p className="text-sm text-slate-600">Filter connection requests automatically</p>
                    </div>
                  </div>
                  <Switch className="data-[state=checked]:bg-indigo-600" defaultChecked />
                </div>
                <div className="space-y-4 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-800">Engagement Frequency</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="w-[180px] border-indigo-200 focus:ring-indigo-500">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (1-2 times/day)</SelectItem>
                        <SelectItem value="medium">Medium (3-5 times/day)</SelectItem>
                        <SelectItem value="high">High (6+ times/day)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4 px-4 py-3">
                  <Label className="text-slate-800">Interest Keywords</Label>
                  <Input 
                    placeholder="Enter topics of interest (comma-separated)" 
                    className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500" 
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-indigo-100 shadow-md">
              <CardHeader className="bg-gradient-to-r from-white to-indigo-50/30 pb-4">
                <CardTitle>Message Monitoring</CardTitle>
                <CardDescription className="text-slate-600">Configure message scanning and response settings</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 pt-6">
                <div className="flex items-center justify-between space-x-2 px-4 py-3 rounded-lg hover:bg-indigo-50 transition-all">
                  <div className="flex items-center space-x-4">
                    <MessageSquare className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="font-medium text-slate-800">Auto-Scan Messages</p>
                      <p className="text-sm text-slate-600">Automatically scan new messages</p>
                    </div>
                  </div>
                  <Switch className="data-[state=checked]:bg-indigo-600" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2 px-4 py-3 rounded-lg hover:bg-indigo-50 transition-all">
                  <div className="flex items-center space-x-4">
                    <RefreshCcw className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="font-medium text-slate-800">Response Suggestions</p>
                      <p className="text-sm text-slate-600">Get AI-powered response suggestions</p>
                    </div>
                  </div>
                  <Switch className="data-[state=checked]:bg-indigo-600" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scraping" className="space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">
                Web Scraping Agent
              </h1>
              <p className="text-slate-600">Configure your AI web scraping assistant.</p>
            </div>

            <Card className="border border-indigo-100 shadow-md">
              <CardHeader className="bg-gradient-to-r from-white to-indigo-50/30 pb-4">
                <CardTitle>Active Sources</CardTitle>
                <CardDescription className="text-slate-600">Websites currently being monitored</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 pt-6">
                <div className="space-y-4">
                  {[
                    { url: "github.com", type: "Tech" },
                    { url: "linkedin.com", type: "Professional" },
                    { url: "medium.com", type: "Content" },
                  ].map((source) => (
                    <div key={source.url} className="flex items-center justify-between space-x-2 px-4 py-3 rounded-lg hover:bg-indigo-50 transition-all">
                      <div className="flex items-center space-x-4">
                        <Globe className="h-5 w-5 text-indigo-600" />
                        <div>
                          <p className="font-medium text-slate-800">{source.url}</p>
                          <p className="text-sm text-slate-600">Last scan: 5 minutes ago</p>
                        </div>
                      </div>
                      <Badge className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200">{source.type}</Badge>
                    </div>
                  ))}
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Add New Source</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-indigo-100 shadow-md">
              <CardHeader className="bg-gradient-to-r from-white to-indigo-50/30 pb-4">
                <CardTitle>Scraping Settings</CardTitle>
                <CardDescription className="text-slate-600">Configure how the AI agent scrapes content</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 pt-6">
                <div className="flex items-center justify-between space-x-2 px-4 py-3 rounded-lg hover:bg-indigo-50 transition-all">
                  <div className="flex items-center space-x-4">
                    <RefreshCcw className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="font-medium text-slate-800">Auto-Refresh</p>
                      <p className="text-sm text-slate-600">Automatically scan for new content</p>
                    </div>
                  </div>
                  <Switch className="data-[state=checked]:bg-indigo-600" defaultChecked />
                </div>
                <div className="space-y-4 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-800">Scan Frequency</Label>
                    <Select defaultValue="15">
                      <SelectTrigger className="w-[180px] border-indigo-200 focus:ring-indigo-500">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Every 5 minutes</SelectItem>
                        <SelectItem value="15">Every 15 minutes</SelectItem>
                        <SelectItem value="30">Every 30 minutes</SelectItem>
                        <SelectItem value="60">Every hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4 px-4 py-3">
                  <Label className="text-slate-800">Content Filters</Label>
                  <Input 
                    placeholder="Enter keywords to track (comma-separated)" 
                    className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500" 
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-indigo-100 shadow-md">
              <CardHeader className="bg-gradient-to-r from-white to-indigo-50/30 pb-4">
                <CardTitle>AI Processing</CardTitle>
                <CardDescription className="text-slate-600">Configure how AI processes scraped content</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 pt-6">
                <div className="flex items-center justify-between space-x-2 px-4 py-3 rounded-lg hover:bg-indigo-50 transition-all">
                  <div className="flex items-center space-x-4">
                    <Bot className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="font-medium text-slate-800">Smart Filtering</p>
                      <p className="text-sm text-slate-600">Use AI to filter relevant content</p>
                    </div>
                  </div>
                  <Switch className="data-[state=checked]:bg-indigo-600" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2 px-4 py-3 rounded-lg hover:bg-indigo-50 transition-all">
                  <div className="flex items-center space-x-4">
                    <Search className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="font-medium text-slate-800">Content Analysis</p>
                      <p className="text-sm text-slate-600">Generate insights from scraped data</p>
                    </div>
                  </div>
                  <Switch className="data-[state=checked]:bg-indigo-600" defaultChecked />
                </div>
                <div className="space-y-2 px-4 py-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-800">Current Processing Queue</span>
                    <span className="text-slate-600">45/100</span>
                  </div>
                  <Progress value={45} className="bg-indigo-100 h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

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
  )
}

