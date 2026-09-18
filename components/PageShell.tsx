import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import AnimatedSection from './AnimatedSection';

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  crumb: string;
  children: React.ReactNode;
}

export default function PageShell({ eyebrow, title, description, crumb, children }: Props) {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-pt-dark pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <nav aria-label="Ruta" className="flex items-center gap-1.5 text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-pt-lime transition-colors">
                Inicio
              </Link>
              <ChevronRight className="w-4 h-4" aria-hidden />
              <span className="text-white/90">{crumb}</span>
            </nav>
            <AnimatedSection>
              <p className="text-pt-lime font-semibold uppercase tracking-widest text-sm mb-3">{eyebrow}</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
              <p className="text-white/75 max-w-2xl text-lg leading-relaxed">{description}</p>
            </AnimatedSection>
          </div>
        </section>
        {children}
      </main>
      <Footer />
    </>
  );
}
