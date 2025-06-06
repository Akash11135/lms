"use client";

import { useSearch } from "@/context/SearchContext";
import DropDown from "@/reusableComponents/DropDown";
import { KindeUser, LoginLink } from "@kinde-oss/kinde-auth-nextjs";

import {
  CirclePercentIcon,
  Contact,
  SearchIcon,
  ShoppingCart,
  UserRound,
} from "lucide-react";
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

  const handleClickCart = () => {
    router.push(`/cart`);
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
    <div className="px-4 py-3 2xl:px-16 xl:py-4 border-b border-gray-300 max-sm:border-none">
      <div className="flex items-center justify-between gap-2 max-sm:flex-col max-sm:gap-2">
        <div className="max-sm:flex  max-sm:gap-2 w-full  sm:flex sm:gap-2">
          <div className="flex items-center text-xl p-2 max-md:w-fit max-md:justify-between max-sm:text-sm  sm:w-[40%]  ">
            <div
              className="text-center w-1/2 cursor-pointer max-sm:hidden"
              onClick={() => setDropdown(!dropdown)}
            >
              All Sports
            </div>

            <div className="text-center p-1 rounded-md bg-black text-white font-bold cursor-pointer flex items-center gap-2 max-sm:text-sm max-sm:w-fit">
              <CirclePercentIcon />
              <p onClick={handleClickLogo} className="max-md:hidden">
                JUSTSHOP
              </p>
            </div>
          </div>

          {pathName !== "/categories" && (
            <div className="w-full flex items-center justify-center  bg-gray-100 rounded-full px-2 hover:cursor-pointer max-sm:text-sm sm:w-[60%]">
              <SearchIcon className="text-gray-500" size={20} />
              <input
                type="text"
                placeholder="search"
                className="w-full outline-none p-2 max-sm:text-sm"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Right Section (Icons + Profile) */}
        <div className="flex justify-evenly  gap-3 w-[25%] items-center max-sm:border max-sm:border-gray-300 max-sm:w-full max-sm:p-1 max-sm:rounded-lg max-sm:justify-evenly sm:p-2">
          <div
            className="flex flex-col items-center cursor-pointer max-sm:text-xs"
            onClick={handleClickCart}
          >
            <ShoppingCart size={20} />
            <p className="text-sm max-sm:text-xs">Cart</p>
          </div>

          <div
            onClick={() => router.push("/contact")}
            className="flex flex-col items-center cursor-pointer max-sm:text-xs"
          >
            <Contact size={20} />
            <p className="text-sm max-sm:text-xs">Contact</p>
          </div>

          <div className="flex flex-col items-center cursor-pointer max-sm:text-xs">
            {isLoggedIn ? (
              <div className="border rounded-full hover:bg-gray-100 border-gray-500 ">
                <DropDown
                  label="Profile"
                  items={profileItems}
                  trigger={
                    <div className="flex items-center gap-2">
                      <div className="rounded-full w-8 h-8 overflow-hidden">
                        <img
                          src={
                            user?.picture ||
                            "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/12027436/2022/9/15/ea90445c-a37b-43ac-948b-8e291ec78dc31663221311972LevisMenWhiteSolidRoundNeckLoungeT-shirt1.jpg"
                          }
                          alt="user"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Hide name on small screens */}
                      <p className="text-sm mx-1 max-lg:hidden max-sm:hidden">
                        👋, {user?.given_name}
                      </p>
                    </div>
                  }
                />
              </div>
            ) : (
              <div className="flex flex-col items-center cursor-pointer max-sm:text-xs">
                <UserRound size={20} />
                <LoginLink>
                  <p className="text-sm max-sm:text-xs">Login</p>
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
