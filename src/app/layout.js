import "./globals.css";
import { Poppins } from "next/font/google";
import SidebarLayout from "@/components/SidebarLayout";
import MainLayout from "@/components/MainLayout";
import { usePathname } from "next/navigation";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SidebarLayout />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}

function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}

export default function Layout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
