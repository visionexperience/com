"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Instagram, MessageCircle, Send, Sparkles } from "lucide-react"
import OptimizedImage from "@/components/optimized-image"
import emailjs from "@emailjs/browser"
// Opciones para los tipos de eventos
const tiposDeEvento = ["Boda", "Cumpleaños", "Evento corporativo", "Festival", "Inauguración", "Aniversario", "Otro"]

// Opciones para los servicios
const serviciosDisponibles = [
  {
    id: "plataforma360",
    nombre: "Plataforma 360°",
    descripcion: "Experiencia inmersiva con plataforma giratoria y efectos visuales",
  },
  {
    id: "telefono",
    nombre: "Teléfono Audiolibro",
    descripcion: "Teléfono vintage con mensajes personalizados para tus invitados",
  },
  {
    id: "iluminacion",
    nombre: "Iluminación Especial",
    descripcion: "Sistemas de iluminación profesional para crear ambientes únicos",
  },
  {
    id: "fotografia",
    nombre: "Fotografía Semi-profesional",
    descripcion: "Captura los mejores momentos de tu evento con nuestro equipo",
  },
  {
    id: "dj",
    nombre: "Música en directo",
    descripcion: "Música y sonido de alta calidad para mantener la fiesta animada",
  },
  {
    id: "decoracion",
    nombre: "Decoración Temática",
    descripcion: "Transformamos el espacio según la temática de tu evento",
  },
]

export default function ContactoPage() {
  // Estados para el formulario
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [telefono, setTelefono] = useState("") // Nuevo estado para el teléfono
  const [tipoEvento, setTipoEvento] = useState("")
  const [lugarEvento, setLugarEvento] = useState("")
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<string[]>([])
  const [mensaje, setMensaje] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Inicializar EmailJS
  useEffect(() => {
    emailjs.init("sVWoPp6Io-aHJUG45")
  }, [])

  const formRef = useRef<HTMLFormElement>(null)

  // Función para manejar la selección de servicios
  const toggleServicio = (id: string) => {
    if (serviciosSeleccionados.includes(id)) {
      setServiciosSeleccionados(serviciosSeleccionados.filter((item) => item !== id))
    } else {
      setServiciosSeleccionados([...serviciosSeleccionados, id])
    }
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    setError(null)

    // Validación básica
    if (!nombre || !correo || !tipoEvento || !lugarEvento || serviciosSeleccionados.length === 0) {
      setError("Por favor, completa todos los campos requeridos")
      setEnviando(false)
      return
    }

    // Preparar los datos para el correo
    const serviciosTexto = serviciosSeleccionados
      .map((id) => {
        const servicio = serviciosDisponibles.find((s) => s.id === id)
        return servicio ? servicio.nombre : id
      })
      .join(", ")

    // Crear un mensaje completo que incluya todos los datos
    const mensajeCompleto = `
NUEVA SOLICITUD DE EVENTO

DATOS DEL CLIENTE:
- Nombre: ${nombre}
- Correo: ${correo}
- Teléfono: ${telefono}

INFORMACIÓN DEL EVENTO:
- Tipo de evento: ${tipoEvento}
- Lugar del evento: ${lugarEvento}

SERVICIOS SOLICITADOS:
${serviciosSeleccionados
  .map((id) => {
    const servicio = serviciosDisponibles.find((s) => s.id === id)
    return servicio ? `- ${servicio.nombre}` : `- ${id}`
  })
  .join("\n")}

MENSAJE ADICIONAL:
${mensaje || "No se proporcionó mensaje adicional"}
`.trim()

    // Crear un objeto con los datos del formulario para EmailJS
    const templateParams = {
      from_name: nombre,
      from_email: correo,
      telefono: telefono || "No proporcionado",
      tipo_evento: tipoEvento,
      lugar_evento: lugarEvento,
      servicios: serviciosTexto,
      mensaje: mensajeCompleto, // Usamos el mensaje completo estructurado
      mensaje_original: mensaje || "No se proporcionó mensaje adicional",
    }

    // Enviar el correo usando EmailJS
    emailjs
      .send("service_i8q6wk6", "template_dobeir8", templateParams, "sVWoPp6Io-aHJUG45")
      .then((result) => {
        console.log("Correo enviado con éxito:", result.text)
        setEnviando(false)
        setEnviado(true)

        // Resetear el formulario después de 3 segundos
        setTimeout(() => {
          setEnviado(false)
          setNombre("")
          setCorreo("")
          setTelefono("") // Resetear el teléfono
          setTipoEvento("")
          setLugarEvento("")
          setServiciosSeleccionados([])
          setMensaje("")
          if (formRef.current) {
            formRef.current.reset()
          }
        }, 3000)
      })
      .catch((error) => {
        console.error("Error al enviar el correo:", error)
        setEnviando(false)
        setError(
          "Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo o contáctanos directamente por WhatsApp.",
        )
      })
  }

  return (
    <div className="min-h-screen bg-[#fff6ea] pt-16">
      {/* Contenido principal */}
      <div className="container mx-auto px-4 pt-16 pb-16 sm:pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#d6a104] mb-4 sm:mb-6">
              Comienza Tu Experiencia
            </h1>
            <p className="text-base sm:text-lg text-[#d6a104]/80 max-w-2xl mx-auto">
              Cuéntanos sobre tu evento y te ayudaremos a crear una experiencia inolvidable
            </p>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="grid md:grid-cols-5">
              {/* Imagen lateral - oculta en móviles, visible en tablets y escritorio */}
              <div className="hidden md:block md:col-span-2 relative min-h-[300px] md:min-h-full bg-[#d6a104]/10">
                <OptimizedImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2020.31.23%20(1)-or0gck4Z0y4eSn0yxUCFinat5o8yPH.jpeg"
                  alt="360 Vision Experience"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#d6a104]/60 to-transparent mix-blend-multiply" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">¿Listo para sorprender?</h3>
                  <p className="text-sm opacity-90">
                    Nuestras experiencias están diseñadas para crear momentos mágicos que tus invitados nunca olvidarán
                  </p>
                </div>
              </div>

              {/* Formulario - ocupa todo el ancho en móviles */}
              <div className="md:col-span-3 p-4 sm:p-6 md:p-10">
                {enviado ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                      <Sparkles className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#d6a104] mb-4">¡Mensaje Enviado!</h3>
                    <p className="text-[#d6a104]/80 max-w-md">
                      Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible para comenzar a
                      planificar tu experiencia única.
                    </p>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#d6a104] mb-4 sm:mb-6">
                      Cuéntanos sobre tu evento
                    </h2>

                    {/* Información personal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-1 sm:space-y-2">
                        <label htmlFor="nombre" className="block text-sm font-medium text-[#d6a104]">
                          Nombre completo <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 rounded-lg border border-[#d6a104]/20 focus:outline-none focus:ring-2 focus:ring-[#d6a104]/50 text-base"
                          placeholder="Tu nombre"
                          required
                        />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <label htmlFor="telefono" className="block text-sm font-medium text-[#d6a104]">
                          Número de teléfono
                        </label>
                        <input
                          type="tel"
                          id="telefono"
                          name="telefono"
                          value={telefono}
                          onChange={(e) => setTelefono(e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 rounded-lg border border-[#d6a104]/20 focus:outline-none focus:ring-2 focus:ring-[#d6a104]/50 text-base"
                          placeholder="Tu número de teléfono (opcional)"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <label htmlFor="correo" className="block text-sm font-medium text-[#d6a104]">
                        Correo electrónico <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="correo"
                        name="correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 rounded-lg border border-[#d6a104]/20 focus:outline-none focus:ring-2 focus:ring-[#d6a104]/50 text-base"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>

                    {/* Información del evento */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-1 sm:space-y-2">
                        <label htmlFor="tipoEvento" className="block text-sm font-medium text-[#d6a104]">
                          Tipo de evento <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="tipoEvento"
                          name="tipoEvento"
                          value={tipoEvento}
                          onChange={(e) => setTipoEvento(e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 rounded-lg border border-[#d6a104]/20 focus:outline-none focus:ring-2 focus:ring-[#d6a104]/50 text-base"
                          required
                        >
                          <option value="" disabled>
                            Selecciona un tipo
                          </option>
                          {tiposDeEvento.map((tipo) => (
                            <option key={tipo} value={tipo}>
                              {tipo}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <label htmlFor="lugarEvento" className="block text-sm font-medium text-[#d6a104]">
                          Lugar del evento <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="lugarEvento"
                          name="lugarEvento"
                          value={lugarEvento}
                          onChange={(e) => setLugarEvento(e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 rounded-lg border border-[#d6a104]/20 focus:outline-none focus:ring-2 focus:ring-[#d6a104]/50 text-base"
                          placeholder="Ciudad, dirección o nombre del local"
                          required
                        />
                      </div>
                    </div>

                    {/* Servicios */}
                    <div className="space-y-2 sm:space-y-3">
                      <label className="block text-sm font-medium text-[#d6a104]">
                        Servicios que te interesan <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {serviciosDisponibles.map((servicio) => (
                          <div
                            key={servicio.id}
                            className={`p-2 sm:p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                              serviciosSeleccionados.includes(servicio.id)
                                ? "border-[#d6a104] bg-[#d6a104]/10"
                                : "border-[#d6a104]/20 hover:border-[#d6a104]/50"
                            }`}
                            onClick={() => toggleServicio(servicio.id)}
                          >
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="flex-shrink-0 mt-0.5">
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    serviciosSeleccionados.includes(servicio.id)
                                      ? "border-[#d6a104] bg-[#d6a104]"
                                      : "border-[#d6a104]/50"
                                  }`}
                                >
                                  {serviciosSeleccionados.includes(servicio.id) && (
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                  )}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium text-[#d6a104] text-sm sm:text-base">{servicio.nombre}</h4>
                                <p className="text-xs text-[#d6a104]/70 hidden sm:block">{servicio.descripcion}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Campo oculto para almacenar los servicios seleccionados */}
                      <input type="hidden" name="servicios" value={serviciosSeleccionados.join(",")} />
                    </div>

                    {/* Mensaje adicional */}
                    <div className="space-y-1 sm:space-y-2">
                      <label htmlFor="mensaje" className="block text-sm font-medium text-[#d6a104]">
                        Mensaje adicional (opcional)
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        rows={3}
                        className="w-full px-3 sm:px-4 py-2 rounded-lg border border-[#d6a104]/20 focus:outline-none focus:ring-2 focus:ring-[#d6a104]/50 text-base"
                        placeholder="Cuéntanos más detalles sobre tu evento o cualquier pregunta que tengas"
                      />
                    </div>

                    {/* Error message */}
                    {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

                    {/* Submit button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={enviando}
                        className="w-full py-3 px-6 bg-[#d6a104] text-white rounded-full hover:bg-[#d6a104]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 text-base"
                      >
                        {enviando ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Enviando...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Enviar solicitud</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

          {/* Información adicional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
          >
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#d6a104]/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#d6a104]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#d6a104] mb-2">Contacto directo</h3>
              <p className="text-sm sm:text-base text-[#d6a104]/80 mb-3 sm:mb-4">
                ¿Prefieres hablar directamente con nosotros? Contáctanos por WhatsApp o llámanos.
              </p>
              <a
                href="https://wa.me/34651533976"
                target="_blank"
                className="text-[#d6a104] font-medium hover:underline flex items-center gap-2 text-sm sm:text-base"
                rel="noreferrer"
              >
                <MessageCircle className="w-4 h-4" />
                +34 651 53 39 76
              </a>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#d6a104]/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-[#d6a104]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#d6a104] mb-2">Síguenos</h3>
              <p className="text-sm sm:text-base text-[#d6a104]/80 mb-3 sm:mb-4">
                Descubre más sobre nuestros eventos y experiencias en nuestras redes sociales.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/360visionexperience/"
                  target="_blank"
                  className="text-[#d6a104] font-medium hover:underline flex items-center gap-2 text-sm sm:text-base"
                  rel="noreferrer"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@360visionexperience"
                  target="_blank"
                  className="text-[#d6a104] font-medium hover:underline flex items-center gap-2 text-sm sm:text-base"
                  rel="noreferrer"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-1.162-1.264-1.314-2.705-1.390-3.338h.003c-.075-.633-.075-1.197-.075-1.197h-3.764v13.578c0 .714-.266 1.378-.766 1.878s-1.164.766-1.878.766-1.378-.266-1.878-.766-.766-1.164-.766-1.878 266-1.378.766-1.878 1.164-.766 1.878-.766c.246 0 .49.031.728.094v-3.788c-.24-.032-.481-.048-.728-.047-1.562 0-3.052.609-4.152 1.709s-1.709 2.59-1.709 4.152.609 3.052 1.709 4.152 2.59 1.709 4.152 1.709 3.052-.609 4.152-1.709 1.709-2.59 1.709-4.152V8.338c1.139.772 2.476 1.197 3.841 1.197v-3.786c-.021 0-.041.003-.062.003-.323 0-1.522-.052-2.638-.59z" />
                  </svg>
                  TikTok
                </a>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#d6a104]/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#d6a104]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#d6a104] mb-2">Personalización</h3>
              <p className="text-sm sm:text-base text-[#d6a104]/80">
                Cada evento es único. Podemos personalizar nuestros servicios para adaptarnos perfectamente a tus
                necesidades y crear una experiencia inolvidable.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, #d6a104 0%, transparent 70%)`,
          }}
        />
      </div>
    </div>
  )
}

