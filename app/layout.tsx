import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import clsx from "clsx";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CarePulse",
  description: "A healthcare platform for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="h-full overflow-clip"
      lang="en"
      suppressHydrationWarning={true}
    >
      <body
        className={clsx(
          "h-full font-sans antialiased flex flex-col max-w-screen-2xl mx-auto bg-background",
          fontSans.variable
        )}
      >
        {/* <ThemeProvider attribute="class" defaultTheme="dark">
          <>
            <div className="sticky top-4 right-0 left-0 bg-dark-500 rounded-lg mt-8 mx-8">
              <div className="flex justify-between px-4">
                <Image
                  src="/assets/icons/logo-full.svg"
                  width={200}
                  height={100}
                  alt="patient"
                  className="object-contain"
                />
                <ThemeToggle />
              </div>
            </div>
            {children}
          </>
        </ThemeProvider> */}
        {
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
        }
      </body>
    </html>
  );
}
