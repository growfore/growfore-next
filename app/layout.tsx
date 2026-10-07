import { Fira_Mono, Google_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Navbar from "@/components/site/navbar"
import Footer from "@/components/site/footer"
import RevealInit from "@/components/reveal-init"

const inter = Google_Sans({ subsets: ["latin"], variable: "--font-sans" })

const firaMono = Fira_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        "font-sans",
        inter.variable,
        firaMono.variable
      )}
    >
      <body>
        <ThemeProvider>
          <Navbar />
          <RevealInit />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
