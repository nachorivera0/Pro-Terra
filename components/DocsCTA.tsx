import Link from 'next/link';
import AnimatedSection from './AnimatedSection';
import { tech } from '@/lib/data';

export default function DocsCTA() {
  return (
    <section className="py-20 bg-pt-dark">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Necesitás algo que no encontrás acá?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Escribinos y te enviamos documentación específica, certificados de análisis o una muestra
            para tu proceso.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${tech.contact.email}`}
              className="inline-flex items-center px-7 py-3.5 bg-pt-lime text-pt-dark font-bold rounded-full hover:bg-white transition-colors"
            >
              {tech.contact.email}
            </a>
            <Link
              href="/#contacto"
              className="inline-flex items-center px-7 py-3.5 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              Solicitá una muestra
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
