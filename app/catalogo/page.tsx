"use client"

import { motion } from "framer-motion"
import { MessageCircle, Sparkles } from "lucide-react"
import OptimizedImage from "@/components/optimized-image"
import Link from "next/link"
import { useState } from "react"

// Datos del catálogo
const catalogData = {
  "Plataforma 360º": {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2020.36.33-s2l2aC4RT0BvgUoVkgIPinykZKYUMJ.jpeg",
    title: "Plataforma 360º",
    description: "Captura momentos únicos desde todos los ángulos con nuestra innovadora plataforma giratoria.",
    features: [
      "Plataforma giratoria profesional con control de velocidad",
      "De 1 a 3 azafatos por evento",
      "Aro de luz LED de alta calidad con control RGB",
      "Sistema de grabación simultánea multi-dispositivo",
      "Personalización completa de la decoración",
      "Iluminación ambiental LED programable",
      "Espacio para props y accesorios",
    ],
    details:
      "Nuestra plataforma 360º es el centro de atención en cualquier evento. Permite crear contenido espectacular mientras tus invitados disfrutan de una experiencia única. Perfecta para bodas, eventos corporativos, fiestas temáticas y cualquier celebración especial.",
  },
  "Teléfono Audiolibro": {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2020.36.37%20%281%29-CcVAyJebUuWyRmseJ1sMCJjtRFwWvF.jpeg",
    title: "Teléfono Audiolibro",
    description: "Un viaje en el tiempo que combina nostalgia y tecnología para crear momentos inolvidables.",
    features: [
      "Teléfono vintage restaurado",
      "Sistema de audio digital integrado",
      "Grabación de mensajes personalizada",
      "Iluminación ambiental con LED",
      "Decoración temática adaptable",
      "Interfaz de control intuitiva",
    ],
    details:
      "El Teléfono Audiolibro es más que una pieza decorativa; es una experiencia interactiva que permite a tus invitados dejar y escuchar mensajes especiales. Perfecto para libro de visitas en bodas, mensajes corporativos o cualquier evento donde quieras crear recuerdos únicos.",
  },
  "Decoración y Atrezzo": {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2020.33.52-EgQrnlCMzZHX653gLhtXXKwrYVD1dH.jpeg",
    title: "Decoración y Atrezzo",
    description: "Complementa tu experiencia con nuestra amplia selección de accesorios y elementos decorativos.",
    features: [
      "Amplia variedad de props temáticos",
      "Máscaras y accesorios de alta calidad",
      "Elementos decorativos vintage",
      "Iluminación ambiental personalizada",
      "Fondos temáticos intercambiables",
      "Personalización según evento",
    ],
    details:
      "Nuestra colección de atrezzo y decoración está cuidadosamente seleccionada para elevar cualquier evento. Desde elementos vintage hasta accesorios modernos, tenemos todo lo necesario para crear el ambiente perfecto para tu celebración.",
  },
}

export default function CatalogoPage() {
  const [activeSection, setActiveSection] = useState<keyof typeof catalogData>("Plataforma 360º")
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#fff6ea] pt-16">
      {/* Main Content */}
      <main className="container mx-auto px-4 pt-16 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-[#d6a104] mb-6">Nuestro Catálogo</h1>
          <p className="text-lg text-[#d6a104]/80 max-w-2xl mx-auto">
            Descubre nuestra selección de experiencias únicas para hacer de tu evento algo inolvidable
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {(Object.keys(catalogData) as Array<keyof typeof catalogData>).map((section) => (
            <motion.button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === section
                  ? "bg-[#d6a104] text-white shadow-lg shadow-[#d6a104]/20"
                  : "bg-white/50 text-[#d6a104] hover:bg-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {section}
            </motion.button>
          ))}
        </div>

        {/* Product Display */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-black/5"
          >
            <OptimizedImage
              src={catalogData[activeSection].image || "/placeholder.svg"}
              alt={catalogData[activeSection].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-6"
            >
              <h2 className="text-white text-2xl font-bold mb-2">{catalogData[activeSection].title}</h2>
              <p className="text-white/90 text-sm">{catalogData[activeSection].description}</p>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 space-y-6"
            >
              <h3 className="text-xl font-semibold text-[#d6a104] flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Características
              </h3>
              <ul className="grid gap-3">
                {catalogData[activeSection].features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg transition-colors duration-200"
                    style={{
                      backgroundColor: hoveredFeature === index ? "rgba(214, 161, 4, 0.1)" : "transparent",
                    }}
                    onMouseEnter={() => setHoveredFeature(index)}
                    onMouseLeave={() => setHoveredFeature(null)}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 transition-colors duration-200 ${
                        hoveredFeature === index ? "bg-[#d6a104]" : "bg-[#d6a104]/40"
                      }`}
                    />
                    <span className="text-[#d6a104]/80">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-[#d6a104] mb-4">Detalles</h3>
              <p className="text-[#d6a104]/80 leading-relaxed">{catalogData[activeSection].details}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <Link
                href="/contacto"
                className="bg-[#d6a104] text-white px-8 py-3 rounded-full hover:bg-[#d6a104]/90 transition-colors inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Consultar Disponibilidad
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, #d6a104 0%, transparent 70%)",
              "radial-gradient(circle at 60% 60%, #d6a104 0%, transparent 70%)",
              "radial-gradient(circle at 40% 40%, #d6a104 0%, transparent 70%)",
              "radial-gradient(circle at 50% 50%, #d6a104 0%, transparent 70%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="absolute inset-0 opacity-[0.03]"
        />
      </div>
    </div>
  )
}

