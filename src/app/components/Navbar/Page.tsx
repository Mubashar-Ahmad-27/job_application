'use client'
import React from "react"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@heroui/react"
import Image from 'next/image'

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Profile", "Jobs", "Companies", "Log Out"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-black text-white">
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
        <NavbarBrand className="cursor-pointer">
          <Link href="/">
              <Image src="/images/logo.jpeg" alt="LOGO" width={80} height={30} />
              <p className="font-bold text-white">HERE</p>
           </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link className="font-medium text-white" href="/"> Jobs </Link>
        </NavbarItem>

        <NavbarItem>
          <Link className="font-medium text-white" href="/Company"> Companies </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login" className="bg-yellow-500 text-white font-medium rounded p-2 px-3">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="bg-blue-700 text-white font-medium rounded p-2" href="/signup"> Sign Up </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" color={index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"} href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
