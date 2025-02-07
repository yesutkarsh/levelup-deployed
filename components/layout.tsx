"use client"

import { BarChart2, Calendar, Home, Settings, Users } from "lucide-react"
import Link from "next/link"
import type React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar"

function MainContent({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar()

  return (
    <main
      className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${
        state === "expanded" ? "ml-0" : "ml-0"
      }`}
    >
      {children}
    </main>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-white w-full">
        <Sidebar className="border-r fixed left-0 top-0 h-full z-30">
          <SidebarHeader className="border-b p-6">
            <Link href="/" className="text-blue-600 text-2xl font-bold">
              88
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard" className="flex items-center gap-3">
                    <Home className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/statistics" className="flex items-center gap-3">
                    <Users className="w-5 h-5" />
                    <span>Statistics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <Link href="/events" className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <span>Events</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/posts" className="flex items-center gap-3">
                    <BarChart2 className="w-5 h-5" />
                    <span>Posts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/analytics" className="flex items-center gap-3">
                    <Settings className="w-5 h-5" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  )
}
