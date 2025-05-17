"use client";
import DropDown from "@/reusableComponents/DropDown";
import { Contact, SearchIcon, ShoppingCart, UserRound } from "lucide-react";
import React, { useState } from "react";

function NavigationBar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="px-4 py-3 2xl:px-16 xl:py-4">
      <div className="flex items-center justify-between gap-2 border-b-[#3643BA]  ">
        <div className=" flex items-center w-[25%]  text-xl p-2">
          <div className="text-centre w-1/2 cursor-pointer">All Sports</div>
          <div className="text-center w-1/2 text-[#3643BA] font-bold">
            JUSTSHOP
          </div>
        </div>
        <div className="w-[50%] flex items-center justify-center border bg-gray-100 rounded-full px-2 hover:cursor-pointer">
          <SearchIcon className="text-gray-500 " size={20} />
          <input
            type="text"
            placeholder="search"
            className="w-full outline-none  p-2     "
          />
        </div>
        <div className="flex justify-evenly gap-3  w-[25%] items-center">
          <div className="flex flex-col items-center cursor-pointer">
            <div className=" ">
              <UserRound size={20} />
            </div>
            <p className="text-sm ">Login</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <div>
              <ShoppingCart size={20} />
            </div>
            <p className="text-sm">Cart</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <div>
              <Contact size={20} />
            </div>
            <p className="text-sm">Contact</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
