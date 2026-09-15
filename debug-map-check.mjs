const indiaMap = (await import('@svg-maps/india')).default;
const INDIA_GEO_BOUNDS = { minLat: 6.5, maxLat: 37.2, minLng: 68.0, maxLng: 97.5 };
const INDIA_MAP_BOUNDS = { x: 70, y: 72, width: 460, height: 560 };

const project = ([latitude, longitude]) => {
  const x = INDIA_MAP_BOUNDS.x + ((longitude - INDIA_GEO_BOUNDS.minLng) / (INDIA_GEO_BOUNDS.maxLng - INDIA_GEO_BOUNDS.minLng)) * INDIA_MAP_BOUNDS.width;
  const y = INDIA_MAP_BOUNDS.y + ((INDIA_GEO_BOUNDS.maxLat - latitude) / (INDIA_GEO_BOUNDS.maxLat - INDIA_GEO_BOUNDS.minLat)) * INDIA_MAP_BOUNDS.height;
  return [x, y];
};

const cities = [
  ['Amritsar', [31.6340, 74.8723]],
  ['Delhi', [28.6139, 77.2090]],
  ['Ahmedabad', [23.0225, 72.5714]],
  ['Mumbai', [19.0760, 72.8777]],
  ['Hyderabad', [17.3850, 78.4867]],
  ['Bengaluru', [12.9716, 77.5946]],
  ['Chennai', [13.0827, 80.2707]],
  ['Kolkata', [22.5726, 88.3639]],
];

console.log('viewBox', indiaMap.viewBox);
for (const [name, coord] of cities) {
  const pos = project(coord);
  console.log(name, pos.map((value) => Number(value).toFixed(1)).join(', '));
}
