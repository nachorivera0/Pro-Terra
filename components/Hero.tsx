'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80"
        alt="Campo de soja industrial Argentina"
        fill
        className="object-cover object-center"
        priority
        unoptimized
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-pt-dark/75" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white pt-16">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <Image
            src="/Gemini_Generated_Image_x0x8gvx0x8gvx0x8-removebg-preview.png"
            alt="Pro-Terra"
            width={200}
            height={70}
            className="h-16 w-auto object-contain brightness-0 invert"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
        >
          Agregamos valor a la soja argentina
          <br />
          <span className="text-pt-lime">donde más importa: tu proceso.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10"
        >
          Ingredientes proteicos de alto valor agregado — SPI, SPC y TVP — producidos en el corazón
          del polo oleaginoso argentino.{' '}
          <span className="text-white font-semibold">Entrega en menos de 72 hs.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#productos"
            className="px-8 py-3.5 bg-pt-lime text-pt-dark font-semibold rounded-full hover:bg-white hover:text-pt-dark transition-colors text-base"
          >
            Ver productos
          </a>
          <a
            href="#contacto"
            className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-pt-dark transition-colors text-base"
          >
            Contactanos
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
