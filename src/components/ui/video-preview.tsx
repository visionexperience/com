"use client"

import { useRef, useState, useEffect } from "react"
import { Play } from "lucide-react"
import OptimizedImage from "./optimized-image"

interface VideoPreviewProps {
  src: string
  alt: string
}

/**
 * Componente para mostrar una vista previa de video con thumbnail generado automáticamente
 */
export default function VideoPreview({ src, alt }: VideoPreviewProps) {
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
          <OptimizedImage src={thumbnail || "/images/placeholder.svg"} alt={alt} fill className="object-cover" />
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

