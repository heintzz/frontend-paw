import Image from "next/image";
import "../styles/SidebarLayout.css";

export default function SidebarLayout() {
  return <div className="sidebar">
    <div className="header">
      <div className="logo-container">
        <Image src="/assets/fintrackLogo.png" alt="Fintrack Logo" width={25.32} height={29.82}/>
        <div className="app-name">Fintrack</div>
      </div>
      <div className="menu-button">
        <Image src="/assets/menuIcon.png" alt="Menu Icon" width={12.76} height={10.94}/>
      </div>
    </div>
    <div className="main-navigation">
      <div className="item">
        <div className="icon-text">
          <Image className="icon-chat" src="/assets/dashboardIcon.png" alt="Menu Icon" width={30} height={30}/>
          <div className="chat">Dashboard</div>
        </div>
      </div>
      <div className="item">
        <div className="icon-text">
          <Image className="icon-chat" src="/assets/incomeIcon.png" alt="Menu Icon" width={30} height={30}/>
          <div className="chat">Income</div>
        </div>
      </div>
      <div className="item">
        <div className="icon-text">
          <Image className="icon-chat" src="/assets/expenseIcon.png" alt="Menu Icon" width={30} height={30}/>
          <div className="chat">Expense</div>
        </div>
      </div>
      <div className="item">
        <div className="icon-text">
          <Image className="icon-chat" src="/assets/goalsIcon.png" alt="Menu Icon" width={30} height={30}/>
          <div className="chat">Goals</div>
        </div>
      </div>
      <div className="item">
        <div className="icon-text">
          <Image className="icon-chat" src="/assets/fNewsIcon.png" alt="Menu Icon" width={30} height={30}/>
          <div className="chat">F-News</div>
        </div>
      </div>
    </div>
    <div className="footer">
      <div className="item">
        <div className="icon-text">
          <Image className="icon-chat" src="/assets/logoutIcon.png" alt="Menu Icon" width={22} height={22}/>
          <div className="chat">Logout</div>
        </div>
      </div>
    </div>
  </div>;
}
