"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Camera, MessageCircle, Music, PartyPopper } from "lucide-react"
import OptimizedImage from "@/components/optimized-image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"

// Datos de servicios destacados
const highlightedServices = [
  {
    icon: Camera,
    title: "Plataforma 360º",
    description: "Captura momentos únicos desde todos los ángulos posibles",
    color: "from-amber-500/20 to-amber-600/20",
    hoverColor: "group-hover:from-amber-500/30 group-hover:to-amber-600/30",
  },
  {
    icon: Music,
    title: "Teléfono Audiolibro",
    description: "Mensajes personalizados en un formato único y vintage",
    color: "from-orange-500/20 to-orange-600/20",
    hoverColor: "group-hover:from-orange-500/30 group-hover:to-orange-600/30",
  },
  {
    icon: PartyPopper,
    title: "Decoración Temática",
    description: "Ambientación perfecta para cada tipo de evento",
    color: "from-yellow-500/20 to-yellow-600/20",
    hoverColor: "group-hover:from-yellow-500/30 group-hover:to-yellow-600/30",
  },
]

// Imágenes para el carrusel
const carouselImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-26%20at%2010.26.57-yujkuhYrCWBo5KXVcqdCgKdmQcMKZb.jpeg",
    alt: "Experiencia 360 Vision",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2020.36.33-s2l2aC4RT0BvgUoVkgIPinykZKYUMJ.jpeg",
    alt: "Plataforma 360º",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2020.36.37%20%281%29-CcVAyJebUuWyRmseJ1sMCJjtRFwWvF.jpeg",
    alt: "Teléfono Audiolibro",
  },
]

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Cambiar imagen del carrusel automáticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Scroll hacia abajo al hacer clic en el botón
  const scrollToContent = () => {
    const yOffset = -80 // Ajuste para el navbar
    const element = document.getElementById("content")
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-[#fbf7e8] overflow-x-hidden">
      {/* Hero Section Mejorado */}
      <div ref={scrollRef} className="relative h-screen">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          {/* Carrusel de imágenes de fondo */}
          <div className="relative h-full w-full">
            {carouselImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: currentImage === index ? 0.2 : 0,
                  scale: currentImage === index ? 1 : 1.1,
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <OptimizedImage
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-[#fbf7e8]/80 backdrop-blur-sm" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contenido del Hero */}
        <div
          ref={heroRef}
          className="relative z-10 h-full container mx-auto px-4 flex flex-col items-center justify-center"
        >
          {/* Logo sin efectos de transparencia */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full max-w-[550px] aspect-square mb-12"
          >
            <div className="relative w-full h-full">
              <OptimizedImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4740-x8hZVtZULWVoMwUogqfDyA1pLxl7Re.png"
                alt="360 Vision Experience Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light text-[#d6a104] mb-6 text-center"
          >
            <span className="block">Creamos</span>
            <span className="relative inline-block">
              Experiencias Únicas
              <motion.span
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, delay: 1, ease: "easeInOut" }}
                className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-transparent via-[#d6a104] to-transparent"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-[#d6a104]/80 max-w-2xl mb-12 text-center"
          >
            Transformamos tus eventos en momentos inolvidables con espectáculos y planificación personalizada que
            superará todas tus expectativas
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <Link
              href="/contacto"
              className="bg-[#d6a104] text-white px-8 py-3 rounded-full hover:bg-[#d6a104]/90 transition-colors transform hover:scale-105 duration-300 shadow-lg hover:shadow-xl"
            >
              Comienza Tu Experiencia
            </Link>
            <Link
              href="/galeria"
              className="bg-white/50 backdrop-blur-sm text-[#d6a104] px-8 py-3 rounded-full hover:bg-white transition-colors transform hover:scale-105 duration-300 shadow-md hover:shadow-lg"
            >
              Ver Galería
            </Link>
          </motion.div>

          {/* Botón de scroll */}
        </div>

        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-[#d6a104]/10 to-transparent blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="absolute bottom-[30%] right-[15%] w-80 h-80 rounded-full bg-gradient-to-tl from-[#d6a104]/10 to-transparent blur-3xl"
          />
        </div>
      </div>

      {/* Contenido Principal */}
      <main id="content" className="container mx-auto px-4 py-20">
        {/* Servicios Destacados Mejorados */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="text-center mb-16 relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-transparent via-[#d6a104] to-transparent mx-auto mb-6"
            />
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-light text-[#d6a104] mb-4"
            >
              Nuestros Servicios Destacados
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#d6a104]/80 max-w-2xl mx-auto"
            >
              Descubre cómo podemos hacer tu evento inolvidable con nuestras experiencias únicas
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {highlightedServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
              >
                {/* Fondo con gradiente */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} transition-all duration-500 ${service.hoverColor}`}
                />

                {/* Contenido */}
                <div className="relative z-10 p-8">
                  <div className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <service.icon className="w-8 h-8 text-[#d6a104]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#d6a104] mb-4">{service.title}</h3>
                  <p className="text-[#d6a104]/80 mb-6">{service.description}</p>
                  <Link
                    href={`/catalogo`}
                    className="inline-flex items-center text-[#d6a104] font-medium hover:underline"
                  >
                    Saber más
                    <svg
                      className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>

                {/* Elemento decorativo */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#d6a104]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sección de Galería Destacada */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-16 relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-transparent via-[#d6a104] to-transparent mx-auto mb-6"
            />
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-light text-[#d6a104] mb-4"
            >
              Momentos Capturados
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#d6a104]/80 max-w-2xl mx-auto"
            >
              Un vistazo a las experiencias que creamos
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {carouselImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.03 }}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-lg"
              >
                <OptimizedImage
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-white font-medium">{image.alt}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              href="/galeria"
              className="inline-flex items-center justify-center bg-white/50 backdrop-blur-sm text-[#d6a104] px-8 py-3 rounded-full hover:bg-white transition-colors transform hover:scale-105 duration-300 shadow-md hover:shadow-lg"
            >
              Ver Galería Completa
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-[#d6a104]/20 to-[#d6a104]/5 rounded-3xl p-12 text-center overflow-hidden"
        >
          {/* Elementos decorativos */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.2, 0.3],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              className="absolute top-[10%] left-[20%] w-64 h-64 rounded-full bg-[#d6a104]/10 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              className="absolute bottom-[10%] right-[20%] w-80 h-80 rounded-full bg-[#d6a104]/10 blur-3xl"
            />
          </div>

          <div className="relative z-10">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-light text-[#d6a104] mb-6"
            >
              ¿Listo para crear momentos inolvidables?
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#d6a104]/80 max-w-2xl mx-auto mb-10"
            >
              Contacta con nosotros hoy mismo y comienza a planificar tu experiencia única
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contacto"
                className="bg-[#d6a104] text-white px-8 py-3 rounded-full hover:bg-[#d6a104]/90 transition-colors transform hover:scale-105 duration-300 shadow-lg hover:shadow-xl"
              >
                Contactar Ahora
              </Link>
              <Link
                href="https://wa.me/34651533976"
                target="_blank"
                className="bg-white/70 backdrop-blur-sm text-[#d6a104] px-8 py-3 rounded-full hover:bg-white transition-colors transform hover:scale-105 duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Elementos decorativos de fondo */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, #d6a104 0%, transparent 70%)",
              "radial-gradient(circle at 80% 80%, #d6a104 0%, transparent 70%)",
              "radial-gradient(circle at 20% 20%, #d6a104 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-0 opacity-[0.03]"
        />
      </div>
    </div>
  )
}

