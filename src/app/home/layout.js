import { Inter } from "next/font/google";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden h-[100%]">
          <Sidebar />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header />
            <div>
              <div className="mx-auto max-w-screen-2xl">{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
