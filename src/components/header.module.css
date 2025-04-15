"use client";

import { usePathname } from "next/navigation"; // Get the current route
import Navbar from "@/components/Header";       // Assuming Navbar component is inside components/Navbar
import { ReactNode } from "react";

export default function ClientWrapper({ children, hideNavbar = false }: { children: ReactNode, hideNavbar?: boolean }) {
  const pathname = usePathname(); // Get the current route
  const id = Math.random().toString(36).substring(7);
console.log(`ClientWrapper ${id} - hideNavbar prop:`, hideNavbar);

  // Paths where the Navbar should be hidden (signin, signup, etc.)
  const hideNavbarOn = ["/signin", "/signup"];  // Hide navbar on signin and signup routes

  // Log pathname for debugging
  console.log("Current Pathname:", pathname);
  console.log("hideNavbar prop:", hideNavbar);

  // Determine if navbar should be hidden
  const shouldHideNavbar = hideNavbar || hideNavbarOn.includes(pathname);

  return (
    <>
      {/* Only show Navbar if it's not in the hide list */}
      {!shouldHideNavbar && <Navbar />}
      {children}
    </>
  );
}
