"use client";
import Image from "next/image";
import "../styles/SidebarLayout.css";
import { useState } from "react";

export default function SidebarLayout() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const isItemSelected = (item) => {
    return item === selectedItem ? "selected" : "";
  };

  return (
    <div className="sidebar">
      <div className="header">
        <div className="logo-container">
          <Image
            src="/assets/fintrackLogo.png"
            alt="Fintrack Logo"
            width={25.32}
            height={29.82}
          />
          <div className="app-name">Fintrack</div>
        </div>
      </div>
      <div className="main-navigation">
        <div
          className={`item ${isItemSelected("Dashboard")}`}
          onClick={() => handleItemClick("Dashboard")}
        >
          <div className="icon-text">
            <Image
              className="icon-chat"
              src="/assets/dashboardIcon.png"
              alt="Menu Icon"
              width={30}
              height={30}
            />
            <div className="chat">Dashboard</div>
          </div>
        </div>
        <div
          className={`item ${isItemSelected("Income")}`}
          onClick={() => handleItemClick("Income")}
        >
          <div className="icon-text">
            <Image
              className="icon-chat"
              src="/assets/incomeIcon.png"
              alt="Menu Icon"
              width={30}
              height={30}
            />
            <div className="chat">Income</div>
          </div>
        </div>
        <div
          className={`item ${isItemSelected("Expense")}`}
          onClick={() => handleItemClick("Expense")}
        >
          <div className="icon-text">
            <Image
              className="icon-chat"
              src="/assets/expenseIcon.png"
              alt="Menu Icon"
              width={30}
              height={30}
            />
            <div className="chat">Expense</div>
          </div>
        </div>
        <div
          className={`item ${isItemSelected("Goals")}`}
          onClick={() => handleItemClick("Goals")}
        >
          <div className="icon-text">
            <Image
              className="icon-chat"
              src="/assets/goalsIcon.png"
              alt="Menu Icon"
              width={30}
              height={30}
            />
            <div className="chat">Goals</div>
          </div>
        </div>
        <div
          className={`item ${isItemSelected("Fnews")}`}
          onClick={() => handleItemClick("Fnews")}
        >
          <div className="icon-text">
            <Image
              className="icon-chat"
              src="/assets/fNewsIcon.png"
              alt="Menu Icon"
              width={30}
              height={30}
            />
            <div className="chat">F-News</div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="item">
          <div className="icon-text">
            <Image
              className="icon-chat"
              src="/assets/logoutIcon.png"
              alt="Menu Icon"
              width={22}
              height={22}
            />
            <div className="chat">Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
}
