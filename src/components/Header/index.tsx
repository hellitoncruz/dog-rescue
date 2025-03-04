"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PawPrint, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <PawPrint className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Dog Rescue</span>
        </a>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="/" className="text-sm font-medium">
            Home
          </a>
          <a href="/dogs" className="text-sm font-medium">
            Dogs
          </a>
          <Button>
            <a href="/form">Ajude um cão</a>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button className="bg-white" variant="ghost" size="sm">
              <Menu className="h-6 w-6" />
              <span className="sr-only bg-white">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent  side="right" className="w-[250px] sm:w-[300px] menu-container">
            <div className="flex justify-center flex-col gap-8 mt-10">
              <a href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Home
              </a>
              <a href="/dogs" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Dogs
              </a>
              <Button className="w-full justify-center" onClick={() => setIsOpen(false)}>
                <a href="/form">Ajude um cão</a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

