"use client";

import MainLayout from "@/components/MainLayout";
import SidebarLayout from "@/components/SidebarLayout";

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-[#F2F1F1] min-h-screen pb-16">
      <SidebarLayout />
      <MainLayout>{children}</MainLayout>
    </div>
  );
}
