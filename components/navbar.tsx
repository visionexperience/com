"use client"

import { Instagram, MessageCircle, Menu, X, Home, Users, Grid, LucideImage, Phone, Share2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { TikTokIcon } from "./icons"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import OptimizedImage from "@/components/optimized-image"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detectar scroll para cambiar la apariencia del navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Cerrar el menú cuando se cambia de ruta
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  // Enlaces del menú
  const menuLinks = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/quienes-somos", label: "Quiénes Somos", icon: Users },
    { href: "/catalogo", label: "Catálogo", icon: Grid },
    { href: "/galeria", label: "Galería", icon: LucideImage },
    { href: "/colaboraciones", label: "Colaboraciones", icon: Share2 },
    { href: "/contacto", label: "Contacto", icon: Phone },
  ]

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-[#fbf7e8]/95 shadow-sm" : "bg-[#fbf7e8]/80"
        } backdrop-blur-sm border-b border-[#d6a104]/20`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Botón de menú móvil */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden mr-3 text-[#d6a104] hover:text-[#d6a104]/80 transition-colors focus:outline-none"
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              <Link href="/" className="text-[#d6a104] font-semibold">
                360 Vision Experience
              </Link>
            </div>

            {/* Menú de navegación para pantallas medianas y grandes */}
            <div className="hidden md:flex space-x-8">
              {menuLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[#d6a104] hover:text-[#d6a104]/80 transition-all duration-300 transform hover:scale-110 ${
                    pathname === link.href ? "font-bold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Redes sociales */}
            <div className="flex items-center space-x-4">
              <Link
                href="https://www.instagram.com/360visionexperience/"
                target="_blank"
                className="text-[#d6a104] hover:text-[#d6a104]/80 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.tiktok.com/@360visionexperience"
                target="_blank"
                className="text-[#d6a104] hover:text-[#d6a104]/80 transition-colors"
              >
                <TikTokIcon className="h-5 w-5" />
                <span className="sr-only">TikTok</span>
              </Link>
              <Link
                href="https://wa.me/34651533976"
                target="_blank"
                className="text-[#d6a104] hover:text-[#d6a104]/80 transition-colors flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="hidden sm:inline">+34 651 53 39 76</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Menú móvil desplegable */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Overlay para cerrar el menú al hacer clic fuera */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Panel del menú - Mejorado con más espaciado */}
            <motion.div
              className="absolute top-0 left-0 h-full w-[300px] bg-black shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cabecera del menú con el nuevo logo */}
              <div className="p-8 border-b border-[#d6a104]/20">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-[#d6a104]">Menú</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#d6a104] hover:text-[#d6a104]/80 transition-colors p-2"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="relative w-40 h-40 mx-auto mb-4">
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <OptimizedImage
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4740-wY0EHxCA7pVz8bh9aFdIYU1DkjfO3A.png"
                      alt="360 Vision Experience Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </Link>
                </div>
              </div>

              {/* Enlaces del menú - Mejorado con más espaciado */}
              <div className="p-6">
                <ul className="space-y-4">
                  {menuLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-4 px-5 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-base ${
                          pathname === link.href
                            ? "bg-[#d6a104]/10 text-[#d6a104] font-medium"
                            : "text-[#d6a104]/90 hover:bg-[#d6a104]/5 hover:text-[#d6a104]"
                        }`}
                      >
                        <link.icon className="h-5 w-5 flex-shrink-0" />
                        <span className="tracking-wide">{link.label}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Se ha eliminado la sección de redes sociales */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

