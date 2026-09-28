import type { ChapterGroup } from './community';

export const chapterGroups: { value: ChapterGroup; label: string; symbol: string }[] = [
  { value: 'JABODETABEK', label: 'Jabodetabek', symbol: '●' },
  { value: 'CIKAPUR', label: 'Cikapur', symbol: '◆' },
  { value: 'CHAPTER MANDIRI', label: 'Chapter Mandiri', symbol: '■' },
];

export type MapView = 'national' | 'west';
export const mapFrames: Record<MapView, { x: number; y: number; width: number; height: number }> = {
  national: { x: 0, y: -60, width: 1000, height: 560 },
  west: { x: 255, y: 265, width: 38, height: 25 },
};

// Same equirectangular projection as public/maps/indonesia.svg.
export function mapPoint(latitude: number, longitude: number, view: MapView) {
  const frame = mapFrames[view];
  return {
    x: (((longitude - 94) / 48 * 1000 - frame.x) / frame.width) * 100,
    y: (((7 - latitude) / 19 * 396 - frame.y) / frame.height) * 100,
  };
}

// Callout positions only: lines connect these labels to the real map coordinates.
export const mapCallouts: Record<string, { x: number; y: number }> = {
  jakarta: { x: 36, y: 15 }, bogor: { x: 18, y: 83 },
  depok: { x: 39, y: 70 }, tangerang: { x: 13, y: 35 },
  bekasi: { x: 58, y: 34 }, cikarang: { x: 80, y: 49 },
  karawang: { x: 83, y: 15 }, purwakarta: { x: 81, y: 83 },
  semarang: { x: 55, y: 58 }, 'malang-raya': { x: 74, y: 84 },
  'deli-serdang': { x: 17, y: 21 },
};
