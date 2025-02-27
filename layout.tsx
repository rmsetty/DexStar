import type React from "react"
import "@/styles/globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <div className="min-h-screen bg-background font-sans antialiased">{children}</div>
      </body>
    </html>
  )
}

