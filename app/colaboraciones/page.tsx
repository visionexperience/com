"use client"

import { motion } from "framer-motion"
import { ExternalLink, Instagram, Share2 } from "lucide-react"
import OptimizedImage from "@/components/optimized-image"
import Link from "next/link"
import { useState } from "react"

// Datos actualizados para las colaboraciones
const collaborations = [
  {
    id: 1,
    name: "Finca Los Almendros",
    description: "Espacio exclusivo para eventos y celebraciones en un entorno natural único",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YNJrwWHkj2tYc1R5SszCrQcuQIWWwa.png",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YNJrwWHkj2tYc1R5SszCrQcuQIWWwa.png",
    website: "https://fincalosalmendros.com/?page_id=953",
    instagram: "https://www.instagram.com/complejorurallosalmendros?igsh=MTVneXplaGxzMGcycQ%3D%3D",
    tiktok: "https://www.tiktok.com/@complejorurallosalmendro?_t=ZG-8t65YFdzJk9&_r=1",
    type: "venue",
  },
  {
    id: 2,
    name: "DAVIDLLB",
    description: "Grupo musical que crea experiencias sonoras únicas para tus eventos",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mE5ICbY621PHyOf31FHSl45MRgFl8e.png",
    instagram: "https://www.instagram.com/daviddllacer?igsh=MXhka2J6aW5wOXZnNw%3D%3D",
    type: "music",
  },
]

export default function ColaboracionesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false) // Nuevo estado para el menú móvil
  return (
    <div className="min-h-screen bg-[#fff6ea] pt-16">
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-16 pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#d6a104] mb-4 sm:mb-6">
            Nuestras Colaboraciones
          </h1>
          <p className="text-base sm:text-lg text-[#d6a104]/80 max-w-2xl mx-auto">
            Trabajamos con los mejores para ofrecerte experiencias únicas y memorables
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-transparent via-[#d6a104] to-transparent mx-auto mt-4 sm:mt-6" />
        </motion.div>

        {/* Collaboration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Finca Los Almendros */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="group"
          >
            <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl h-full">
              {/* Logo Image */}
              <div className="relative p-6 sm:p-12 bg-gradient-to-b from-white via-white to-white/50">
                <div className="relative aspect-square max-w-[200px] sm:max-w-[300px] mx-auto">
                  <OptimizedImage
                    src={collaborations[0].image || "/placeholder.svg"}
                    alt={collaborations[0].name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 pt-0">
                <h2 className="text-xl sm:text-2xl font-medium text-[#d6a104] mb-2 sm:mb-3">
                  {collaborations[0].name}
                </h2>
                <p className="text-sm sm:text-base text-[#d6a104]/80 mb-4 sm:mb-6">{collaborations[0].description}</p>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <Link
                    href={collaborations[0].website}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-[#d6a104]/10 hover:bg-[#d6a104]/20 text-[#d6a104] px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visitar sitio web
                  </Link>

                  <Link
                    href={collaborations[0].instagram}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-[#d6a104] px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </Link>

                  <Link
                    href={collaborations[0].tiktok}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-black/5 to-black/10 hover:from-black/10 hover:to-black/20 text-[#d6a104] px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-1.162-1.264-1.314-2.705-1.390-3.338h.003c-.075-.633-.075-1.197-.075-1.197h-3.764v13.578c0 .714-.266 1.378-.766 1.878s-1.164.766-1.878.766-1.378-.266-1.878-.766-.766-1.164-.766-1.878 266-1.378.766-1.878 1.164-.766 1.878-.766c.246 0 .49.031.728.094v-3.788c-.24-.032-.481-.048-.728-.047-1.562 0-3.052.609-4.152 1.709s-1.709 2.59-1.709 4.152.609 3.052 1.709 4.152 2.59 1.709 4.152 1.709 3.052-.609 4.152-1.709 1.709-2.59 1.709-4.152V8.338c1.139.772 2.476 1.197 3.841 1.197v-3.786c-.021 0-.041.003-.062.003-.323 0-1.522-.052-2.638-.59z" />
                    </svg>
                    TikTok
                  </Link>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d6a104]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d6a104]/20 to-transparent" />
            </div>
          </motion.div>

          {/* DAVIDLLB */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group"
          >
            <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl h-full">
              {/* Logo Image */}
              <div className="relative p-6 sm:p-12 bg-gradient-to-b from-black via-black to-black/90">
                <div className="relative aspect-square max-w-[200px] sm:max-w-[300px] mx-auto">
                  <OptimizedImage
                    src={collaborations[1].image || "/placeholder.svg"}
                    alt={collaborations[1].name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-medium text-[#d6a104] mb-2 sm:mb-3">
                  {collaborations[1].name}
                </h2>
                <p className="text-sm sm:text-base text-[#d6a104]/80 mb-4 sm:mb-6">{collaborations[1].description}</p>

                <Link
                  href={collaborations[1].instagram}
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-[#d6a104] px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <Instagram className="w-4 h-4" />
                  Seguir en Instagram
                </Link>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d6a104]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d6a104]/20 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-light text-[#d6a104] mb-6">¿Interesado en colaborar?</h3>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-[#d6a104] text-white px-8 py-3 rounded-full hover:bg-[#d6a104]/90 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span>Contacta con nosotros</span>
          </Link>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, #d6a104 0%, transparent 70%)",
              "radial-gradient(circle at 80% 80%, #d6a104 0%, transparent 70%)",
              "radial-gradient(circle at 20% 20%, #d6a104 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-0 opacity-[0.03]"
        />
      </div>
    </div>
  )
}

