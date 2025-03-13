"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"

type OptimizedImageProps = Omit<ImageProps, "onError"> & {
  fallbackSrc?: string
}

/**
 * Un componente de imagen optimizado que maneja errores de carga
 * y proporciona una imagen de respaldo cuando es necesario.
 */
export default function OptimizedImage({
  src,
  alt,
  fallbackSrc = "/images/placeholder.svg",
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      {...props}
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
      unoptimized // Necesario para exportación estática
    />
  )
}

