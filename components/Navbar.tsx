"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import LogoMinato from "./LogoMinato";
import { UserIcon } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 py-4 px-4 md:px-8 z-50 transition-all duration-300 ${
        scrolled ? "shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl md:text-3xl font-serif font-bold text-gray-800">
          <LogoMinato />
        </div>
        <div className="flex-grow flex justify-center">
          <div className="flex space-x-4 items-center justify-center">
            {["pricing", "search"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium text-lg relative group inline-block"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
            <div className="flex">
              <Link href="/" className="flex text-gray-700 hover:text-gray-900 font-medium text-lg relative group">
                <UserIcon className="w-5 h-5 cursor-pointer" />
                Login
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[100px]"></div>
      </div>
      <div className="absolute top-0 left-0 right-0 h-[2px] whatsapp-status-bar"></div>
    </nav>
  );
}
