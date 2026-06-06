'use client';

import { useState } from 'react';
import AnimatedSection from './AnimatedSection';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const producto = data.get('producto') as string;
    const nombre = data.get('nombre') as string;
    const empresa = data.get('empresa') as string;
    const email = data.get('email') as string;
    const mensaje = data.get('mensaje') as string;
    const subject = `Consulta Pro-Terra — ${producto}`;
    const body = `Nombre: ${nombre}\nEmpresa: ${empresa}\nEmail: ${email}\n\n${mensaje}`;
    window.location.href = `mailto:contacto@proterra.com.ar?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contacto" className="py-24 bg-pt-dark">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-pt-lime font-semibold uppercase tracking-widest text-sm mb-3">
            Contacto
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Hablemos
          </h2>
          <p className="text-white/70 max-w-xl mx-auto">
            Primeros 2 años: enviamos muestras gratuitas de 1 kg a laboratorios de I+D y calidad.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <AnimatedSection className="lg:col-span-3">
            {sent ? (
              <div className="h-full flex items-center justify-center text-center py-16">
                <div>
                  <div className="w-16 h-16 rounded-full bg-pt-lime/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-pt-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold text-lg mb-2">¡Gracias por contactarnos!</p>
                  <p className="text-white/70 text-sm">Te respondemos en menos de 24 horas hábiles.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/70 text-sm mb-1.5">Nombre *</label>
                    <input
                      name="nombre"
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-pt-lime transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-1.5">Empresa *</label>
                    <input
                      name="empresa"
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-pt-lime transition-colors"
                      placeholder="Razón social"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-1.5">Email *</label>
                  <input
                    name="email"
                    required
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-pt-lime transition-colors"
                    placeholder="tu@empresa.com"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-1.5">Producto de interés</label>
                  <select
                    name="producto"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-pt-lime transition-colors"
                  >
                    <option value="Todos" className="bg-pt-dark">Todos los productos</option>
                    <option value="SPI" className="bg-pt-dark">SPI — Aislado de Proteína de Soja</option>
                    <option value="SPC" className="bg-pt-dark">SPC — Concentrado de Proteína de Soja</option>
                    <option value="TVP" className="bg-pt-dark">TVP — Proteína Vegetal Texturizada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-1.5">Mensaje</label>
                  <textarea
                    name="mensaje"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-pt-lime transition-colors resize-none"
                    placeholder="Contanos sobre tu proceso, volúmenes estimados y consultas técnicas..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-pt-lime text-pt-dark font-bold rounded-xl text-base hover:bg-white transition-colors"
                >
                  Enviar consulta
                </button>
              </form>
            )}
          </AnimatedSection>

          {/* Contact info */}
          <AnimatedSection delay={0.2} className="lg:col-span-2 flex flex-col gap-6">
            <div className="space-y-5">
              {[
                { icon: '📧', label: 'Email', value: 'contacto@proterra.com.ar', href: 'mailto:contacto@proterra.com.ar' },
                { icon: '📞', label: 'Teléfono', value: '+54 9 11 2305-0912', href: 'tel:+5491123050912' },
                { icon: '📍', label: 'Ubicación', value: 'San Lorenzo, Santa Fe, Argentina', href: null },
                { icon: '🔗', label: 'LinkedIn', value: '/pro-terra-prerotienes', href: 'https://linkedin.com/company/pro-terra-prerotienes' },
                { icon: '🌐', label: 'Web', value: 'www.proterra.com.ar', href: 'https://www.proterra.com.ar' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span className="text-2xl mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="text-white hover:text-pt-lime transition-colors text-sm"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Sample highlight */}
            <div className="mt-4 p-6 rounded-2xl bg-pt-lime/10 border border-pt-lime/30">
              <p className="text-pt-lime font-semibold text-sm mb-2">🎁 Muestras gratuitas</p>
              <p className="text-white/80 text-sm leading-relaxed">
                Primeros 2 años: enviamos muestras de 1 kg a laboratorios de I+D y calidad sin costo.
                Consultá disponibilidad por producto.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
