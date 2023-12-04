"use client";

// import GlobalState from "@/context";
import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "../components/sidebar/index";
import { usePathname, useRouter } from "next/navigation";
import Header from "../components/header";
// import Header from "@/components/header";
// import NextAuthProvider from "@/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathName = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <NextAuthProvider> */}
        {/* <GlobalState> */}
        <div className="flex h-screen overflow-hidden">
          {pathName.includes("/home") ? <Sidebar /> : null}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {pathName.includes("/home") ? <Header /> : null}
            <main>
              <div className="mx-auto max-w-screen-2xl">{children}</div>
            </main>
          </div>
        </div>
        {/* </GlobalState> */}
        {/* </NextAuthProvider> */}
      </body>
    </html>
  );
}
