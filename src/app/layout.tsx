import HeaderAuth from "@/components/extra/header-auth";
import { ThemeSwitcher } from "@/components/extra/theme-switcher";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/homeComponents/header";

export const metadata = {
  title: "Connect किसान",
  description: "KEC Hackathon 32 Hours",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastContainer />
          <div className="flex fixed right-4 top-4 z-10">
            <ThemeSwitcher />
          </div>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
