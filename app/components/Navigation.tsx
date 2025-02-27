"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  Briefcase,
  User,
  LogOut,
  Video,
  Gift,
  Newspaper,
  MessageSquare,
  CreditCard,
  LogIn,
  Wallet,
  Store,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { Notifications } from "./Notifications"
import { useAuth } from "../contexts/AuthContext"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, setIsAuthenticated } = useAuth()

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("isAuthenticated")
    router.push("/signin")
  }

  const navItems = isAuthenticated
    ? [
        { href: "/dashboard", label: "Dashboard", icon: Home },
        { href: "/tasks", label: "Tasks", icon: Briefcase },
        { href: "/videos", label: "Videos", icon: Video },
        { href: "/promotions", label: "Promotions", icon: Gift },
        { href: "/news", label: "News", icon: Newspaper },
        { href: "/chat", label: "Chat", icon: MessageSquare },
        { href: "/wallet", label: "Wallet", icon: Wallet },
        { href: "/payment-methods", label: "Payment Methods", icon: CreditCard },
        { href: "/profile", label: "Profile", icon: User },
        { href: "/store", label: "Store", icon: Store },
      ]
    : [
        { href: "/", label: "Home", icon: Home },
        { href: "/signin", label: "Sign In", icon: LogIn },
      ]

  return (
    <nav className="flex items-center space-x-4">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button variant={pathname === item.href ? "secondary" : "ghost"} className="flex items-center space-x-2">
            <item.icon className="h-4 w-4" />
            <span className="hidden md:inline">{item.label}</span>
          </Button>
        </Link>
      ))}
      {isAuthenticated && (
        <>
          <Notifications />
          <ThemeToggle />
          <Button variant="ghost" className="flex items-center space-x-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </>
      )}
    </nav>
  )
}

