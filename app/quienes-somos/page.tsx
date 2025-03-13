"use client"

import { motion } from "framer-motion"
import OptimizedImage from "@/components/optimized-image"

export default function QuienesSomosPage() {
  return (
    <div className="min-h-screen bg-[#fff6ea] pt-16">
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-xl mx-auto"
            >
              <div className="relative w-full" style={{ paddingBottom: "133%" }}>
                {/* Decorative border */}
                <div className="absolute inset-0 border-2 border-[#d6a104]/20 rounded-2xl transform -rotate-2" />
                <div className="absolute inset-0 border-2 border-[#d6a104]/20 rounded-2xl transform rotate-2" />

                {/* Main image */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <OptimizedImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EoCWUFnhODCz7lTgazYbm3gaZ5Ti4x.png"
                    alt="360 Vision - Quiénes Somos"
                    fill
                    className="object-contain bg-[#fff6ea]"
                    priority
                  />
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#d6a104]/5 rounded-full blur-xl"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="absolute -top-6 -left-6 w-32 h-32 bg-[#d6a104]/5 rounded-full blur-xl"
              />
            </motion.div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#d6a104]/0 via-[#d6a104]/50 to-[#d6a104]/0" />
                <h2 className="text-3xl font-light text-[#d6a104] mb-6">Transformamos momentos efímeros, en eternos</h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="prose prose-lg"
              >
                <p className="text-[#d6a104]/80 leading-relaxed">
                  Somos innovadores, creativos y apasionados por crear momentos únicos. Nuestra plataforma 360° y
                  experiencias interactivas revolucionan la manera de capturar y vivir cada celebración.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col gap-6"
              >
                <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl hover:bg-white/70 transition-colors duration-300">
                  <h3 className="text-xl font-medium text-[#d6a104] mb-2">Nuestra Misión</h3>
                  <p className="text-[#d6a104]/80">
                    Crear experiencias memorables que transformen cada evento en un momento único e inolvidable.
                  </p>
                </div>

                <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl hover:bg-white/70 transition-colors duration-300">
                  <h3 className="text-xl font-medium text-[#d6a104] mb-2">Nuestro Compromiso</h3>
                  <p className="text-[#d6a104]/80">
                    Superar las expectativas en cada evento, ofreciendo un servicio personalizado y atención al detalle
                    que garantice la satisfacción total de nuestros clientes.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
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

