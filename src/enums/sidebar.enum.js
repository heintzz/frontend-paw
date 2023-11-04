import DashboardIcon from "public/assets/dashboardIcon.png";
import ExpenseIcon from "public/assets/expenseIcon.png";
import FnewsIcon from "public/assets/fNewsIcon.png";
import GoalIcon from "public/assets/goalsIcon.png";
import IncomeIcon from "public/assets/incomeIcon.png";

export const sidebarItems = [
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

export const sidebarItemsOnSmallScreen = [
  {
    name: "F-News",
    icon: FnewsIcon,
    path: "/news",
  },
  {
    name: "Expense",
    icon: ExpenseIcon,
    path: "/expense",
  },
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
    name: "Goal",
    icon: GoalIcon,
    path: "/goal",
  },
];
