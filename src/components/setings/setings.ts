import {
    HomeIcon,
    UserGroupIcon,
    FolderIcon,
    CogIcon,
  } from "@heroicons/react/outline"; // Use os ícones do pacote que preferir
  
export const sidebarNavigationItens = [
    { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
    { name: "Team", href: "#", icon: UserGroupIcon, current: false },
    { name: "Projects", href: "#", icon: FolderIcon, current: false },
    { name: "Settings", href: "#", icon: CogIcon, current: false },
  ];