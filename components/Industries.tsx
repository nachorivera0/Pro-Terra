import { UtensilsCrossed, Sprout, Dumbbell, Milk } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const iconClass = 'w-7 h-7 text-[#2E7D3E] flex-shrink-0 mt-0.5';

const industries = [
  {
    icon: <UtensilsCrossed className={iconClass} />,
    title: 'Frigoríficos',
    text: 'Formulaciones de hamburguesas, medallones, chacinados y embutidos. SPC y TVP para optimizar rendimiento y costos por tonelada de producto terminado.',
  },
  {
    icon: <Sprout className={iconClass} />,
    title: 'Plant-based y análogos cárnicos',
    text: 'Soluciones para productores de hamburguesas vegetales, medallones y proteínas análogas. Flexibilidad en volumen y soporte técnico local.',
  },
  {
    icon: <Dumbbell className={iconClass} />,
    title: 'Suplementos deportivos y nutrición funcional',
    text: 'SPI de alta pureza para proteínas en polvo, barras y bebidas. Perfil aminoacídico completo, sabor neutro, etiquetado limpio.',
  },
  {
    icon: <Milk className={iconClass} />,
    title: 'Industria láctea y alimentos funcionales',
    text: 'SPI para yogures proteicos, bebidas vegetales y alimentos enriquecidos. Emulsificación, gelificación y estabilidad térmica garantizada.',
  },
];

export default function Industries() {
  return (
    <section id="clientes" className="py-24 bg-pt-light">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-pt-lime font-semibold uppercase tracking-widest text-sm mb-3">
            Mercados
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-pt-gray mb-4">
            Industrias que atendemos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestros ingredientes están presentes en los procesos industriales más exigentes de Argentina.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map((ind, i) => (
            <AnimatedSection key={ind.title} delay={i * 0.1}>
              <div className="group flex gap-6 p-8 rounded-2xl bg-white border border-gray-100 hover:border-pt-lime hover:shadow-lg transition-all duration-300 h-full">
                {ind.icon}
                <div>
                  <h3 className="font-display text-lg font-semibold text-pt-gray mb-3">
                    {ind.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{ind.text}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
