"use client";

import { useSearch } from "@/context/SearchContext";
import DropDown from "@/reusableComponents/DropDown";
import { KindeUser, LoginLink } from "@kinde-oss/kinde-auth-nextjs";

import { Contact, SearchIcon, ShoppingCart, UserRound } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type props = {
  user: KindeUser<Record<string, any>> | null;
  isLoggedIn: boolean | null;
};

function NavigationBar({ user, isLoggedIn }: props) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const { setSearchQuery } = useSearch();
  const router = useRouter();
  const handleClickLogo = () => {
    router.push("/");
  };

  const pathName = usePathname();

  const profileItems = [
    {
      label: "Profile Details",
      href: "/profile",
      onclick: () => {},
    },
    {
      label: "logout",
      href: "/logout",
      onclick: () => {},
    },
  ];

  return (
    <div className="px-4 py-3 2xl:px-16 xl:py-4 border-b-1 mb-2 border-gray-300 ">
      <div className="flex items-center justify-between gap-2 border-b-[#3643BA]  ">
        <div className=" flex items-center w-[25%]  text-xl p-2">
          <div
            className="text-centre w-1/2 cursor-pointer"
            onClick={() => setDropdown(!dropdown)}
          >
            All Sports
          </div>
          <div className="text-center w-1/2 text-[#3643BA] font-bold cursor-pointer">
            <p onClick={handleClickLogo}>JUSTSHOP</p>
            {/* <NavigationDropdown /> */}
          </div>
        </div>
        <div
          className={
            pathName === "/categories"
              ? "hidden"
              : "w-[50%] flex items-center justify-center border bg-gray-100 rounded-full px-2 hover:cursor-pointer"
          }
        >
          <SearchIcon className="text-gray-500 " size={20} />

          <input
            type="text"
            placeholder="search"
            className=" w-full outline-none  p-2"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex justify-evenly gap-3  w-[25%] items-center">
          <div className="flex flex-col items-center cursor-pointer">
            <div>
              <ShoppingCart size={20} />
            </div>
            <p className="text-sm">Cart</p>
          </div>

          <div
            onClick={() => router.push("/contact")}
            className="flex flex-col items-center cursor-pointer"
          >
            <div>
              <Contact size={20} />
            </div>
            <p className="text-sm">Contact</p>
          </div>

          <div className="flex flex-col items-center cursor-pointer  ">
            {isLoggedIn ? (
              <div className="border rounded-full hover:bg-gray-100 border-gray-500">
                <div className="flex items-center gap-2">
                  <div className="rounded-full w-8 h-8 overflow-hidden">
                    <img
                      src={
                        user?.picture ||
                        "https://www.apple.com/v/imac/u/images/overview/closer-look/colors_pf_yellow__fhckfv6xx8yi_large.jpg"
                      }
                      alt="image"
                    />
                  </div>
                  <div className="text-sm mx-1 ">
                    <DropDown
                      label="Profile"
                      items={profileItems}
                      trigger={<p>{user?.given_name}</p>}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center cursor-pointer">
                <div>
                  <UserRound size={20} />
                </div>
                <LoginLink>
                  <p className="text-sm">Login</p>
                </LoginLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
