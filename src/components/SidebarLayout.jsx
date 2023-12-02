"use client";

import { tokenServices } from "@/services/token.service";
import { useSidebarStore } from "@/stores/sidebar.store";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

import { sidebarItems, sidebarItemsOnSmallScreen } from "@/enums/sidebar.enum";

import FintrackLogo from "public/assets/fintrackLogo.png";
import { GiHamburgerMenu } from "react-icons/gi";

import "@/styles/SidebarLayout.css";

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
    <>
      <SmallScreenSidebar activeMenu={checkActiveMenu} />
      <MediumScreenSidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        activeMenu={checkActiveMenu}
      />
    </>
  );
}

const SmallScreenSidebar = ({ activeMenu }) => {
  return (
    <div className="fixed bottom-0 w-screen h-20 z-10 bg-[#080325] flex justify-around items-center md:hidden">
      {sidebarItemsOnSmallScreen.map((item, index) => {
        const { name, icon, path } = item;
        const isActiveMenu = activeMenu(name, path);

        return (
          <Link key={index} href={path}>
            <div className={`${isActiveMenu ? "mb-4" : ""}`}>
              <Image src={icon} alt={`${name} Icon`} width="auto" height="auto" />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const MediumScreenSidebar = ({ showSidebar, setShowSidebar, activeMenu }) => {
  const router = useRouter();
  return (
    <div className={`sidebar ${showSidebar ? "" : "close"} hidden md:flex `}>
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
          let isActiveMenu = activeMenu(name, path);
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
        <div
          className="item"
          onClick={() => {
            tokenServices.removeAccessToken();
            router.push("/dashboard");
          }}
        >
          <Image
            className="icon-chat"
            src="/assets/logoutIcon.png"
            alt="Menu Icon"
            width={22}
            height={22}
          />
          {showSidebar && <div className="text-base ">Logout</div>}
        </div>
      </div>
    </div>
  );
};
