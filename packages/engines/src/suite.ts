import { ConversionEngine } from './conversion-engine';
import { JobEngine } from './job-engine';
import { OcrEngine, type OcrProvider } from './ocr-engine';
import { PdfEngine, type PdfEngineProvider } from './pdf-engine';
import { EngineRegistry } from './registry';
import type { ConversionProvider, EngineContext } from './types';
import type { EngineHealth } from './types';

export type EngineSuite = {
  registry: EngineRegistry;
  jobs: JobEngine;
  pdf: PdfEngine;
  ocr: OcrEngine;
  conversions: ConversionEngine;
  health: (ctx?: EngineContext) => Promise<EngineHealth[]>;
};

export function createEngineSuite(input: {
  pdf: PdfEngineProvider;
  ocr: OcrProvider;
  conversions: readonly ConversionProvider[];
}): EngineSuite {
  const registry = new EngineRegistry();
  const jobs = new JobEngine();
  const pdf = new PdfEngine(input.pdf);
  const ocr = new OcrEngine(input.ocr);
  const conversions = new ConversionEngine(input.conversions);
  registry.register(pdf).register(ocr).register(conversions);
  return { registry, jobs, pdf, ocr, conversions, health: ctx => registry.health(ctx) };
}

export const CAPABILITY_GRAPH = {
  document: ['pdf.inspect', 'pdf.extract-text', 'pdf.pages', 'pdf.redact', 'pdf.watermark'],
  ocr: ['ocr.recognize', 'ocr.review', 'ocr.searchable-pdf'],
  conversion: ['convert.pdf-docx', 'convert.pdf-xlsx', 'convert.pdf-pptx', 'convert.office-pdf', 'convert.pdf-html', 'convert.pdfa'],
  workflow: ['jobs.queue', 'jobs.retry', 'jobs.cancel', 'jobs.audit'],
  ai: ['ai.classify', 'ai.navigate', 'ai.plan', 'ai.authorize', 'ai.execute'],
} as const;
