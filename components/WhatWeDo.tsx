import { Award, Handshake, Lightbulb, Leaf, MapPin, Fuel, Recycle } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const processSteps = [
  { step: '01', label: 'Recepción', desc: 'Poroto de soja seleccionado' },
  { step: '02', label: 'Extracción', desc: 'Separación de fracciones' },
  { step: '03', label: 'Procesamiento', desc: 'Líneas SPI · SPC · TVP' },
  { step: '04', label: 'Control de calidad', desc: 'Laboratorio propio de I+D' },
  { step: '05', label: 'Envasado y despacho', desc: 'Entrega < 72 hs' },
];

const iconClass = 'w-7 h-7 text-[#2E7D3E]';

const byproducts = [
  {
    icon: <Fuel className="w-8 h-8 text-pt-lime" />,
    title: 'Aceite crudo de soja',
    text: 'Destinado íntegramente a la industria del biodiesel. Contribuimos a la transición energética de Argentina sin generar residuos industriales.',
  },
  {
    icon: <Recycle className="w-8 h-8 text-pt-lime" />,
    title: 'Okara y melaza de soja',
    text: 'Comercializados en el sector de nutrición animal (molinos de alimento balanceado y feedlots), completando el ciclo de valorización del grano.',
  },
];

const values = [
  { icon: <Award className={iconClass} />, label: 'Excelencia técnica' },
  { icon: <Handshake className={iconClass} />, label: 'Integridad comercial' },
  { icon: <Lightbulb className={iconClass} />, label: 'Innovación aplicada' },
  { icon: <Leaf className={iconClass} />, label: 'Sustentabilidad' },
  { icon: <MapPin className={iconClass} />, label: 'Desarrollo regional' },
];

export default function WhatWeDo() {
  return (
    <section id="que-hacemos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Proceso de producción */}
        <AnimatedSection className="mb-20">
          <p className="text-pt-lime font-semibold uppercase tracking-widest text-sm mb-3 text-center">
            Proceso
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-pt-gray text-center mb-4">
            Del poroto de soja a tu formulación
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Tecnología automatizada, laboratorio propio de I+D y calidad, certificación ISO 22000.
            Tres líneas de procesamiento diferenciadas para SPI, SPC y TVP.
          </p>

          {/* Process diagram */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0">
            {processSteps.map((s, i) => (
              <div key={s.step} className="flex md:flex-1 items-center md:flex-col gap-4 md:gap-0">
                <div className="flex md:flex-col items-center md:items-center flex-1">
                  <div className="w-14 h-14 rounded-full bg-pt-dark text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {s.step}
                  </div>
                  <div className="ml-4 md:ml-0 md:mt-3 md:text-center">
                    <p className="font-semibold text-pt-gray text-sm">{s.label}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{s.desc}</p>
                  </div>
                </div>
                {/* Arrow */}
                {i < processSteps.length - 1 && (
                  <div className="hidden md:flex flex-shrink-0 text-pt-lime text-2xl mx-2 mb-8">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Economía circular */}
        <AnimatedSection>
          <div className="bg-pt-dark rounded-3xl p-10 md:p-14">
            <p className="text-pt-lime font-semibold uppercase tracking-widest text-sm mb-3">
              Economía circular
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Economía circular desde el origen
            </h3>
            <p className="text-white/75 max-w-2xl mb-10">
              En Pro-Terra valorizamos el 100% de los subproductos generados en el proceso de
              extracción. Ningún residuo es desperdicio.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {byproducts.map((b) => (
                <div
                  key={b.title}
                  className="bg-white/10 rounded-2xl p-6 border border-white/10 hover:border-pt-lime/50 transition-colors"
                >
                  <div className="mb-3">{b.icon}</div>
                  <h4 className="font-semibold text-white mb-2">{b.title}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>

            {/* Valores */}
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">
                Nuestros valores
              </p>
              <div className="flex flex-wrap gap-3">
                {values.map((v) => (
                  <span
                    key={v.label}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm rounded-full border border-white/15 hover:border-pt-lime transition-colors"
                  >
                    {v.icon}
                    {v.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
