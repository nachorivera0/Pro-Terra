import AnimatedSection from './AnimatedSection';

const cards = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Proximidad y soporte técnico',
    text: 'Nuestro personal visita tu planta, entiende tu proceso y te acompaña en el desarrollo de formulaciones. No delegamos en distribuidores.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Entrega en menos de 72 hs',
    text: 'Stock permanente desde el Polo Industrial San Lorenzo. Pedidos desde una bolsa de 20 kg. Sin lead times de 60–90 días ni volúmenes mínimos de contenedor.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Reducción del riesgo de costo de tenencia',
    text: 'Comprá lo que necesitás, cuando lo necesitás. Eliminás el riesgo de deterioro por almacenamiento prolongado y liberás capital de trabajo.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: 'Sustitución de importaciones con calidad certificada',
    text: 'Misma funcionalidad que los productos importados de Brasil, EE.UU. y China — con precio competitivo y sin exposición al riesgo cambiario de comercio exterior.',
  },
];

export default function WhyUs() {
  return (
    <section id="por-que" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-pt-lime font-semibold uppercase tracking-widest text-sm mb-3">
            Nuestro diferencial
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-pt-gray">
            Por qué elegirnos
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 0.1}>
              <div className="group p-8 rounded-2xl border border-gray-100 hover:border-pt-lime hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-xl bg-pt-light flex items-center justify-center text-pt-dark group-hover:bg-pt-dark group-hover:text-white transition-colors mb-6">
                  {card.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-pt-gray mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
