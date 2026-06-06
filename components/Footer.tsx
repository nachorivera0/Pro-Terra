import Image from 'next/image';

const links = [
  { label: 'Productos',       href: '#productos' },
  { label: 'Qué Hacemos',    href: '#que-hacemos' },
  { label: 'Sustentabilidad', href: '#sustentabilidad' },
  { label: 'Clientes',        href: '#clientes' },
  { label: 'Contacto',        href: '#contacto' },
];


export default function Footer() {
  return (
    <footer className="bg-pt-gray text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Logo + tagline */}
          <div>
            <Image
              src="/Gemini_Generated_Image_x0x8gvx0x8gvx0x8-removebg-preview.png"
              alt="Pro-Terra"
              width={140}
              height={48}
              className="h-10 w-auto object-contain brightness-0 invert mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Ingredientes proteicos de soja de alto valor agregado. Polo Industrial San Lorenzo,
              Santa Fe, Argentina.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">
              Navegación
            </p>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/70 hover:text-white text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + ISO */}
          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">
              Contacto
            </p>
            <ul className="space-y-2.5 text-sm text-white/70 mb-6">
              <li>
                <a href="mailto:contacto@proterra.com.ar" className="hover:text-white transition-colors">
                  contacto@proterra.com.ar
                </a>
              </li>
              <li>+54 9 11 2305-0912</li>
              <li>San Lorenzo, Santa Fe</li>
              <li>
                <a
                  href="https://linkedin.com/company/pro-terra-prerotienes"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>

            {/* ISO mini badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-xl border border-white/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/iso22000.png" alt="ISO 22000" style={{ width: '80px', height: 'auto' }} />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© 2026 Pro-Terra. Todos los derechos reservados.</p>
          <p>Producido en el Polo Industrial San Lorenzo, Santa Fe, Argentina.</p>
        </div>
      </div>
    </footer>
  );
}
