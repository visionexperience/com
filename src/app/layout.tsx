import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Navbar } from "@/components/layout/navbar"
import "@/styles/globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "360 Vision Experience | Eventos Únicos",
  description:
    "Creamos experiencias únicas para tus eventos especiales. Planificación de eventos y espectáculos personalizados.",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={montserrat.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

