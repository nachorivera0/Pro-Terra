import AnimatedSection from './AnimatedSection';

const profiles = ['KAMs / Ejecutivos Comerciales', 'Ingenieros en Alimentos', 'Operadores de planta'];

export default function JoinUs() {
  return (
    <section id="sumate" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection>
          <p className="text-pt-lime font-semibold uppercase tracking-widest text-sm mb-3">
            Carreras
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-pt-gray mb-6">
            Sumate a Pro-Terra
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Estamos construyendo el equipo que va a liderar la industria argentina de proteínas
            vegetales. Buscamos perfiles técnicos apasionados por la industria alimentaria.
          </p>

          {/* Profiles */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {profiles.map((p) => (
              <span
                key={p}
                className="px-5 py-2.5 bg-pt-light text-pt-dark text-sm font-semibold rounded-full border border-pt-dark/20"
              >
                {p}
              </span>
            ))}
          </div>

          <a
            href="mailto:contacto@proterra.com.ar?subject=Sumate a Pro-Terra"
            className="inline-flex items-center gap-2 px-8 py-4 bg-pt-dark text-white font-semibold rounded-full text-base hover:bg-pt-mid transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Enviá tu CV
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
