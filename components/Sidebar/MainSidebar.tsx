import React from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import { Logo } from "../icons";
import { sidebarNavigationItens } from "../setings/setings";
import { OrganizationModal } from "../Modal/OrganizationModal";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  return (
    <div className="hidden md:flex md:flex-shrink-0 ">
      <div className="flex flex-col bg-white w-64">
        {/* Sidebar component, split into logo and navigation */}
        <Navbar isBordered maxWidth="full" className="bg-default-200" > 
          <NavbarBrand>
          <OrganizationModal />
          </NavbarBrand>
        </Navbar>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
            {sidebarNavigationItens.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-gray-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
