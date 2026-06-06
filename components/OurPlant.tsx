import Image from 'next/image';
import AnimatedSection from './AnimatedSection';

export default function OurPlant() {
  return (
    <section id="nuestra-planta" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Columna izquierda — Texto */}
          <AnimatedSection>
            <p className="text-pt-lime font-semibold uppercase tracking-widest text-sm mb-4">
              Nuestra planta
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-pt-gray mb-8 leading-tight">
              Tecnología industrial en el corazón de la soja argentina
            </h2>
            <p className="text-pt-gray font-semibold text-base leading-relaxed mb-5">
              Nuestra planta opera en el Polo Industrial San Lorenzo, a menos de 5 km del segundo
              corredor de crushing de soja más grande del mundo.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-5">
              6.000 m² de superficie, tres líneas de producción independientes, laboratorio propio
              de I+D y calidad, y tecnología automatizada que garantiza consistencia lote a lote.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-10">
              Producimos SPI, SPC y TVP con los mismos estándares de calidad que los proveedores
              internacionales — con entrega en menos de 72 hs y soporte técnico local.
            </p>

            {/* Key stats */}
            <div className="flex flex-wrap gap-8">
              {[
                { value: '6.000 m²', label: 'Superficie de planta' },
                { value: '3', label: 'Líneas de producción' },
                { value: '< 72 hs', label: 'Tiempo de entrega' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-pt-dark">{s.value}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Columna derecha — Collage de imágenes */}
          <AnimatedSection delay={0.2} className="relative h-[520px] hidden lg:block">
            {/* Foto grande de fondo */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80"
                alt="Planta industrial Pro-Terra"
                fill
                className="object-cover object-center"
                unoptimized
              />
            </div>

            {/* Foto 2 — arriba derecha, superpuesta */}
            <div
              className="absolute top-6 right-0 w-52 h-36 rounded-xl overflow-hidden border-4 border-white shadow-2xl"
              style={{ transform: 'translateX(20px) rotate(2deg)' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1581093458791-9d58e74010b8?w=400&q=80"
                alt="Laboratorio de calidad Pro-Terra"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Foto 3 — abajo derecha, superpuesta */}
            <div
              className="absolute bottom-6 right-0 w-52 h-36 rounded-xl overflow-hidden border-4 border-white shadow-2xl"
              style={{ transform: 'translateX(20px) rotate(-1.5deg)' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80"
                alt="Industria alimentaria"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Badge verde sobre la foto grande */}
            <div className="absolute bottom-6 left-6 bg-pt-dark/90 backdrop-blur-sm rounded-xl px-5 py-3">
              <p className="text-pt-lime text-xs font-semibold uppercase tracking-wider">
                Polo Industrial
              </p>
              <p className="text-white font-semibold text-sm">San Lorenzo, Santa Fe</p>
            </div>
          </AnimatedSection>

          {/* Mobile: imagen simple */}
          <AnimatedSection delay={0.2} className="relative h-72 rounded-2xl overflow-hidden lg:hidden">
            <Image
              src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80"
              alt="Planta industrial Pro-Terra"
              fill
              className="object-cover"
              unoptimized
            />
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
