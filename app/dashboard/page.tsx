"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Bell, ChevronDown, Heart, HelpCircle, MoreHorizontal, Search, Settings, Share2, X, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ProfileModal } from "@/components/profile-modal"
import { useSwipeable } from "react-swipeable"


type Profile = {
  id: number
  name: string
  role: string
  location: string
  avatar: string
  bio: string
  tagline: string
  experience: {
    role: string
    company: string
    period: string
    type?: string
  }[]
  education: {
    school: string
    degree: string
    period: string
    logo: string
  }[]
}

export default function DashboardPage() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [profileIndex, setProfileIndex] = useState(0)
  const [likedProfiles, setLikedProfiles] = useState<Profile[]>([])
  const [viewMode, setViewMode] = useState<'list' | 'swipe'>('list')
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  const [swipeProgress, setSwipeProgress] = useState(0)

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction)
    
    if (direction === "right") {
      setLikedProfiles([...likedProfiles, profiles[profileIndex]])
    }
    
    setTimeout(() => {
      setProfileIndex(profileIndex + 1)
      setSwipeDirection(null)
      setSwipeProgress(0)
    }, 800)
  }

  const handlers = useSwipeable({
    onSwiping: (e) => {
      const progress = Math.min(Math.max(e.deltaX / 200, -1), 1)
      setSwipeProgress(progress)
    },
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  // Sample profile data matching the screenshot
  const profiles: Profile[] = [
    {
      id: 1,
      name: "Suze Cohan",
      role: "TriYoga Teacher",
      location: "San Francisco, California, United States",
      avatar: "https://example.com/avatar-suz-cohan.png",
      bio: "Suze Cohan's current role is TriYoga Teacher at Devi Yoga Center. She has been teaching yoga since 2007, specializing in Basics and Level One TriYoga.",
      tagline: "TriYoga Teacher • Devi Yoga Center • San Francisco",
      experience: [
        {
          role: "TriYoga Teacher",
          company: "Devi Yoga Center",
          period: "9/2007 - Present",
        },
        {
          role: "Retired exercise physiologist/fitness director/personal trainer, Yoga teacher",
          company: "Self-employed",
          period: "2/1993 - 2/2004",
          type: "Self-employed",
        },
        {
          role: "Fitness Director",
          company: "The Parkpoint clubs",
          period: "2/1993 - 2/2004",
        },
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
    {
      id: 2,
      name: "John Doe",
      role: "Software Engineer",
      location: "New York, New York, United States",
      avatar: "https://example.com/avatar-john-doe.png",
      bio: "John is a passionate software engineer with a focus on backend development. He has worked with various startups and is skilled in JavaScript, Python, and cloud technologies.",
      tagline: "Software Engineer • Tech Innovator • New York",
      experience: [
        {
          role: "Senior Software Engineer",
          company: "Tech Innovations Inc.",
          period: "5/2015 - Present",
        },
        {
          role: "Software Engineer",
          company: "StartUp Solutions",
          period: "6/2012 - 5/2015",
        },
      ],
      education: [
        {
          school: "University of California, Berkeley",
          degree: "Bachelor of Science in Computer Science",
          period: "2008 - 2012",
          logo: "/placeholder.svg?height=24&width=24",
        },
      ],
    },
    {
      id: 3,
      name: "Ava Martinez",
      role: "Graphic Designer",
      location: "Los Angeles, California, United States",
      avatar: "https://example.com/avatar-ava-martinez.png",
      bio: "Ava is a skilled graphic designer with over 10 years of experience working in branding and visual storytelling. She has a keen eye for detail and creativity.",
      tagline: "Graphic Designer • Visual Storyteller • Los Angeles",
      experience: [
        {
          role: "Senior Graphic Designer",
          company: "Creative Studios",
          period: "6/2017 - Present",
        },
        {
          role: "Junior Graphic Designer",
          company: "Design Co.",
          period: "1/2013 - 6/2017",
        },
      ],
      education: [
        {
          school: "California Institute of the Arts",
          degree: "Bachelor of Fine Arts in Graphic Design",
          period: "2008 - 2012",
          logo: "/placeholder.svg?height=24&width=24",
        },
      ],
    },
    {
      id: 4,
      name: "James Thompson",
      role: "Marketing Strategist",
      location: "Chicago, Illinois, United States",
      avatar: "https://example.com/avatar-james-thompson.png",
      bio: "James has over 15 years of experience in digital marketing and brand strategy. He works with global clients to help grow their digital presence and engage with audiences.",
      tagline: "Marketing Strategist • Brand Consultant • Chicago",
      experience: [
        {
          role: "Head of Digital Marketing",
          company: "Market Leader Agency",
          period: "3/2015 - Present",
        },
        {
          role: "Digital Marketing Specialist",
          company: "Ad Agency Group",
          period: "6/2009 - 3/2015",
        },
      ],
      education: [
        {
          school: "University of Illinois",
          degree: "Bachelor of Science in Marketing",
          period: "2005 - 2009",
          logo: "/placeholder.svg?height=24&width=24",
        },
      ],
    },
    {
      id: 5,
      name: "Lily Chang",
      role: "Product Manager",
      location: "Seattle, Washington, United States",
      avatar: "https://example.com/avatar-lily-chang.png",
      bio: "Lily is a detail-oriented product manager with a passion for creating seamless user experiences. She has successfully managed multiple product launches in the tech industry.",
      tagline: "Product Manager • Tech Innovator • Seattle",
      experience: [
        {
          role: "Lead Product Manager",
          company: "Innovative Solutions",
          period: "8/2018 - Present",
        },
        {
          role: "Product Manager",
          company: "TechWorks",
          period: "4/2015 - 8/2018",
        },
      ],
      education: [
        {
          school: "University of Washington",
          degree: "Master of Science in Information Systems",
          period: "2011 - 2013",
          logo: "/placeholder.svg?height=24&width=24",
        },
        {
          school: "University of California, Los Angeles",
          degree: "Bachelor of Arts in Business Administration",
          period: "2007 - 2011",
          logo: "/placeholder.svg?height=24&width=24",
        },
      ],
    },
  ]

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
                    item === "Dashboard" ? "bg-indigo-600 text-white shadow-md" : "text-slate-700"
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
  
        <div className="p-8">
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-3xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">
      Welcome to the Modern Network
    </h1>

  </div>

  <div className="mb-8 space-y-4">
    <div className="flex space-x-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-400" />
        <input
          type="text"
          placeholder="Search for connections..."
          className="w-full rounded-lg border border-indigo-200 bg-white px-10 py-3 shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
        />
      </div>
      <Button className="bg-indigo-600 px-8 font-medium shadow-md hover:bg-indigo-700 transition-colors text-white">Search</Button>
    </div>

    <Card className="border border-indigo-100 bg-white p-5 shadow-md">
      <div className="space-y-3 text-sm">
        <p className="font-bold text-indigo-600 flex items-center">
          <span className="inline-block bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center mr-2">✓</span>
          Search Progress
        </p>
        <div className="pl-8 space-y-2">
          <p className="text-slate-700 flex items-center">
            <span className="inline-block bg-green-100 text-green-600 rounded-full w-4 h-4 flex items-center justify-center mr-2 text-xs">✓</span>
            Analyzing your search query
          </p>
          <p className="text-slate-700 flex items-center">
            <span className="inline-block bg-green-100 text-green-600 rounded-full w-4 h-4 flex items-center justify-center mr-2 text-xs">✓</span>
            Sending out our agents to find the profiles
          </p>
        </div>
        <p className="font-bold text-slate-800 pl-8">Profiling:</p>
        <p className="text-slate-600 pl-8 italic">example × example × example</p>
        <p className="font-bold text-slate-800 pl-8">Metadata Filters:</p>
        <p className="line-clamp-2 text-slate-600 pl-8 bg-slate-50 p-2 rounded-md border border-slate-100">
          Roles: examples, examples, examples, examples, examples, examples, examples, examples, examples
        </p>
      </div>
    </Card>

    <div className="flex items-center justify-between">
      <p className="text-sm font-bold text-slate-800 bg-indigo-50 p-3 rounded-lg">Displaying Top 100 Personalized Profiles</p>
      <div className="flex gap-2">
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          onClick={() => setViewMode('list')}
          className={`w-24 font-medium ${
            viewMode === 'list' 
              ? "bg-indigo-600 shadow-md hover:bg-indigo-700 transition-colors text-white" 
              : "hover:bg-indigo-50"
          }`}
        >
          List
        </Button>
        <Button
          variant={viewMode === 'swipe' ? 'default' : 'outline'}
          onClick={() => setViewMode('swipe')}
          className={`w-24 font-medium ${
            viewMode === 'swipe' 
              ? "bg-indigo-600 shadow-md hover:bg-indigo-700 transition-colors text-white" 
              : "hover:bg-indigo-50"
          }`}
        >
          Swipe
        </Button>
      </div>
    </div>
  </div>
  

  {viewMode === 'swipe' ? (
    <div {...handlers} className="flex justify-center items-center min-h-[600px]">
      {profileIndex >= profiles.length ? (
        <p className="text-center text-gray-500">No more profiles to show.</p>
      ) : (
        <Card 
          className={`group border border-indigo-100 bg-white shadow-md transition-all duration-300 w-full max-w-[500px] transform hover:scale-[1.02] relative ${
            swipeDirection ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            transform: swipeDirection
              ? `translateX(${swipeDirection === 'left' ? '-150%' : '150%'}) 
                 translateY(${swipeDirection === 'left' ? '40%' : '-40%'}) 
                 rotate(${swipeDirection === 'left' ? '-25deg' : '25deg'})`
              : `translateX(${swipeProgress * 40}px) 
                 translateY(${-Math.abs(swipeProgress) * 15}px) 
                 rotate(${swipeProgress * 8}deg)`,
            transition: swipeDirection ? 'all 0.8s ease-in-out' : 'none',
            boxShadow: swipeDirection === 'left' 
              ? '0 0 40px rgba(239, 68, 68, 0.8)' 
              : swipeDirection === 'right' 
                ? '0 0 40px rgba(34, 197, 94, 0.8)' 
                : swipeProgress > 0 
                  ? `0 0 ${Math.abs(swipeProgress) * 40}px rgba(34, 197, 94, ${Math.abs(swipeProgress) * 0.8})`
                  : swipeProgress < 0 
                    ? `0 0 ${Math.abs(swipeProgress) * 40}px rgba(239, 68, 68, ${Math.abs(swipeProgress) * 0.8})`
                    : 'none',
            backgroundColor: swipeDirection === 'left'
              ? 'rgba(239, 68, 68, 0.05)'
              : swipeDirection === 'right'
                ? 'rgba(34, 197, 94, 0.05)'
                : swipeProgress > 0
                  ? `rgba(34, 197, 94, ${Math.abs(swipeProgress) * 0.05})`
                  : swipeProgress < 0
                    ? `rgba(239, 68, 68, ${Math.abs(swipeProgress) * 0.05})`
                    : 'white'
          }}
        >
          {/* Add swipe indicators */}
          <div 
            className="absolute left-4 top-4 rounded-full bg-red-500 p-2 transition-opacity"
            style={{ opacity: swipeProgress < 0 ? Math.abs(swipeProgress) : 0 }}
          >
            <X className="h-6 w-6 text-white" />
          </div>
          <div 
            className="absolute right-4 top-4 rounded-full bg-green-500 p-2 transition-opacity"
            style={{ opacity: swipeProgress > 0 ? swipeProgress : 0 }}
          >
            <Check className="h-6 w-6 text-white" />
          </div>

          <div className="relative flex flex-col items-center p-6">
            <Avatar className="h-24 w-24 border-4 border-indigo-200 ring-4 ring-indigo-100">
              <AvatarImage src={profiles[profileIndex].avatar} alt={profiles[profileIndex].name} />
              <AvatarFallback className="bg-indigo-600 text-white font-bold">
                {profiles[profileIndex].name[0]}
              </AvatarFallback>
            </Avatar>

            <h2 className="mt-4 text-xl font-bold text-slate-800">{profiles[profileIndex].name}</h2>
            <p className="text-sm text-slate-600">{profiles[profileIndex].role}</p>
            <p className="mt-1 text-sm font-bold text-indigo-600 bg-indigo-50 py-1 px-3 rounded-full inline-block">
              {profiles[profileIndex].location}
            </p>

            <p className="mt-4 text-center text-sm text-slate-600">{profiles[profileIndex].bio}</p>

            <div className="mt-8 w-full">
              <h3 className="mb-4 text-lg font-bold text-slate-800 border-b border-indigo-100 pb-2">Experience</h3>
              <div className="space-y-6">
                {profiles[profileIndex].experience.map((exp, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="mt-1 h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs">
                      {exp.company[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{exp.role}</h4>
                      <p className="text-sm text-slate-600">{exp.company}</p>
                      <p className="text-sm text-slate-500">{exp.period}</p>
                      {exp.type && (
                        <p className="text-sm text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full inline-block mt-1">
                          {exp.type}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 w-full">
              <h3 className="mb-4 text-lg font-bold text-slate-800 border-b border-indigo-100 pb-2">Education</h3>
              <div className="space-y-6">
                {profiles[profileIndex].education.map((edu, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={edu.logo}
                      alt={edu.school}
                      className="mt-1 h-6 w-6 rounded object-cover border border-indigo-100"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800">{edu.school}</h4>
                      <p className="text-sm text-slate-600">{edu.degree}</p>
                      <p className="text-sm text-slate-500">{edu.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex w-full gap-4 flex-col">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 font-medium hover:bg-red-50 border-red-300 text-red-700"
                  onClick={() => handleSwipe("left")}
                >
                  Skip
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 font-medium hover:bg-green-50 border-green-300 text-green-700"
                  onClick={() => handleSwipe("right")}
                >
                  Quick Add to Contacts
                </Button>
              </div>
              <p className="text-center text-sm text-slate-500 italic">
                Tip: You can click the buttons above or swipe with your mouse/touch 👆
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  ) : (
    <div className="space-y-4">
      {profiles.map((profile, index) => (
        <Card 
          key={profile.id} 
          className={`group border border-indigo-100 bg-white shadow-md transition-all hover:shadow-lg hover:border-indigo-300 hover:translate-x-1 transform duration-200 ${index % 2 === 0 ? 'bg-gradient-to-r from-white to-indigo-50/30' : ''}`}
        >
          <CardContent className="flex items-center justify-between p-5">
            <div className="flex items-center space-x-4">
              <Avatar className="h-14 w-14 border-2 border-indigo-200 ring-2 ring-indigo-100">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="bg-indigo-600 text-white font-bold">{profile.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{profile.name}</h3>
                <p className="text-sm text-slate-600">{profile.tagline}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="outline" size="icon" className="hover:bg-indigo-50 border-indigo-200 text-indigo-600">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-indigo-50 border-indigo-200 text-indigo-600">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
          <CardFooter className="px-5 pb-5 pt-0">
            <Button
              variant="outline"
              size="sm"
              className="font-medium hover:bg-indigo-50 border-indigo-300 text-indigo-700 hover:text-indigo-800"
              onClick={() => setSelectedProfile(profile)}
            >
              View Profile
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )}
</div>
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
    
      {/* Profile Modal */}
      {selectedProfile && (
        <ProfileModal
          open={!!selectedProfile}
          onOpenChange={(open) => !open && setSelectedProfile(null)}
          profile={selectedProfile}
        />
      )}
    </div>
  );  
}