import productsJson from '@/data/products.json';
import technicalJson from '@/data/technical.json';

export interface Row {
  label: string;
  value: string;
}

export interface Product {
  id: 'spi' | 'spc' | 'tvp';
  sigla: string;
  name: string;
  fullName: string;
  image: string;
  badge: string;
  summary: string;
  form: string;
  appearance: string;
  yield: string;
  process: string;
  overview: string[];
  physical: Row[];
  microbiological: Row[];
  controls: { label: string; text: string }[];
  grades?: { grade: string; size: string; use: string }[];
  densityNote?: string;
  textureNotes?: string[];
  storage: { temperature: string; humidity: string; shelfLife: string; notes: string[] };
  presentation: string[];
  cardPresentation: string;
  applications: string[];
  functional: string[];
  band: { name: string; pantone: string; hex: string };
  pdf: string;
  cardSpecs: Row[];
}

export interface DocumentItem {
  id: string;
  kind: 'ficha' | 'catalogo' | 'manual';
  title: string;
  subtitle: string;
  description: string;
  file: string;
  thumb: string;
  pages: number;
}

export const disclaimer: string = productsJson.disclaimer;
export const products = productsJson.products as unknown as Product[];
export const tech = technicalJson;
export const documents = technicalJson.documents as DocumentItem[];

export const getDoc = (id: string) => {
  const doc = documents.find((d) => d.id === id);
  if (!doc) throw new Error(`Documento no encontrado: ${id}`);
  return doc;
};
