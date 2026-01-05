import { AppSidebar } from "@/components/shared/app-sidebar";
import { Header } from "@/components/shared/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main>
          <Suspense>{children}</Suspense>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
