"use client"

import { useState, useRef, useEffect } from "react"
import OptimizedImage from "@/components/optimized-image"
import { motion, AnimatePresence } from "framer-motion"
import { Play, X, ZoomIn, ZoomOut } from "lucide-react"

// Datos actualizados de la galería con los nuevos videos
const galleryData = {
  "Plataforma 360º": {
    images: [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-26%20at%2010.26.57-yujkuhYrCWBo5KXVcqdCgKdmQcMKZb.jpeg",
        alt: "Persona con máscara de mono rosa posando en la plataforma 360 con letrero iluminado",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-26%20at%2010.30.27-EqMIimhAZq42AXlnqyx3n5dRvICPPJ.jpeg",
        alt: "Grupo posando frente a letrero de neón con aro de luz y decoración floral",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-26%20at%2010.34.05%20%282%29-A60MLbofGvF6EBYHXhYkBnkbVaMk4O.jpeg",
        alt: "Primer plano del aro de luz con decoración floral naranja y amarilla",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-26%20at%2010.26.57%20%281%29-aWzeLQFN2hmxH6JLDl2tGJwhgvs49N.jpeg",
        alt: "Dos mujeres posando en la plataforma 360, una con sombrero de vaquera",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-26%20at%2010.34.05-57nnIqp9wgRtAE3lCo4nnm2lSxhQjW.jpeg",
        alt: "Persona con camiseta de 360Vision junto al número iluminado y aro de luz",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-26%20at%2010.34.05%20%283%29-Mg27zU22bI9Hr1WnJD8k0s2tcUo2gF.jpeg",
        alt: "Grupo en fiesta con disfraces, uno con capa amarilla y otro con sombrero de vaquero",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-26%20at%2010.37.40-eV7MC3Kj0oOhPFex79by67svpCZ4At.jpeg",
        alt: "Mujer posando en moto pequeña con decoración de KISS y flores naranjas",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-26%20at%2010.34.05%20%281%29-OMcOUzSuoYgO0DbJlqyE5vY4fs2uaG.jpeg",
        alt: "Instalación completa con teléfono rojo, luces LED y números iluminados 3 y 0",
      },
    ],
    videos: [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-02-19%20at%2020.36.40%20(1)-SbqnS1XL8OpcvE6YvDkPSZbLC4sxph.mp4",
        alt: "Video de evento con plataforma 360",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-02-19%20at%2020.36.41%20(1)-7UdjvaFui07R4wz5Ip6bwFFCihqk8d.mp4",
        alt: "Experiencia con plataforma giratoria",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-02-19%20at%2020.36.41%20(2)-I3OWzWNqtDJhWqstjYPpyXS4dbMHyW.mp4",
        alt: "Evento con iluminación especial",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-02-19%20at%2020.36.42-cIQWqljXnDiFDUnhNBNa3y700V6Gj4.mp4",
        alt: "Demostración de plataforma 360",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-02-19%20at%2020.36.42%20(1)-g3DqEwPeIxOrg5EEuRgVzXRWI7LZZe.mp4",
        alt: "Experiencia inmersiva 360",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-02-19%20at%2020.34.01-pS1266kIvp2JObBihnMmrbLwujsDYQ.mp4",
        alt: "Evento con efectos visuales",
      },
    ],
  },
  "Teléfono Audiolibro": {
    images: [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2020.36.39%20(1)-7yNo9BbarF6PDFcArXpYBdBHCTOyi1.jpeg",
        alt: "Teléfono rojo vintage con luces LED y hojas verdes",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2020.33.52%20(2)-08xSN186EyIC1lDHv1bqWqOuDdtSLj.jpeg",
        alt: "Teléfono rojo con fondo de mural de Michael Jackson",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2020.35.51-fUm18RC4rHceJ9KQiIebGL3r3hgXO6.jpeg",
        alt: "Teléfono rojo con plataforma giratoria y letras 360",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2020.36.26-TxIsdIHn5nPzgqR7OIw0eRMsGtFuUE.jpeg",
        alt: "Teléfono rojo con decoración de luces",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2020.33.49-RJm5HNgNv2LmxrU5tEjpG0robuaU8G.jpeg",
        alt: "Persona con traje usando el teléfono rojo",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2020.33.50-DYbT0KAx7UjBGzDyTE07xRvPdkh6kp.jpeg",
        alt: "Persona con camisa azul usando el teléfono rojo",
      },
    ],
    videos: [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-02-19%20at%2020.36.40-OOW3C4NptdPyHcIbpSwuB4utQ8nFr8.mp4",
        alt: "Video de la experiencia del teléfono audiolibro",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-02-19%20at%2020.34.02%20(2)-IFYZgCkCvs95Q3CKyVrsGFsnQIEJMm.mp4",
        alt: "Video de interacción con el teléfono",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-02-19%20at%2020.34.02%20(3)-s3dDghbPKGN7jF5RGkT5v1gSJuF6Kz.mp4",
        alt: "Video del ambiente y decoración",
      },
    ],
  },
}

// Componente mejorado para la vista previa de video que captura el primer frame
const VideoPreview = ({ src, alt }: { src: string; alt: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Función para capturar el thumbnail
      const captureThumb = () => {
        try {
          const canvas = document.createElement("canvas")
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          const ctx = canvas.getContext("2d")
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            setThumbnail(canvas.toDataURL("image/jpeg"))
            setIsLoading(false)
          }
        } catch (e) {
          console.error("Error capturing thumbnail:", e)
          setIsLoading(false)
        }
      }

      // Cargar el video y capturar el primer frame
      video.preload = "metadata"
      video.muted = true
      video.crossOrigin = "anonymous"

      const handleLoadedData = () => {
        video.currentTime = 0.1 // Pequeño offset para asegurar que el frame esté cargado
      }

      const handleSeeked = () => {
        captureThumb()
      }

      const handleError = () => {
        console.error("Error loading video:", video.error)
        setIsLoading(false)
      }

      video.addEventListener("loadeddata", handleLoadedData)
      video.addEventListener("seeked", handleSeeked)
      video.addEventListener("error", handleError)

      // Establecer un timeout por si el video no carga
      const timeout = setTimeout(() => {
        if (isLoading) {
          setIsLoading(false)
        }
      }, 5000)

      // Cargar el video
      video.load()

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData)
        video.removeEventListener("seeked", handleSeeked)
        video.removeEventListener("error", handleError)
        clearTimeout(timeout)
      }
    }
  }, [isLoading])

  return (
    <div className="relative aspect-video w-full h-full bg-black rounded-lg overflow-hidden">
      <video ref={videoRef} src={src} className="hidden" />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#d6a104]/30 to-[#d6a104]/5">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {thumbnail && (
        <div className="relative w-full h-full">
          <OptimizedImage src={thumbnail || "/placeholder.svg"} alt={alt} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full transform scale-100 group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      )}

      {!isLoading && !thumbnail && (
        <div className="relative w-full h-full bg-gradient-to-br from-[#d6a104]/50 to-[#d6a104]/20 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
            <Play className="w-8 h-8 text-white" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
              <p className="text-white text-sm text-center">{alt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente para la galería
export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<"Plataforma 360º" | "Teléfono Audiolibro">("Plataforma 360º")
  const [selectedItem, setSelectedItem] = useState<{
    type: "image" | "video"
    src: string
    alt: string
  } | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  // Cerrar lightbox con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null)
        setIsZoomed(false)
        setIsVideoLoaded(false)
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  // Prevenir scroll cuando el lightbox está abierto
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [selectedItem])

  // Resetear el estado del video cuando se cierra el lightbox
  useEffect(() => {
    if (!selectedItem) {
      setIsVideoLoaded(false)
    }
  }, [selectedItem])

  return (
    <div className="min-h-screen bg-[#fff6ea] pt-16">
      {/* Navbar */}

      {/* Gallery Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-[#d6a104] mb-12"
        >
          Nuestra Galería
        </motion.h1>

        {/* Tabs */}
        <div className="mb-12">
          <div className="flex justify-center gap-4">
            {(["Plataforma 360º", "Teléfono Audiolibro"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-[#d6a104] text-white shadow-lg shadow-[#d6a104]/20"
                    : "bg-white/50 text-[#d6a104] hover:bg-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-16">
              {/* Imágenes */}
              <div>
                <h2 className="text-2xl font-semibold mb-8 text-[#d6a104] flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-[#d6a104]" />
                  Fotos
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryData[activeTab].images.map((item, index) => (
                    <motion.div
                      key={`${activeTab}-image-${index}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl bg-black/5 shadow-md hover:shadow-xl transition-all duration-300"
                      onClick={() => setSelectedItem({ type: "image", src: item.src, alt: item.alt })}
                    >
                      <OptimizedImage
                        src={item.src || "/placeholder.svg"}
                        alt={item.alt}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2">
                        <ZoomIn className="w-5 h-5" />
                        <span className="text-sm font-medium">Ampliar imagen</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Videos */}
              <div>
                <h2 className="text-2xl font-semibold mb-8 text-[#d6a104] flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-[#d6a104]" />
                  Videos
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryData[activeTab].videos.map((item, index) => (
                    <motion.div
                      key={`${activeTab}-video-${index}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl bg-black/5 shadow-md hover:shadow-xl transition-all duration-300"
                      onClick={() => setSelectedItem({ type: "video", src: item.src, alt: item.alt })}
                    >
                      <VideoPreview src={item.src} alt={item.alt} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          >
            <button
              className="absolute top-4 right-4 z-50 bg-black/50 text-white p-2 rounded-full"
              onClick={() => {
                setSelectedItem(null)
                setIsZoomed(false)
              }}
            >
              <X className="w-6 h-6" />
            </button>

            {selectedItem.type === "image" ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <div
                  className={`relative transition-all duration-300 ease-out ${
                    isZoomed ? "scale-[2] cursor-zoom-out" : "scale-100 cursor-zoom-in"
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <OptimizedImage
                    src={selectedItem.src || "/placeholder.svg"}
                    alt={selectedItem.alt}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-[85vh] object-contain"
                    priority
                  />
                </div>
                <button
                  className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsZoomed(!isZoomed)
                  }}
                >
                  {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
                </button>
              </div>
            ) : (
              <div className="relative w-full max-w-4xl mx-auto aspect-video">
                {!isVideoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  className="w-full h-full rounded-lg"
                  playsInline
                  controlsList="nodownload"
                  onLoadedData={() => setIsVideoLoaded(true)}
                >
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

