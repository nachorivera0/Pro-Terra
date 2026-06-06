'use client';

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from './AnimatedSection';

const stats = [
  { value: '100%', label: 'de subproductos valorizados' },
  { value: '14x',  label: 'más eficiente en uso de tierra que la proteína animal' },
  { value: 'ISO 22000', label: 'certificación vigente' },
  { value: 'Santa Fe', label: 'empleo calificado y desarrollo regional' },
];

function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center p-8 rounded-2xl bg-white/10 border border-white/15 hover:border-pt-lime/60 transition-colors"
    >
      <p className="font-display text-3xl md:text-4xl font-bold text-white mb-2">{value}</p>
      <p className="text-white/80 text-sm leading-relaxed">{label}</p>
    </motion.div>
  );
}

export default function Sustainability() {
  return (
    <section id="sustentabilidad" className="py-24 bg-pt-mid">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-pt-lime font-semibold uppercase tracking-widest text-sm mb-3">
            Compromiso
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Sustentabilidad desde el origen
          </h2>
          <p className="text-white/75 max-w-2xl mx-auto">
            Planta de tratamiento de efluentes propia, economía circular total y un compromiso
            activo con el desarrollo regional de Santa Fe.
          </p>
        </AnimatedSection>

        {/* ISO Badge */}
        <AnimatedSection className="flex justify-center mb-14">
          <div className="flex items-center gap-5 bg-white rounded-2xl px-8 py-5 shadow-xl">
            <Image
              src="/iso22000.png"
              alt="Certificación ISO 22000"
              width={120}
              height={80}
              unoptimized
              className="object-contain"
            />
            <div>
              <p className="font-display text-xl font-bold text-pt-dark">ISO 22000</p>
              <p className="text-gray-600 text-sm">Certificación en Sistemas de Gestión de Inocuidad Alimentaria</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <StatCard key={s.label} value={s.value} label={s.label} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
