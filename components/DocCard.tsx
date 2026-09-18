import Image from 'next/image';
import { Download, ExternalLink } from 'lucide-react';
import { fileSize } from '@/lib/docs';
import type { DocumentItem } from '@/lib/data';

const kindLabel: Record<DocumentItem['kind'], string> = {
  ficha: 'Ficha técnica',
  catalogo: 'Catálogo',
  manual: 'Manual',
};

interface Props {
  doc: DocumentItem;
  /** Disposición horizontal (miniatura a la izquierda) para documentos destacados. */
  wide?: boolean;
}

export default function DocCard({ doc, wide = false }: Props) {
  const size = fileSize(doc.file);
  const meta = [`PDF`, `${doc.pages} págs.`, size].filter(Boolean).join(' · ');

  return (
    <article
      className={`group flex rounded-2xl border border-gray-100 bg-white overflow-hidden hover:border-pt-lime hover:shadow-xl transition-all duration-300 ${
        wide ? 'flex-col sm:flex-row' : 'flex-col'
      }`}
    >
      <a
        href={doc.file}
        target="_blank"
        rel="noreferrer"
        aria-label={`Ver ${doc.title}`}
        className={`relative block bg-pt-light overflow-hidden flex-shrink-0 ${
          wide ? 'sm:w-64 h-64 sm:h-auto' : 'h-64'
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={doc.thumb}
          alt={`Primera página de ${doc.title}`}
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </a>
      <div className="flex flex-col flex-1 p-6">
        <span className="inline-block self-start px-3 py-1 bg-pt-light text-pt-mid text-xs font-semibold rounded-full mb-3">
          {kindLabel[doc.kind]}
        </span>
        <h3 className="font-display text-xl font-bold text-pt-gray leading-snug">{doc.title}</h3>
        <p className="text-sm text-pt-mid font-medium mt-1">{doc.subtitle}</p>
        <p className="text-sm text-gray-600 leading-relaxed mt-3 flex-1">{doc.description}</p>
        <p className="text-xs text-gray-400 mt-4">{meta}</p>
        <div className="flex flex-wrap gap-3 mt-4">
          <a
            href={doc.file}
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-pt-dark text-white text-sm font-medium rounded-full hover:bg-pt-mid transition-colors"
          >
            <Download className="w-4 h-4" aria-hidden />
            Descargar
          </a>
          <a
            href={doc.file}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-pt-dark text-pt-dark text-sm font-semibold rounded-full hover:bg-pt-dark hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" aria-hidden />
            Ver online
          </a>
        </div>
      </div>
    </article>
  );
}
