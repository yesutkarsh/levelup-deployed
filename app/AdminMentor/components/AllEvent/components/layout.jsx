"use client"

import { BarChart2, Calendar, Home, Settings, Users } from "lucide-react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "../components/ui/sidebar"

function MainContent({ children }) {
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

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex -mt-[50px] -ml-[15px] min-h-screen bg-white w-full">
        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  )
}
