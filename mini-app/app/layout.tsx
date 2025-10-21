import "./globals.css";
import { Inter } from "next/font/google";
import { MiniAppProvider } from "@/components/context/miniapp-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Disney Princess Quiz",
  description: "Find out which Disney princess you are most similar to by answering 5 fun questions!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MiniAppProvider>
          {children}
        </MiniAppProvider>
      </body>
    </html>
  );
}
