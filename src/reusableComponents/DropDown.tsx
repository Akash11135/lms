"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

type DropDownItems = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type DropDownProps = {
  label: string;
  items?: DropDownItems[];
  trigger: React.ReactNode; // <- required to open the menu
};

function DropDown({ label, items, trigger }: DropDownProps) {
  const router = useRouter();

  const handleClick = (item: DropDownItems) => {
    if (item.onClick) item.onClick();
    if (item.href && item.label !== "logout") router.push(item.href);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items?.map((item, index) => (
          <DropdownMenuItem key={index} onClick={() => handleClick(item)}>
            {/* {item.label} */}
            {item.label === "logout" ? (
              <LogoutLink>{item.label}</LogoutLink>
            ) : (
              item.label
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDown;
