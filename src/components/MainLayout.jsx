import { useSidebarStore } from "@/stores/sidebar.store";

export default function MainLayout({ children }) {
  const showSidebar = useSidebarStore((state) => state.showSidebar);
  const padding = showSidebar ? "md:pl-[300px]" : "md:pl-[100px]";
  return <div className={padding}>{children}</div>;
}
