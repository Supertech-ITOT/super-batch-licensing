import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../common/lib/utils";
import { Toaster } from "../common/components/ui/sonner";
import QueryProvider from "../common/providers/query-provider";
import AuthGuardProvider from "@/common/providers/auth-guard-provider";
import { SidebarProvider } from "@/common/components/navigation/sidebar-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Super Batch",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-screen sm:h-screen sm:overflow-hidden">
        <QueryProvider>
          <AuthGuardProvider>
            <SidebarProvider>
              <div className="flex h-full flex-col">
                <main className="flex-1 overflow-hidden">{children}</main>
              </div>
            </SidebarProvider>
            <Toaster richColors position="bottom-right" />
          </AuthGuardProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
