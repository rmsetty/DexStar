"use client"

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, HelpCircle, Settings, Heart } from "lucide-react"
import Link from "next/link"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import NetworkVisualization3D from "@/components/NetworkVisualization3D";


type Node = {
  id: number
  name: string
  role: string
  industry: string
  skills: string[]
}

type Edge = {
  from: number
  to: number
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

const nodes: Node[] = [
  { id: 1, name: "John Doe", role: "Marketing", industry: "Tech", skills: ["SEO", "Content Marketing"] },
  { id: 2, name: "Jane Smith", role: "Engineering", industry: "Tech", skills: ["Development", "Cloud Computing"] },
  { id: 3, name: "Alex Johnson", role: "Design", industry: "Tech", skills: ["UX Design", "Graphic Design"] },
  {
    id: 4,
    name: "Emily Davis",
    role: "Engineering",
    industry: "Finance",
    skills: ["Data Science", "Machine Learning"],
  },
  {
    id: 5,
    name: "Michael Brown",
    role: "Marketing",
    industry: "Health",
    skills: ["Digital Marketing", "Brand Management"],
  },
]

const edges: Edge[] = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 5 },
  { from: 4, to: 5 },
]

export default function NetworkVisualization() {
  const [visualizationType, setVisualizationType] = useState<"3d" | "heatmap" | "list">("3d")
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [messages, setMessages] = useState<string[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [skillFilter, setSkillFilter] = useState("")
  const [industryFilter, setIndustryFilter] = useState("")
  const [message, setMessage] = useState("")

  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const nodeMeshesRef = useRef<{ [key: number]: THREE.Mesh }>({})

  useEffect(() => {
    if (!mountRef.current || visualizationType !== "3d") return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000,
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    mountRef.current.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer
    controlsRef.current = controls

    // Create nodes
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x007bff })
    const nodeGeometry = new THREE.SphereGeometry(0.1, 32, 32)

    nodes.forEach((node) => {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial)
      mesh.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5)
      mesh.userData = node
      scene.add(mesh)
      nodeMeshesRef.current[node.id] = mesh
    })

    // Create edges
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xaaaaaa })
    edges.forEach((edge) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        nodeMeshesRef.current[edge.from].position,
        nodeMeshesRef.current[edge.to].position,
      ])
      const line = new THREE.Line(geometry, edgeMaterial)
      scene.add(line)
    })

    camera.position.z = 5

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      renderer.dispose()
      scene.clear()
      if (mountRef.current?.children[0]) {
        mountRef.current.removeChild(mountRef.current.children[0])
      }
      // Clear the refs
      sceneRef.current = null
      cameraRef.current = null
      rendererRef.current = null
      controlsRef.current = null
      nodeMeshesRef.current = {}
    }
  }, [visualizationType]) // Add visualizationType as a dependency

  useEffect(() => {
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return

      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight

      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (visualizationType !== "3d") return

    const handleClick = (event: MouseEvent) => {
      if (!mountRef.current || !cameraRef.current || !sceneRef.current) return

      const mouse = new THREE.Vector2()
      mouse.x = (event.clientX / mountRef.current.clientWidth) * 2 - 1
      mouse.y = -(event.clientY / mountRef.current.clientHeight) * 2 + 1

      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, cameraRef.current)
      const intersects = raycaster.intersectObjects(sceneRef.current.children)

      if (intersects.length > 0) {
        const clickedNode = intersects[0].object
        if (clickedNode.userData) {
          setSelectedNode(clickedNode.userData as Node)
        }
      }
    }

    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [visualizationType]) // Add visualizationType as a dependency

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, `You: ${inputMessage}`])
      setInputMessage("")
    }
  }

  const filteredNodes = nodes.filter(
    (node) =>
      (!roleFilter || node.role === roleFilter) &&
      (!skillFilter || node.skills.includes(skillFilter)) &&
      (!industryFilter || node.industry === industryFilter),
  )

  useEffect(() => {
    if (!sceneRef.current) return

    Object.values(nodeMeshesRef.current).forEach((mesh) => {
      const node = mesh.userData as Node
      mesh.visible = filteredNodes.some((n) => n.id === node.id)
    })
  }, [filteredNodes])

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
                    Axia AI
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
                    item === "View Network" ? "bg-indigo-600 text-white shadow-md" : "text-slate-700"
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

  <div className="max-w-7xl mx-auto p-8 space-y-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">
        Network Visualization
      </h2>
      <div className="flex gap-4">
        <Select onValueChange={(value) => setRoleFilter(value)}>
          <SelectTrigger className="w-32 bg-white border-indigo-200 hover:border-indigo-400 focus:ring-indigo-200">
            <SelectValue placeholder="Filter by Role" />
          </SelectTrigger>
          <SelectContent className="bg-white border-indigo-100">
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setSkillFilter(value)}>
          <SelectTrigger className="w-32 bg-white border-indigo-200 hover:border-indigo-400 focus:ring-indigo-200">
            <SelectValue placeholder="Filter by Skill" />
          </SelectTrigger>
          <SelectContent className="bg-white border-indigo-100">
            <SelectItem value="SEO">SEO</SelectItem>
            <SelectItem value="Development">Development</SelectItem>
            <SelectItem value="UX Design">UX Design</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setIndustryFilter(value)}>
          <SelectTrigger className="w-32 bg-white border-indigo-200 hover:border-indigo-400 focus:ring-indigo-200">
            <SelectValue placeholder="Filter by Industry" />
          </SelectTrigger>
          <SelectContent className="bg-white border-indigo-100">
            <SelectItem value="Tech">Technology</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Health">Healthcare</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <div className="flex gap-4 justify-end mb-6">
      <Input
        placeholder="Enter spreadsheet link"
        className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200"
        // Add any necessary state handling for the input here
      />
      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
        Upload Data
      </Button>
      <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
        Download Data
      </Button>
    </div>

    <Card className="bg-white shadow-md border border-indigo-100 rounded-lg overflow-hidden">
          <div className="w-full h-[500px] rounded-lg">
            {visualizationType === "3d" ? (
              <NetworkVisualization3D 
                nodes={filteredNodes} 
                links={profiles} 
                selectedNode={selectedNode} 
              />
            ) : (
              <div className="w-full h-full overflow-auto">
                <table className="w-full text-sm text-left text-slate-700">
                  <thead className="text-xs uppercase bg-indigo-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Name</th>
                      <th className="px-6 py-3 font-semibold">Role</th>
                      <th className="px-6 py-3 font-semibold">Industry</th>
                      <th className="px-6 py-3 font-semibold">Skills</th>
                      <th className="px-6 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNodes.map((node) => (
                      <tr key={node.id} className="border-b border-indigo-100 hover:bg-indigo-50/30">
                        <td className="px-6 py-4 font-medium text-slate-800">{node.name}</td>
                        <td className="px-6 py-4">{node.role}</td>
                        <td className="px-6 py-4">{node.industry}</td>
                        <td className="px-6 py-4">{node.skills.join(", ")}</td>
                        <td className="px-6 py-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedNode(node)}
                            className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Card>
    <Card className="bg-white shadow-md border border-indigo-100 rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-medium text-slate-800 border-l-4 border-indigo-600 pl-4">Chat</h2>
      <div className="min-h-[200px] bg-indigo-50/50 rounded-lg p-4 border border-indigo-100">
        {/* Chat messages would go here */}
      </div>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant={visualizationType === "3d" ? "default" : "outline"}
            onClick={() => {
              if (visualizationType !== "3d") {
                // Clean up any existing 3D scene
                if (rendererRef.current) {
                  rendererRef.current.dispose()
                }
                if (sceneRef.current) {
                  sceneRef.current.clear()
                }
                if (mountRef.current?.children[0]) {
                  mountRef.current.removeChild(mountRef.current.children[0])
                }
                setVisualizationType("3d")
              }
            }}
            className={`flex-1 ${
              visualizationType === "3d"
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            3D Web
          </Button>
          <Button
            variant={visualizationType === "list" ? "default" : "outline"}
            onClick={() => {
              if (visualizationType !== "list") {
                // Clean up 3D scene when switching to list
                if (rendererRef.current) {
                  rendererRef.current.dispose()
                }
                if (sceneRef.current) {
                  sceneRef.current.clear()
                }
                if (mountRef.current?.children[0]) {
                  mountRef.current.removeChild(mountRef.current.children[0])
                }
                setVisualizationType("list")
              }
            }}
            className={`flex-1 ${
              visualizationType === "list"
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            List
          </Button>
        </div>
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200"
            placeholder="Type your message..."
          />
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Send</Button>
        </div>
      </div>
    </Card>

    {selectedNode && (
      <Card className="mt-4 bg-white shadow-md border border-indigo-100 rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-white to-indigo-50/30 pb-4">
          <CardTitle className="text-slate-800">Selected Node Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-2">
            <strong className="text-slate-700">Name:</strong> <span className="text-slate-600">{selectedNode.name}</span>
          </p>
          <p className="mb-2">
            <strong className="text-slate-700">Role:</strong> <span className="text-slate-600">{selectedNode.role}</span>
          </p>
          <p className="mb-2">
            <strong className="text-slate-700">Industry:</strong> <span className="text-slate-600">{selectedNode.industry}</span>
          </p>
          <p className="mb-4">
            <strong className="text-slate-700">Skills:</strong> <span className="text-slate-600">{selectedNode.skills.join(", ")}</span>
          </p>
          <div className="mt-4 space-x-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Message</Button>
            <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">View Profile</Button>
          </div>
        </CardContent>
      </Card>
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
    </div>
  )
}

