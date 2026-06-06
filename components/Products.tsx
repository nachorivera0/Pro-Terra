'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Droplets, CheckCircle, Shield, Waves, Layers, Grid3x3 } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface Spec {
  label: string;
  value: string;
}

interface Product {
  id: string;
  image: string;
  name: string;
  badge: string;
  description: string;
  specs: Spec[];
  applications: string[];
  functional: { label: string; icon: React.ReactNode }[];
}

const iconClass = 'w-7 h-7 text-[#2E7D3E]';

const products: Product[] = [
  {
    id: 'spi',
    image: '/SPI.png',
    name: 'Aislado de Proteína de Soja (SPI)',
    badge: 'Alta pureza · Grado alimenticio',
    description:
      'El ingrediente proteico de mayor pureza de nuestro portafolio. Ideal para emulsiones cárnicas, bebidas proteicas y suplementos de alto rendimiento.',
    specs: [
      { label: 'Proteína (base seca)', value: 'mín. 90%' },
      { label: 'Humedad', value: 'máx. 6.0%' },
      { label: 'pH (slurry 5%)', value: '6.9 – 7.6' },
      { label: 'Grasa libre (PE)', value: 'máx. 1.0%' },
      { label: 'Cenizas', value: 'máx. 5.0%' },
      { label: 'Color', value: 'Off-white' },
      { label: 'Vida útil', value: '18 meses' },
      { label: 'Presentación', value: 'Bolsas 20 kg / Big Bags 1000 kg' },
    ],
    applications: ['Cárnicos procesados', 'Bebidas proteicas', 'Suplementos deportivos', 'Alimentos funcionales'],
    functional: [
      { label: 'Emulsificación', icon: <Droplets className={iconClass} /> },
      { label: 'Sabor neutro', icon: <CheckCircle className={iconClass} /> },
      { label: 'Control higroscópico', icon: <Shield className={iconClass} /> },
    ],
  },
  {
    id: 'spc',
    image: '/SPC.png',
    name: 'Concentrado de Proteína de Soja (SPC)',
    badge: 'Alta versatilidad · Frigoríficos y panificados',
    description:
      'La solución más versátil del portafolio para la industria frigorífica y de panificados. Excelente dispersabilidad y retención de agua.',
    specs: [
      { label: 'Proteína (base seca)', value: 'mín. 65–70%' },
      { label: 'Humedad', value: 'máx. 10.0%' },
      { label: 'Grasa', value: 'máx. 3%' },
      { label: 'Fibra total', value: 'máx. 5%' },
      { label: 'Vida útil', value: '18 meses' },
      { label: 'Presentación', value: 'Bolsas 20 kg / Big Bags 1000 kg' },
    ],
    applications: ['Cárnicos procesados', 'Panificación y confitería', 'Sustitutos lácteos', 'Sopas'],
    functional: [
      { label: 'Emulsificación', icon: <Droplets className={iconClass} /> },
      { label: 'Retención de agua', icon: <Waves className={iconClass} /> },
      { label: 'Alta dispersabilidad', icon: <Layers className={iconClass} /> },
    ],
  },
  {
    id: 'tvp',
    image: '/TVP.png',
    name: 'Proteína Vegetal Texturizada (TVP)',
    badge: 'Extensor cárnico · Alta eficiencia',
    description:
      'Extensor cárnico de alta eficiencia técnica y estructural. Absorción de agua 3.2:1. Integridad estructural post-hidratación garantizada.',
    specs: [
      { label: 'Proteína (base seca)', value: 'mín. 46%' },
      { label: 'Humedad', value: 'máx. 8%' },
      { label: 'Fibra cruda', value: 'máx. 3%' },
      { label: 'Carbohidratos', value: 'máx. 30%' },
      { label: 'Absorción de agua', value: '3.2:1' },
      { label: 'Granulometría', value: '3 a 12 mm (varios cortes)' },
      { label: 'Vida útil', value: '24 meses' },
      { label: 'Presentación', value: 'Bolsas multicapa 20 kg' },
    ],
    applications: ['Hamburguesas y medallones', 'Chacinados y embutidos', 'Panificación', 'Sustitutos y sopas'],
    functional: [
      { label: 'Retención de agua', icon: <Waves className={iconClass} /> },
      { label: 'Textura post-hidratación', icon: <Grid3x3 className={iconClass} /> },
      { label: 'Dispersabilidad', icon: <Layers className={iconClass} /> },
    ],
  },
];

function TechSheetModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-xl font-bold text-pt-gray mb-3">
          Ficha técnica disponible próximamente
        </h3>
        <p className="text-gray-600 mb-6">
          Escribinos a{' '}
          <a href="mailto:contacto@proterra.com.ar" className="text-pt-mid font-medium underline">
            contacto@proterra.com.ar
          </a>{' '}
          y te la enviamos de inmediato.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-pt-dark text-white rounded-full text-sm font-medium hover:bg-pt-mid transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [tab, setTab] = useState<'specs' | 'apps'>('specs');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <TechSheetModal onClose={() => setShowModal(false)} />}
      <AnimatedSection delay={index * 0.15} className="h-full">
        <div className="group flex flex-col h-full rounded-2xl border border-gray-100 hover:border-pt-lime hover:shadow-xl transition-all duration-300 overflow-hidden bg-white">
          {/* Product image */}
          <div className="relative h-[320px] w-full overflow-hidden rounded-t-2xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
            {/* badge overlay */}
            <div className="absolute bottom-4 left-4">
              <span className="inline-block px-3 py-1 bg-pt-dark/80 backdrop-blur-sm text-pt-lime text-xs font-semibold rounded-full">
                {product.badge}
              </span>
            </div>
          </div>

          {/* Header text */}
          <div className="bg-pt-dark text-white px-8 py-6">
            <h3 className="font-display text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-white/80 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setTab('specs')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                tab === 'specs'
                  ? 'text-pt-dark border-b-2 border-pt-lime bg-pt-light/50'
                  : 'text-gray-500 hover:text-pt-dark'
              }`}
            >
              Especificaciones
            </button>
            <button
              onClick={() => setTab('apps')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                tab === 'apps'
                  ? 'text-pt-dark border-b-2 border-pt-lime bg-pt-light/50'
                  : 'text-gray-500 hover:text-pt-dark'
              }`}
            >
              Aplicaciones
            </button>
          </div>

          {/* Tab content */}
          <div className="flex-1 p-8">
            {tab === 'specs' ? (
              <dl className="space-y-3">
                {product.specs.map((s) => (
                  <div key={s.label} className="flex justify-between text-sm gap-4">
                    <dt className="text-gray-500">{s.label}</dt>
                    <dd className="font-medium text-pt-gray text-right">{s.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                    Aplicaciones
                  </p>
                  <ul className="space-y-1.5">
                    {product.applications.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-pt-lime flex-shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    Características funcionales
                  </p>
                  <div className="flex flex-col gap-2">
                    {product.functional.map((f) => (
                      <div key={f.label} className="flex items-center gap-3">
                        {f.icon}
                        <span className="text-sm text-pt-gray">{f.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="p-6 pt-0">
            <button
              onClick={() => setShowModal(true)}
              className="w-full py-3 border-2 border-pt-dark text-pt-dark text-sm font-semibold rounded-full hover:bg-pt-dark hover:text-white transition-colors"
            >
              Solicitar ficha técnica completa
            </button>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}

export default function Products() {
  return (
    <section id="productos" className="py-24 bg-pt-light">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-pt-lime font-semibold uppercase tracking-widest text-sm mb-3">
            Portafolio
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-pt-gray mb-4">
            Nuestros productos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ingredientes proteicos de soja de alta funcionalidad para la industria alimentaria
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
