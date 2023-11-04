"use client";

import { tokenServices } from "@/services/token.service";
import { useSidebarStore } from "@/stores/sidebar.store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import DashboardIcon from "public/assets/dashboardIcon.png";
import ExpenseIcon from "public/assets/expenseIcon.png";
import FnewsIcon from "public/assets/fNewsIcon.png";
import FintrackLogo from "public/assets/fintrackLogo.png";
import GoalIcon from "public/assets/goalsIcon.png";
import IncomeIcon from "public/assets/incomeIcon.png";
import { GiHamburgerMenu } from "react-icons/gi";

import { useShallow } from "zustand/react/shallow";
import "../styles/SidebarLayout.css";

const sidebarItems = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    path: "/",
  },
  {
    name: "Income",
    icon: IncomeIcon,
    path: "/income",
  },
  {
    name: "Expense",
    icon: ExpenseIcon,
    path: "/expense",
  },
  {
    name: "Goal",
    icon: GoalIcon,
    path: "/goal",
  },
  {
    name: "F-News",
    icon: FnewsIcon,
    path: "/news",
  },
];

export default function SidebarLayout() {
  const { showSidebar, setShowSidebar } = useSidebarStore(
    useShallow((state) => ({
      showSidebar: state.showSidebar,
      setShowSidebar: state.setShowSidebar,
    }))
  );

  const pathname = usePathname();

  const checkActiveMenu = (name, path) => {
    if (name === "Dashboard") {
      return pathname === path;
    } else {
      return pathname.startsWith(path);
    }
  };

  return (
    <div className={`sidebar ${showSidebar ? "" : "close"}`}>
      <div className={`header ${showSidebar ? "" : "close"}`}>
        {showSidebar && (
          <>
            <Image src={FintrackLogo} alt="Fintrack Logo" width={25.32} height={29.82} />
            <div className="app-name">Fintrack</div>
          </>
        )}
        <div className="hamburger-menu" onClick={() => setShowSidebar(showSidebar)}>
          <GiHamburgerMenu fill="white" size="1.5em" />
        </div>
      </div>
      <div className="main-navigation">
        {sidebarItems.map((item, index) => {
          const { name, icon, path } = item;
          let isActiveMenu = checkActiveMenu(name, path);
          return (
            <Link key={index} href={path}>
              <div className={`item ${isActiveMenu && "selected"}`}>
                <Image
                  className="icon-chat"
                  src={icon}
                  alt={`${name} Icon`}
                  width={30}
                  height={30}
                />
                {showSidebar && name}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="footer">
        <Link href="/login" onClick={tokenServices.removeAccessToken} className="item">
          <Image
            className="icon-chat"
            src="/assets/logoutIcon.png"
            alt="Menu Icon"
            width={22}
            height={22}
          />
          {showSidebar && "Logout"}
        </Link>
      </div>
    </div>
  );
}
