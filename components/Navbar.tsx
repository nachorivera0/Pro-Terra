'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const links = [
  { label: 'Inicio',          href: '/#inicio' },
  { label: 'Productos',       href: '/#productos' },
  { label: 'Qué Hacemos',    href: '/#que-hacemos' },
  { label: 'Sustentabilidad', href: '/#sustentabilidad' },
  { label: 'Clientes',        href: '/#clientes' },
  { label: 'Contacto',        href: '/#contacto' },
];

const resources = [
  { label: 'Fichas técnicas',    href: '/fichas-tecnicas', desc: 'Especificaciones de SPI, SPC y TVP' },
  { label: 'Manuales',           href: '/manuales',        desc: 'Almacenamiento, manipulación y packaging' },
  { label: 'Catálogos',          href: '/catalogos',       desc: 'Catálogo de productos 2026' },
  { label: 'Calidad y normativa', href: '/calidad',        desc: 'Trazabilidad, métodos y registros' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/95'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/#inicio" className="flex items-center gap-2">
          <Image
            src="/Gemini_Generated_Image_x0x8gvx0x8gvx0x8-removebg-preview.png"
            alt="Pro-Terra"
            width={140}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6">
          {links.slice(1, 2).map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm font-medium text-pt-gray hover:text-pt-mid transition-colors">
                {l.label}
              </Link>
            </li>
          ))}

          {/* Recursos (desplegable) */}
          <li className="relative group">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-medium text-pt-gray group-hover:text-pt-mid group-focus-within:text-pt-mid transition-colors"
              aria-haspopup="true"
            >
              Recursos
              <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 hidden group-hover:block group-focus-within:block">
              <ul className="w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-2">
                {resources.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="block rounded-xl px-4 py-3 hover:bg-pt-light transition-colors"
                    >
                      <span className="block text-sm font-semibold text-pt-gray">{r.label}</span>
                      <span className="block text-xs text-gray-500 mt-0.5">{r.desc}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {links.slice(2).map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm font-medium text-pt-gray hover:text-pt-mid transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/#contacto"
          className="hidden lg:inline-flex items-center px-5 py-2 bg-pt-dark text-white text-sm font-medium rounded-full hover:bg-pt-mid transition-colors"
        >
          Solicitá una muestra
        </Link>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded text-pt-gray"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
          aria-expanded={menuOpen}
        >
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-pt-gray hover:text-pt-mid"
            >
              {l.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Recursos</p>
            <div className="flex flex-col gap-3">
              {resources.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-pt-gray hover:text-pt-mid"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/#contacto"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center px-5 py-2 bg-pt-dark text-white text-sm font-medium rounded-full"
          >
            Solicitá una muestra
          </Link>
        </div>
      )}
    </header>
  );
}
