"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    router.push(`/?search=${searchQuery}`);
  };

  return (
    <header className="flex flex-wrap items-center justify-around pad-y-2 p-4 bg-black text-white relative">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/">
          <Image src="/logo.png" width={60} height={60} alt="Logo" />
        </Link>
      </div>

      {/* Hamburger - shown only on small screens */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } w-full md:flex md:items-center md:w-auto md:space-x-6 text-lg font-semibold`}
      >
        <div className="flex flex-col justify-between font-semibold w-100 md:flex-row pad-x md:space-y-0 md:space-x-6 mt-4 md:mt-0">
          <Link href="/">Popular</Link>
          <Link href="/topRated">Top Rated</Link>
          <Link href="/Upcoming">Upcoming</Link>
        </div>

        {/* Search */}
        <div className="mt-4 md:mt-0 md:ml-4 flex items-center">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="pad-x pad-y-2 rounded-l-md text-white bg-gray-800"
            />
            <button
              type="submit"
              className="pad-x pad-y-2 bg-gray-700 rounded-r-md hover:bg-gray-600"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
