"use client";

import MainLayout from "@/components/MainLayout";
import SidebarLayout from "@/components/SidebarLayout";

export default function DashboardLayout({ children }) {
  return (
    <>
      <SidebarLayout />
      <MainLayout>{children}</MainLayout>
    </>
  );
}
