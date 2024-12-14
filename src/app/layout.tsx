import HeaderAuth from "@/components/extra/header-auth";
import { ThemeSwitcher } from "@/components/extra/theme-switcher";
import { Montserrat } from "next/font/google"; // Import Montserrat font
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/homeComponents/header";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"], 
  variable: "--font-montserrat", 
});

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
    <html lang="en" className={montserrat.className} suppressHydrationWarning>
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
