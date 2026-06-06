'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const links = [
  { label: 'Inicio',          href: '#inicio' },
  { label: 'Productos',       href: '#productos' },
  { label: 'Qué Hacemos',    href: '#que-hacemos' },
  { label: 'Sustentabilidad', href: '#sustentabilidad' },
  { label: 'Clientes',        href: '#clientes' },
  { label: 'Contacto',        href: '#contacto' },
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
        <a href="#inicio" className="flex items-center gap-2">
          <Image
            src="/Gemini_Generated_Image_x0x8gvx0x8gvx0x8-removebg-preview.png"
            alt="Pro-Terra"
            width={140}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-pt-gray hover:text-pt-mid transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contacto"
          className="hidden lg:inline-flex items-center px-5 py-2 bg-pt-dark text-white text-sm font-medium rounded-full hover:bg-pt-mid transition-colors"
        >
          Solicitá una muestra
        </a>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded text-pt-gray"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-pt-gray hover:text-pt-mid"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center px-5 py-2 bg-pt-dark text-white text-sm font-medium rounded-full"
          >
            Solicitá una muestra
          </a>
        </div>
      )}
    </header>
  );
}
